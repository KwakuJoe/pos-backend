import vine from '@vinejs/vine'

export const appointmentFilterValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    search: vine.string().optional(),
    status: vine
      .enum(['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'])
      .optional(),
    type: vine.enum(['appointment', 'walk_in']).optional(),
    staffId: vine.string().uuid().optional(),
    serviceId: vine.string().uuid().optional(),
    saleId: vine.string().uuid().optional(),
    scheduledFrom: vine.string().optional(),
    scheduledTo: vine.string().optional(),
    sortBy: vine.enum(['scheduledFor', 'createdAt']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
  })
)

export const createAppointmentValidator = vine.compile(
  vine.object({
    type: vine.enum(['appointment', 'walk_in']).optional(),
    customerName: vine.string().trim().minLength(1),
    customerPhone: vine.string().trim().minLength(1),
    staffId: vine.string().uuid().optional(),
    serviceId: vine.string().uuid().optional(),
    locationId: vine.string().uuid().optional(),
    customerId: vine.string().uuid().optional(),
    scheduledFor: vine.string().optional(),
    durationMinutes: vine.number().min(1).optional(),
    notes: vine.string().trim().optional(),
    createSale: vine.boolean().optional(),
  })
)

export const updateAppointmentValidator = vine.compile(
  vine.object({
    customerName: vine.string().trim().minLength(1).optional(),
    customerPhone: vine.string().trim().minLength(1).optional(),
    staffId: vine.string().uuid().nullable().optional(),
    serviceId: vine.string().uuid().nullable().optional(),
    locationId: vine.string().uuid().nullable().optional(),
    customerId: vine.string().uuid().nullable().optional(),
    scheduledFor: vine.string().optional(),
    durationMinutes: vine.number().min(1).nullable().optional(),
    notes: vine.string().trim().nullable().optional(),
  })
)

export const startAppointmentValidator = vine.compile(
  vine.object({
    createSale: vine.boolean().optional(),
  })
)

export const cancelAppointmentValidator = vine.compile(
  vine.object({
    reason: vine.string().trim().optional(),
  })
)
