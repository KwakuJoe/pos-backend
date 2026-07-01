import { BaseTransformer } from '@adonisjs/core/transformers'
import type Appointment from '#models/appointment'

export default class AppointmentTransformer extends BaseTransformer<Appointment> {
  toObject() {
    const a = this.resource
    const preloaded = (a as any).$preloaded ?? {}
    const staff = preloaded.staff as any
    const service = preloaded.service as any
    const customer = preloaded.customer as any
    const location = preloaded.location as any
    const createdByUser = preloaded.createdByUser as any

    return {
      id: a.id,
      businessId: a.businessId,
      type: a.type,
      status: a.status,

      customerName: a.customerName,
      customerPhone: a.customerPhone,
      notes: a.notes,

      scheduledFor: a.scheduledFor,
      durationMinutes: a.durationMinutes,

      staff: staff ? { id: staff.id, fullName: staff.fullName } : null,
      service: service ? { id: service.id, name: service.name, price: service.price } : null,
      customer: customer
        ? { id: customer.id, fullName: customer.fullName, phone: customer.phone }
        : null,
      location: location ? { id: location.id, name: location.name } : null,

      saleId: a.saleId,

      createdBy: createdByUser
        ? { id: createdByUser.id, fullName: createdByUser.fullName }
        : { id: a.createdBy, fullName: null },

      confirmedAt: a.confirmedAt,
      startedAt: a.startedAt,
      completedAt: a.completedAt,
      cancelledAt: a.cancelledAt,
      cancellationReason: a.cancellationReason,

      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    }
  }
}
