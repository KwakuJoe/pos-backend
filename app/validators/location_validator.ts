import vine from '@vinejs/vine'

export const locationFilterValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    search: vine.string().optional(),
    isActive: vine.boolean().optional(),
    isMain: vine.boolean().optional(),
    sortBy: vine.enum(['name', 'city', 'createdAt']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
  })
)

export const createLocationValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(150),
    address: vine.string().nullable().optional(),
    city: vine.string().nullable().optional(),
    phone: vine.string().nullable().optional(),
  })
)

export const updateLocationValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(150).optional(),
    address: vine.string().nullable().optional(),
    city: vine.string().nullable().optional(),
    phone: vine.string().nullable().optional(),
    isActive: vine.boolean().optional(),
  })
)
