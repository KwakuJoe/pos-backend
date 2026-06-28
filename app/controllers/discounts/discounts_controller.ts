import type { HttpContext } from '@adonisjs/core/http'
import Discount from '#models/discount'
import DiscountTransformer from '#transformers/discount_transformer'
import {
  discountFilterValidator,
  createDiscountValidator,
  updateDiscountValidator,
} from '#validators/discount_validator'
import DiscountFilter from '#filters/discount_filter'

export default class DiscountsController {
  async index({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(discountFilterValidator)
    const page = payload.page ?? 1
    const limit = payload.limit ?? 50

    let query = Discount.query().where('business_id', user.businessId)
    query = new DiscountFilter(query, { ...payload }).apply()

    const discounts = await query.paginate(page, limit)
    const transformed = await serialize(DiscountTransformer.paginate(discounts.all(), discounts.getMeta()))

    return response.ok({
      message: 'Discounts fetched successfully',
      data: transformed.data,
      meta: transformed.metadata,
    })
  }

  async store({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createDiscountValidator)

    if (data.type === 'percentage' && data.value > 100) {
      return response.badRequest({ message: 'Percentage discount cannot exceed 100%.' })
    }

    const discount = await Discount.create({
      businessId: user.businessId,
      name: data.name,
      code: data.code ?? null,
      type: data.type,
      value: data.value,
      minOrderAmount: data.minOrderAmount ?? null,
      maxUses: data.maxUses ?? null,
      startsAt: data.startsAt ? (data.startsAt as any) : null,
      endsAt: data.endsAt ? (data.endsAt as any) : null,
    })

    const transformed = await serialize(DiscountTransformer.transform(discount))
    return response.created({ message: 'Discount created successfully', data: transformed.data })
  }

  async show({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const discount = await Discount.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const transformed = await serialize(DiscountTransformer.transform(discount))
    return response.ok({ data: transformed.data })
  }

  async update({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const discount = await Discount.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const data = await request.validateUsing(updateDiscountValidator)

    if (data.type === 'percentage' && (data.value ?? discount.value) > 100) {
      return response.badRequest({ message: 'Percentage discount cannot exceed 100%.' })
    }

    discount.merge(data as any)
    await discount.save()

    const transformed = await serialize(DiscountTransformer.transform(discount))
    return response.ok({ message: 'Discount updated successfully', data: transformed.data })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const discount = await Discount.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    await discount.delete()
    return response.noContent()
  }

  // Validate a discount code — used at the POS sales screen
  async validate({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { code, orderAmount } = request.only(['code', 'orderAmount'])

    if (!code) {
      return response.badRequest({ message: 'Discount code is required.' })
    }

    const discount = await Discount.query()
      .where('business_id', user.businessId)
      .whereRaw('UPPER(code) = ?', [String(code).toUpperCase()])
      .firstOrFail()

    if (!discount.isUsable) {
      return response.unprocessableEntity({
        message: discount.isExpired
          ? 'This discount has expired.'
          : discount.isExhausted
            ? 'This discount has reached its maximum uses.'
            : 'This discount is not active.',
      })
    }

    if (discount.minOrderAmount && orderAmount < discount.minOrderAmount) {
      return response.unprocessableEntity({
        message: `Minimum order amount of ${discount.minOrderAmount} required for this discount.`,
      })
    }

    const transformed = await serialize(DiscountTransformer.transform(discount))
    return response.ok({ message: 'Discount is valid.', data: transformed.data })
  }
}
