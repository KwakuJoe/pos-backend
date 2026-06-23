import vine from '@vinejs/vine'

export const roleFilterValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    search: vine.string().optional(),
    isSystem: vine.boolean().optional(),
    sortBy: vine.enum(['name', 'createdAt']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
  })
)

export const createRoleValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(100),
    description: vine.string().nullable().optional(),
    permissionIds: vine.array(vine.string().uuid()),
  })
)

export const updateRoleValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(2).maxLength(100).optional(),
    description: vine.string().nullable().optional(),
    permissionIds: vine.array(vine.string().uuid()).optional(),
  })
)
