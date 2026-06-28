import vine from '@vinejs/vine'

export const taxFilterValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    search: vine.string().optional(),
    isActive: vine.boolean().optional(),
    isInclusive: vine.boolean().optional(),
    sortBy: vine.enum(['name', 'rate', 'createdAt']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
  })
)

export const createTaxValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(100),
    rate: vine.number().min(0).max(1),
    isInclusive: vine.boolean().optional(),
  })
)

export const updateTaxValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(100).optional(),
    rate: vine.number().min(0).max(1).optional(),
    isInclusive: vine.boolean().optional(),
    isActive: vine.boolean().optional(),
  })
)
