import vine from '@vinejs/vine'

export const productFilterValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    search: vine.string().optional(),
    categoryId: vine.string().uuid().optional(),
    taxId: vine.string().uuid().optional(),
    type: vine.enum(['physical', 'service', 'composite']).optional(),
    pricingModel: vine.enum(['fixed', 'per_kg', 'per_hour']).optional(),
    isActive: vine.boolean().optional(),
    priceFrom: vine.number().min(0).optional(),
    priceTo: vine.number().min(0).optional(),
    createdFrom: vine.string().optional(),
    createdTo: vine.string().optional(),
    sortBy: vine.enum(['name', 'price', 'createdAt']).optional(),
    sortOrder: vine.enum(['asc', 'desc']).optional(),
  })
)

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(200),
    description: vine.string().optional(),
    imageUrl: vine.string().url().optional(),
    imagePublicId: vine.string().optional(),
    type: vine.enum(['physical', 'service', 'composite']).optional(),
    categoryId: vine.string().uuid().optional(),
    taxId: vine.string().uuid().optional(),
    sku: vine.string().optional(),
    barcode: vine.string().optional(),
    price: vine.number().min(0),
    costPrice: vine.number().min(0).optional(),
    pricingModel: vine.enum(['fixed', 'per_kg', 'per_hour']).optional(),
    unit: vine.enum(['piece', 'kg', 'g', 'litre', 'ml', 'hour', 'pack', 'dozen', 'other']).optional(),
    metadata: vine.object({}).allowUnknownProperties().optional(),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(200).optional(),
    description: vine.string().optional(),
    imageUrl: vine.string().url().nullable().optional(),
    imagePublicId: vine.string().nullable().optional(),
    type: vine.enum(['physical', 'service', 'composite']).optional(),
    categoryId: vine.string().uuid().nullable().optional(),
    taxId: vine.string().uuid().nullable().optional(),
    sku: vine.string().nullable().optional(),
    barcode: vine.string().nullable().optional(),
    price: vine.number().min(0).optional(),
    costPrice: vine.number().min(0).nullable().optional(),
    pricingModel: vine.enum(['fixed', 'per_kg', 'per_hour']).optional(),
    unit: vine.enum(['piece', 'kg', 'g', 'litre', 'ml', 'hour', 'pack', 'dozen', 'other']).optional(),
    isActive: vine.boolean().optional(),
    metadata: vine.object({}).allowUnknownProperties().optional(),
  })
)

export const createVariantValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(100),
    priceAdjustment: vine.number().optional(),
    isDefault: vine.boolean().optional(),
  })
)

export const updateVariantValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(100).optional(),
    priceAdjustment: vine.number().optional(),
    isDefault: vine.boolean().optional(),
    isActive: vine.boolean().optional(),
  })
)

export const createModifierValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(100),
    isRequired: vine.boolean().optional(),
    maxSelections: vine.number().min(1).optional(),
  })
)

export const updateModifierValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(100).optional(),
    isRequired: vine.boolean().optional(),
    maxSelections: vine.number().min(1).optional(),
  })
)

export const createModifierOptionValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(100),
    priceAdjustment: vine.number().optional(),
  })
)

export const updateModifierOptionValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(100).optional(),
    priceAdjustment: vine.number().optional(),
    isActive: vine.boolean().optional(),
  })
)
