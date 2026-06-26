import vine from '@vinejs/vine'

export const creditPaymentFilterValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    paymentMethod: vine.string().optional(),
    createdFrom: vine.string().optional(),
    createdTo: vine.string().optional(),
  })
)

export const createCreditPaymentValidator = vine.compile(
  vine.object({
    amount: vine.number().min(0.01),
    paymentMethod: vine.enum(['cash', 'mobile_money', 'card', 'bank_transfer']),
    notes: vine.string().optional(),
  })
)
