import vine from '@vinejs/vine'

export const userFilterValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    search: vine.string().optional(),
    roleId: vine.string().uuid().optional(),
    isActive: vine.boolean().optional(),
    sortBy: vine.enum(['fullName', 'email', 'createdAt']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
  })
)

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(2).maxLength(100),
    email: vine.string().email().maxLength(254),
    phone: vine.string().nullable().optional(),
    roleId: vine.string().uuid(),
    locationIds: vine.array(vine.string().uuid()).optional(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(2).maxLength(100).optional(),
    phone: vine.string().nullable().optional(),
    roleId: vine.string().uuid().optional(),
    locationIds: vine.array(vine.string().uuid()).optional(),
    isActive: vine.boolean().optional(),
    resetPassword: vine.boolean().optional(),
  })
)
