import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

import Reservation from '#models/reservation'
import Table from '#models/table'
import Sale from '#models/sale'

import ReservationTransformer from '#transformers/reservation_transformer'

import {
  reservationFilterValidator,
  createReservationValidator,
  updateReservationValidator,
  cancelReservationValidator,
  seatReservationValidator,
} from '#validators/reservation_validator'

export default class ReservationsController {
  // ─── List ─────────────────────────────────────────────────────────────────

  async index({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const filters = await request.validateUsing(reservationFilterValidator)

    let query = Reservation.query().where('business_id', user.businessId)

    if (filters.search) {
      const s = filters.search
      query = query.where((q) => {
        q.whereILike('reserved_by_name', `%${s}%`).orWhereILike('reserved_by_phone', `%${s}%`)
      }) as any
    }
    if (filters.status) query = query.where('status', filters.status) as any
    if (filters.tableId) query = query.where('table_id', filters.tableId) as any
    if (filters.locationId) query = query.where('location_id', filters.locationId) as any
    if (filters.reservedFrom) query = query.where('reserved_for', '>=', filters.reservedFrom) as any
    if (filters.reservedTo) query = query.where('reserved_for', '<=', filters.reservedTo) as any

    const sortColumnMap: Record<string, string> = {
      reservedFor: 'reserved_for',
      partySize: 'party_size',
      createdAt: 'created_at',
    }
    const sortCol = sortColumnMap[filters.sortBy ?? ''] ?? 'reserved_for'
    const sortDir = filters.sortOrder === 'desc' ? 'desc' : 'asc'
    query = query.orderBy(sortCol, sortDir) as any

    const page = filters.page ?? 1
    const limit = filters.limit ?? 20

    const reservations = await query.paginate(page, limit)

    for (const r of reservations.all()) {
      await this.loadRelations(r)
    }

    const transformed = await serialize(
      ReservationTransformer.paginate(reservations.all(), reservations.getMeta())
    )
    return response.ok(transformed)
  }

  // ─── Show ──────────────────────────────────────────────────────────────────

  async show({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const reservation = await Reservation.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    await this.loadRelations(reservation)
    const transformed = await serialize(ReservationTransformer.transform(reservation))
    return response.ok({ data: transformed.data })
  }

  // ─── Create ───────────────────────────────────────────────────────────────

  async store({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createReservationValidator)

    if (data.tableId) {
      await Table.query()
        .where('id', data.tableId)
        .where('business_id', user.businessId)
        .firstOrFail()
    }

    const reservation = await Reservation.create({
      businessId: user.businessId,
      locationId: data.locationId ?? null,
      tableId: data.tableId ?? null,
      customerId: data.customerId ?? null,
      createdBy: user.id,
      partySize: data.partySize,
      reservedFor: DateTime.fromISO(data.reservedFor),
      reservedByName: data.reservedByName,
      reservedByPhone: data.reservedByPhone,
      notes: data.notes ?? null,
      status: 'pending',
    })

    await this.loadRelations(reservation)
    const transformed = await serialize(ReservationTransformer.transform(reservation))
    return response.created({ message: 'Reservation created', data: transformed.data })
  }

  // ─── Update ───────────────────────────────────────────────────────────────

  async update({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(updateReservationValidator)

    const reservation = await Reservation.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .whereIn('status', ['pending', 'confirmed'])
      .firstOrFail()

    if (data.tableId !== undefined) {
      if (data.tableId) {
        await Table.query()
          .where('id', data.tableId)
          .where('business_id', user.businessId)
          .firstOrFail()
      }
      reservation.tableId = data.tableId
    }

    if (data.locationId !== undefined) reservation.locationId = data.locationId ?? null
    if (data.customerId !== undefined) reservation.customerId = data.customerId ?? null
    if (data.partySize !== undefined) reservation.partySize = data.partySize
    if (data.reservedFor !== undefined) reservation.reservedFor = DateTime.fromISO(data.reservedFor)
    if (data.reservedByName !== undefined) reservation.reservedByName = data.reservedByName
    if (data.reservedByPhone !== undefined) reservation.reservedByPhone = data.reservedByPhone
    if (data.notes !== undefined) reservation.notes = data.notes ?? null

    await reservation.save()
    await this.loadRelations(reservation)
    const transformed = await serialize(ReservationTransformer.transform(reservation))
    return response.ok({ message: 'Reservation updated', data: transformed.data })
  }

  // ─── Confirm ──────────────────────────────────────────────────────────────

  async confirm({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const reservation = await Reservation.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .where('status', 'pending')
      .firstOrFail()

    reservation.status = 'confirmed'
    reservation.confirmedAt = DateTime.now()
    await reservation.save()

    await this.loadRelations(reservation)
    const transformed = await serialize(ReservationTransformer.transform(reservation))
    return response.ok({ message: 'Reservation confirmed', data: transformed.data })
  }

  // ─── Seat ─────────────────────────────────────────────────────────────────

  async seat({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(seatReservationValidator)

    const reservation = await Reservation.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .whereIn('status', ['pending', 'confirmed'])
      .firstOrFail()

    // Use provided tableId or fall back to the reservation's assigned table
    const tableId = data.tableId ?? reservation.tableId
    let createdSaleId: string | null = null

    await db.transaction(async (trx) => {
      reservation.useTransaction(trx)
      reservation.status = 'seated'
      reservation.seatedAt = DateTime.now()

      if (tableId) {
        if (reservation.tableId && reservation.tableId !== tableId) {
          await Table.query({ client: trx })
            .where('id', reservation.tableId)
            .update({ status: 'available' })
        }
        reservation.tableId = tableId
        await Table.query({ client: trx }).where('id', tableId).update({ status: 'occupied' })
      }

      await reservation.save()

      if (data.createSale && tableId) {
        const counterResult = await trx.rawQuery(
          'UPDATE businesses SET sales_counter = sales_counter + 1 WHERE id = ? RETURNING sales_counter',
          [user.businessId]
        )
        const saleNum: number = counterResult.rows[0].sales_counter
        const saleNumber = `SAL-${String(saleNum).padStart(6, '0')}`

        const sale = await Sale.create(
          {
            businessId: user.businessId,
            locationId: reservation.locationId,
            tableId,
            reservationId: reservation.id,
            customerId: reservation.customerId,
            createdBy: user.id,
            saleNumber,
            saleNumberInt: saleNum,
            status: 'pending',
            type: 'dine_in',
            subtotal: 0,
            discountAmount: 0,
            taxAmount: 0,
            totalAmount: 0,
            amountPaid: 0,
            changeAmount: 0,
            notes: null,
          },
          { client: trx }
        )
        createdSaleId = sale.id
      }
    })

    await this.loadRelations(reservation)
    const transformed = await serialize(ReservationTransformer.transform(reservation))
    return response.ok({ message: 'Reservation seated', data: transformed.data, saleId: createdSaleId })
  }

  // ─── Cancel ───────────────────────────────────────────────────────────────

  async cancel({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(cancelReservationValidator)

    const reservation = await Reservation.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .whereIn('status', ['pending', 'confirmed'])
      .firstOrFail()

    reservation.status = 'cancelled'
    reservation.cancelledAt = DateTime.now()
    reservation.cancellationReason = data.reason ?? null
    await reservation.save()

    await this.loadRelations(reservation)
    const transformed = await serialize(ReservationTransformer.transform(reservation))
    return response.ok({ message: 'Reservation cancelled', data: transformed.data })
  }

  // ─── No-show ──────────────────────────────────────────────────────────────

  async noShow({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const reservation = await Reservation.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .whereIn('status', ['pending', 'confirmed'])
      .firstOrFail()

    reservation.status = 'no_show'
    await reservation.save()

    await this.loadRelations(reservation)
    const transformed = await serialize(ReservationTransformer.transform(reservation))
    return response.ok({ message: 'Reservation marked as no-show', data: transformed.data })
  }

  // ─── Private Helpers ──────────────────────────────────────────────────────

  private async loadRelations(reservation: Reservation): Promise<void> {
    await reservation.load('createdByUser')
    if (reservation.tableId) await reservation.load('table')
    if (reservation.locationId) await reservation.load('location')
    if (reservation.customerId) await reservation.load('customer')
  }
}
