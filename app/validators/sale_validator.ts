import vine from '@vinejs/vine'

const modifierSchema = vine.object({
  optionId: vine.string().uuid(),
})

const itemSchema = vine.object({
  productId: vine.string().uuid(),
  variantId: vine.string().uuid().optional(),
  quantity: vine.number().min(0.001).optional(),
  modifiers: vine.array(modifierSchema).optional(),
  notes: vine.string().trim().optional(),
})

export const saleFilterValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    search: vine.string().optional(),
    status: vine.enum(['pending', 'completed', 'voided', 'refunded']).optional(),
    type: vine.enum(['dine_in', 'takeaway', 'delivery', 'service']).optional(),
    customerId: vine.string().uuid().optional(),
    tableId: vine.string().uuid().optional(),
    locationId: vine.string().uuid().optional(),
    createdFrom: vine.string().optional(),
    createdTo: vine.string().optional(),
    createdBy: vine.string().uuid().optional(),
    sortBy: vine.enum(['createdAt', 'totalAmount', 'saleNumber']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
  })
)

export const createSaleValidator = vine.compile(
  vine.object({
    type: vine.enum(['dine_in', 'takeaway', 'delivery', 'service']).optional(),
    tableId: vine.string().uuid().optional(),
    customerId: vine.string().uuid().optional(),
    locationId: vine.string().uuid().optional(),
    notes: vine.string().trim().optional(),
    items: vine.array(itemSchema).optional(),
  })
)

export const addSaleItemValidator = vine.compile(
  vine.object({
    productId: vine.string().uuid(),
    variantId: vine.string().uuid().optional(),
    quantity: vine.number().min(0.001).optional(),
    modifiers: vine.array(modifierSchema).optional(),
    notes: vine.string().trim().optional(),
    staffId: vine.string().uuid().optional(),
  })
)

export const updateSaleItemValidator = vine.compile(
  vine.object({
    quantity: vine.number().min(0.001).optional(),
    notes: vine.string().trim().nullable().optional(),
    staffId: vine.string().uuid().nullable().optional(),
  })
)

export const addPaymentValidator = vine.compile(
  vine.object({
    amount: vine.number().min(0.01),
    method: vine.enum(['cash', 'card', 'mobile_money', 'credit', 'bank_transfer', 'other']),
    cashTendered: vine.number().min(0).optional(),
    reference: vine.string().trim().optional(),
    notes: vine.string().trim().optional(),
  })
)

export const applyDiscountValidator = vine.compile(
  vine.object({
    discountId: vine.string().uuid().nullable(),
  })
)

export const voidSaleValidator = vine.compile(
  vine.object({
    reason: vine.string().trim().optional(),
  })
)

export const kitchenStatusValidator = vine.compile(
  vine.object({
    status: vine.enum(['in_progress', 'ready', 'bumped']),
  })
)

export const transferTableValidator = vine.compile(
  vine.object({
    tableId: vine.string().uuid(),
  })
)
