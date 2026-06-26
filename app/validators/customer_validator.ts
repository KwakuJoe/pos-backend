import vine from '@vinejs/vine'

export const customerFilterValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    search: vine.string().optional(),
    isActive: vine.boolean().optional(),
    hasCredit: vine.boolean().optional(),
    createdFrom: vine.string().optional(),
    createdTo: vine.string().optional(),
    sortBy: vine.enum(['fullName', 'email', 'outstandingBalance', 'createdAt']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
  })
)

export const createCustomerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2),
    email: vine.string().email().optional(),
    phone: vine.string().optional(),
    address: vine.string().optional(),
    dateOfBirth: vine.string().optional(),
    notes: vine.string().optional(),
    creditLimit: vine.number().min(0).optional(),
  })
)

export const updateCustomerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).optional(),
    email: vine.string().email().optional(),
    phone: vine.string().optional(),
    address: vine.string().optional(),
    dateOfBirth: vine.string().optional(),
    notes: vine.string().optional(),
    creditLimit: vine.number().min(0).optional(),
    isActive: vine.boolean().optional(),
  })
)
