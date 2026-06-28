import vine from '@vinejs/vine'

export const discountFilterValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    search: vine.string().optional(),
    type: vine.enum(['percentage', 'fixed']).optional(),
    isActive: vine.boolean().optional(),
    isUsable: vine.boolean().optional(),
    sortBy: vine.enum(['name', 'value', 'usesCount', 'createdAt']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
  })
)

export const createDiscountValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(150),
    code: vine.string().trim().toUpperCase().optional(),
    type: vine.enum(['percentage', 'fixed']),
    value: vine.number().min(0),
    minOrderAmount: vine.number().min(0).optional(),
    maxUses: vine.number().min(1).optional(),
    startsAt: vine.string().optional(),
    endsAt: vine.string().optional(),
  })
)

export const updateDiscountValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(150).optional(),
    code: vine.string().trim().toUpperCase().nullable().optional(),
    type: vine.enum(['percentage', 'fixed']).optional(),
    value: vine.number().min(0).optional(),
    minOrderAmount: vine.number().min(0).nullable().optional(),
    maxUses: vine.number().min(1).nullable().optional(),
    startsAt: vine.string().nullable().optional(),
    endsAt: vine.string().nullable().optional(),
    isActive: vine.boolean().optional(),
  })
)
