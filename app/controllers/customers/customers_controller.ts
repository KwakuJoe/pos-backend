import type { HttpContext } from '@adonisjs/core/http'
import Customer from '#models/customer'
import CustomerTransformer from '#transformers/customer_transformer'
import {
  customerFilterValidator,
  createCustomerValidator,
  updateCustomerValidator,
} from '#validators/customer_validator'
import CustomerFilter from '#filters/customer_filter'

export default class CustomersController {
  async index({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(customerFilterValidator)
    const page = payload.page ?? 1
    const limit = payload.limit ?? 20

    let query = Customer.query().where('business_id', user.businessId)

    query = new CustomerFilter(query, { ...payload }).apply()

    const customers = await query.paginate(page, limit)
    const transformed = await serialize(
      CustomerTransformer.paginate(customers.all(), customers.getMeta())
    )

    return response.ok({
      message: 'Customers fetched successfully',
      data: transformed.data,
      meta: transformed.metadata,
    })
  }

  async store({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createCustomerValidator)

    const customer = await Customer.create({
      businessId: user.businessId,
      createdBy: user.id,
      fullName: data.fullName,
      email: data.email ?? null,
      phone: data.phone ?? null,
      address: data.address ?? null,
      notes: data.notes ?? null,
      creditLimit: data.creditLimit ?? 0,
    })

    const transformed = await serialize(CustomerTransformer.transform(customer))
    return response.created({
      message: 'Customer created successfully',
      data: transformed.data,
    })
  }

  async show({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const customer = await Customer.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const transformed = await serialize(CustomerTransformer.transform(customer))
    return response.ok({ data: transformed.data })
  }

  async update({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const customer = await Customer.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const data = await request.validateUsing(updateCustomerValidator)
    customer.merge(data as any)
    await customer.save()

    const transformed = await serialize(CustomerTransformer.transform(customer))
    return response.ok({
      message: 'Customer updated successfully',
      data: transformed.data,
    })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const customer = await Customer.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    customer.isActive = false
    await customer.save()

    return response.noContent()
  }
}
