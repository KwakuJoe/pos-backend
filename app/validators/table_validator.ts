import vine from '@vinejs/vine'

export const tableFilterValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    search: vine.string().optional(),
    locationId: vine.string().uuid().optional(),
    status: vine.enum(['available', 'occupied', 'reserved', 'bill_requested']).optional(),
    isActive: vine.boolean().optional(),
    sortBy: vine.enum(['name', 'capacity', 'status', 'createdAt']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
  })
)

export const createTableValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(100),
    capacity: vine.number().min(1).optional(),
    locationId: vine.string().uuid().optional(),
  })
)

export const updateTableValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(100).optional(),
    capacity: vine.number().min(1).optional(),
    locationId: vine.string().uuid().nullable().optional(),
    status: vine.enum(['available', 'occupied', 'reserved', 'bill_requested']).optional(),
    isActive: vine.boolean().optional(),
  })
)
