import vine from '@vinejs/vine'

export const reservationFilterValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    search: vine.string().optional(),
    status: vine.enum(['pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show']).optional(),
    tableId: vine.string().uuid().optional(),
    locationId: vine.string().uuid().optional(),
    reservedFrom: vine.string().optional(),
    reservedTo: vine.string().optional(),
    sortBy: vine.enum(['reservedFor', 'partySize', 'createdAt']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
  })
)

export const createReservationValidator = vine.compile(
  vine.object({
    tableId: vine.string().uuid().optional(),
    locationId: vine.string().uuid().optional(),
    customerId: vine.string().uuid().optional(),
    partySize: vine.number().min(1),
    reservedFor: vine.string(),
    reservedByName: vine.string().trim().minLength(1),
    reservedByPhone: vine.string().trim().minLength(1),
    notes: vine.string().trim().optional(),
  })
)

export const updateReservationValidator = vine.compile(
  vine.object({
    tableId: vine.string().uuid().nullable().optional(),
    locationId: vine.string().uuid().nullable().optional(),
    customerId: vine.string().uuid().nullable().optional(),
    partySize: vine.number().min(1).optional(),
    reservedFor: vine.string().optional(),
    reservedByName: vine.string().trim().minLength(1).optional(),
    reservedByPhone: vine.string().trim().minLength(1).optional(),
    notes: vine.string().trim().nullable().optional(),
  })
)

export const cancelReservationValidator = vine.compile(
  vine.object({
    reason: vine.string().trim().optional(),
  })
)

export const seatReservationValidator = vine.compile(
  vine.object({
    tableId: vine.string().uuid().optional(),
    createSale: vine.boolean().optional(),
  })
)
