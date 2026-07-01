import { BaseTransformer } from '@adonisjs/core/transformers'
import type Reservation from '#models/reservation'

export default class ReservationTransformer extends BaseTransformer<Reservation> {
  toObject() {
    const r = this.resource
    const preloaded = (r as any).$preloaded ?? {}
    const table = preloaded.table as any
    const customer = preloaded.customer as any
    const location = preloaded.location as any
    const createdByUser = preloaded.createdByUser as any

    return {
      id: r.id,
      businessId: r.businessId,

      table: table ? { id: table.id, name: table.name, capacity: table.capacity } : null,
      location: location ? { id: location.id, name: location.name } : null,
      customer: customer
        ? { id: customer.id, fullName: customer.fullName, phone: customer.phone }
        : null,

      partySize: r.partySize,
      reservedFor: r.reservedFor,
      reservedByName: r.reservedByName,
      reservedByPhone: r.reservedByPhone,
      notes: r.notes,
      status: r.status,

      createdBy: createdByUser
        ? { id: createdByUser.id, fullName: createdByUser.fullName }
        : { id: r.createdBy, fullName: null },

      confirmedAt: r.confirmedAt,
      seatedAt: r.seatedAt,
      cancelledAt: r.cancelledAt,
      cancellationReason: r.cancellationReason,

      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }
  }
}
