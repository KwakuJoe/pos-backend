import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

import Appointment from '#models/appointment'
import Sale from '#models/sale'
import Product from '#models/product'

import AppointmentTransformer from '#transformers/appointment_transformer'
import AppointmentFilter from '#filters/appointment_filter'

import {
  appointmentFilterValidator,
  createAppointmentValidator,
  updateAppointmentValidator,
  startAppointmentValidator,
  cancelAppointmentValidator,
} from '#validators/appointment_validator'

export default class AppointmentsController {
  // ─── List ─────────────────────────────────────────────────────────────────

  async index({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const filters = await request.validateUsing(appointmentFilterValidator)

    let query = Appointment.query().where('business_id', user.businessId)
    query = new AppointmentFilter(query, { ...filters } as any).apply()

    const page = filters.page ?? 1
    const limit = filters.limit ?? 20

    const appointments = await query.paginate(page, limit)

    for (const a of appointments.all()) {
      await this.loadRelations(a)
    }

    const transformed = await serialize(
      AppointmentTransformer.paginate(appointments.all(), appointments.getMeta())
    )
    return response.ok(transformed)
  }

  // ─── Show ──────────────────────────────────────────────────────────────────

  async show({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const appointment = await Appointment.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    await this.loadRelations(appointment)
    const transformed = await serialize(AppointmentTransformer.transform(appointment))
    return response.ok({ data: transformed.data })
  }

  // ─── Create ───────────────────────────────────────────────────────────────

  async store({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createAppointmentValidator)

    const isWalkIn = data.type === 'walk_in'
    const scheduledFor = data.scheduledFor
      ? DateTime.fromISO(data.scheduledFor)
      : DateTime.now()

    let durationMinutes = data.durationMinutes ?? null

    // Pull duration from service metadata if not provided
    if (!durationMinutes && data.serviceId) {
      const service = await Product.query()
        .where('id', data.serviceId)
        .where('business_id', user.businessId)
        .first()
      if (service?.metadata?.duration_min) {
        durationMinutes = service.metadata.duration_min
      }
    }

    let appointment!: Appointment
    let createdSaleId: string | null = null

    await db.transaction(async (trx) => {
      appointment = await Appointment.create(
        {
          businessId: user.businessId,
          locationId: data.locationId ?? null,
          staffId: data.staffId ?? null,
          serviceId: data.serviceId ?? null,
          customerId: data.customerId ?? null,
          createdBy: user.id,
          type: isWalkIn ? 'walk_in' : 'appointment',
          status: isWalkIn ? 'in_progress' : 'pending',
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          notes: data.notes ?? null,
          scheduledFor,
          durationMinutes,
          startedAt: isWalkIn ? DateTime.now() : null,
        },
        { client: trx }
      )

      // Walk-ins can optionally create a sale immediately
      if (isWalkIn && data.createSale) {
        const counterResult = await trx.rawQuery(
          'UPDATE businesses SET sales_counter = sales_counter + 1 WHERE id = ? RETURNING sales_counter',
          [user.businessId]
        )
        const saleNum: number = counterResult.rows[0].sales_counter
        const saleNumber = `SAL-${String(saleNum).padStart(6, '0')}`

        const sale = await Sale.create(
          {
            businessId: user.businessId,
            locationId: data.locationId ?? null,
            customerId: data.customerId ?? null,
            createdBy: user.id,
            saleNumber,
            saleNumberInt: saleNum,
            status: 'pending',
            type: 'service',
            subtotal: 0,
            discountAmount: 0,
            taxAmount: 0,
            totalAmount: 0,
            amountPaid: 0,
            changeAmount: 0,
            notes: null,
            metadata: { walkInName: data.customerName, walkInPhone: data.customerPhone },
          },
          { client: trx }
        )

        appointment.useTransaction(trx)
        appointment.saleId = sale.id
        await appointment.save()
        createdSaleId = sale.id
      }
    })

    await this.loadRelations(appointment)
    const transformed = await serialize(AppointmentTransformer.transform(appointment))
    return response.created({
      message: isWalkIn ? 'Walk-in started' : 'Appointment created',
      data: transformed.data,
      saleId: createdSaleId,
    })
  }

  // ─── Update ───────────────────────────────────────────────────────────────

  async update({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(updateAppointmentValidator)

    const appointment = await Appointment.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .whereIn('status', ['pending', 'confirmed'])
      .firstOrFail()

    if (data.customerName !== undefined) appointment.customerName = data.customerName
    if (data.customerPhone !== undefined) appointment.customerPhone = data.customerPhone
    if (data.staffId !== undefined) appointment.staffId = data.staffId ?? null
    if (data.serviceId !== undefined) appointment.serviceId = data.serviceId ?? null
    if (data.locationId !== undefined) appointment.locationId = data.locationId ?? null
    if (data.customerId !== undefined) appointment.customerId = data.customerId ?? null
    if (data.scheduledFor !== undefined) appointment.scheduledFor = DateTime.fromISO(data.scheduledFor)
    if (data.durationMinutes !== undefined) appointment.durationMinutes = data.durationMinutes ?? null
    if (data.notes !== undefined) appointment.notes = data.notes ?? null

    await appointment.save()
    await this.loadRelations(appointment)
    const transformed = await serialize(AppointmentTransformer.transform(appointment))
    return response.ok({ message: 'Appointment updated', data: transformed.data })
  }

  // ─── Confirm ──────────────────────────────────────────────────────────────

  async confirm({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const appointment = await Appointment.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .where('status', 'pending')
      .firstOrFail()

    appointment.status = 'confirmed'
    appointment.confirmedAt = DateTime.now()
    await appointment.save()

    await this.loadRelations(appointment)
    const transformed = await serialize(AppointmentTransformer.transform(appointment))
    return response.ok({ message: 'Appointment confirmed', data: transformed.data })
  }

  // ─── Start ────────────────────────────────────────────────────────────────

  async start({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(startAppointmentValidator)

    const appointment = await Appointment.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .whereIn('status', ['pending', 'confirmed'])
      .firstOrFail()

    let createdSaleId: string | null = null

    await db.transaction(async (trx) => {
      appointment.useTransaction(trx)
      appointment.status = 'in_progress'
      appointment.startedAt = DateTime.now()

      if (data.createSale) {
        const counterResult = await trx.rawQuery(
          'UPDATE businesses SET sales_counter = sales_counter + 1 WHERE id = ? RETURNING sales_counter',
          [user.businessId]
        )
        const saleNum: number = counterResult.rows[0].sales_counter
        const saleNumber = `SAL-${String(saleNum).padStart(6, '0')}`

        const sale = await Sale.create(
          {
            businessId: user.businessId,
            locationId: appointment.locationId,
            customerId: appointment.customerId,
            createdBy: user.id,
            saleNumber,
            saleNumberInt: saleNum,
            status: 'pending',
            type: 'service',
            subtotal: 0,
            discountAmount: 0,
            taxAmount: 0,
            totalAmount: 0,
            amountPaid: 0,
            changeAmount: 0,
            notes: null,
            metadata: appointment.type === 'walk_in'
              ? { walkInName: appointment.customerName, walkInPhone: appointment.customerPhone }
              : null,
          },
          { client: trx }
        )

        appointment.saleId = sale.id
        createdSaleId = sale.id
      }

      await appointment.save()
    })

    await this.loadRelations(appointment)
    const transformed = await serialize(AppointmentTransformer.transform(appointment))
    return response.ok({
      message: 'Appointment started',
      data: transformed.data,
      saleId: createdSaleId,
    })
  }

  // ─── Cancel ───────────────────────────────────────────────────────────────

  async cancel({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(cancelAppointmentValidator)

    const appointment = await Appointment.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .whereIn('status', ['pending', 'confirmed'])
      .firstOrFail()

    appointment.status = 'cancelled'
    appointment.cancelledAt = DateTime.now()
    appointment.cancellationReason = data.reason ?? null
    await appointment.save()

    await this.loadRelations(appointment)
    const transformed = await serialize(AppointmentTransformer.transform(appointment))
    return response.ok({ message: 'Appointment cancelled', data: transformed.data })
  }

  // ─── No-show ──────────────────────────────────────────────────────────────

  async noShow({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const appointment = await Appointment.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .whereIn('status', ['pending', 'confirmed'])
      .firstOrFail()

    appointment.status = 'no_show'
    await appointment.save()

    await this.loadRelations(appointment)
    const transformed = await serialize(AppointmentTransformer.transform(appointment))
    return response.ok({ message: 'Appointment marked as no-show', data: transformed.data })
  }

  // ─── Private Helpers ──────────────────────────────────────────────────────

  private async loadRelations(appointment: Appointment): Promise<void> {
    await appointment.load('createdByUser')
    if (appointment.staffId) await appointment.load('staff')
    if (appointment.serviceId) await appointment.load('service')
    if (appointment.customerId) await appointment.load('customer')
    if (appointment.locationId) await appointment.load('location')
  }
}
