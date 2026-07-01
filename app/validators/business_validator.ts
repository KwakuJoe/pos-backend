import vine from '@vinejs/vine'

export const updateBusinessValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).optional(),
    email: vine.string().email().optional(),
    phone: vine.string().trim().nullable().optional(),
    address: vine.string().trim().nullable().optional(),
    city: vine.string().trim().nullable().optional(),
    country: vine.string().trim().optional(),
    currency: vine.string().trim().maxLength(10).optional(),
    timezone: vine.string().trim().optional(),
    businessType: vine
      .enum([
        'restaurant',
        'cafe',
        'bar',
        'retail',
        'supermarket',
        'pharmacy',
        'electronics',
        'fashion',
        'laundry',
        'salon',
        'other',
      ])
      .optional(),
    logoUrl: vine.string().url().nullable().optional(),
    logoPublicId: vine.string().trim().nullable().optional(),
  })
)
