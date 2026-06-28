import vine from '@vinejs/vine'

export const productCategoryFilterValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    search: vine.string().optional(),
    isActive: vine.boolean().optional(),
    sortBy: vine.enum(['name', 'createdAt']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
  })
)

export const createProductCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(150),
    description: vine.string().optional(),
  })
)

export const updateProductCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(150).optional(),
    description: vine.string().optional(),
    isActive: vine.boolean().optional(),
  })
)
