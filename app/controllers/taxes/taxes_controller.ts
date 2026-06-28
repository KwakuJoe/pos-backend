import type { HttpContext } from '@adonisjs/core/http'
import Tax from '#models/tax'
import TaxTransformer from '#transformers/tax_transformer'
import { taxFilterValidator, createTaxValidator, updateTaxValidator } from '#validators/tax_validator'
import TaxFilter from '#filters/tax_filter'

export default class TaxesController {
  async index({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(taxFilterValidator)
    const page = payload.page ?? 1
    const limit = payload.limit ?? 50

    let query = Tax.query().where('business_id', user.businessId)
    query = new TaxFilter(query, { ...payload }).apply()

    const taxes = await query.paginate(page, limit)
    const transformed = await serialize(TaxTransformer.paginate(taxes.all(), taxes.getMeta()))

    return response.ok({
      message: 'Taxes fetched successfully',
      data: transformed.data,
      meta: transformed.metadata,
    })
  }

  async store({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createTaxValidator)

    const tax = await Tax.create({
      businessId: user.businessId,
      name: data.name,
      rate: data.rate,
      isInclusive: data.isInclusive ?? false,
    })

    const transformed = await serialize(TaxTransformer.transform(tax))
    return response.created({ message: 'Tax created successfully', data: transformed.data })
  }

  async show({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const tax = await Tax.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const transformed = await serialize(TaxTransformer.transform(tax))
    return response.ok({ data: transformed.data })
  }

  async update({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const tax = await Tax.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const data = await request.validateUsing(updateTaxValidator)
    tax.merge(data as any)
    await tax.save()

    const transformed = await serialize(TaxTransformer.transform(tax))
    return response.ok({ message: 'Tax updated successfully', data: transformed.data })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const tax = await Tax.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    await tax.delete()
    return response.noContent()
  }
}
