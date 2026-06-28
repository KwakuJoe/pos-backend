import type { HttpContext } from '@adonisjs/core/http'
import Table from '#models/table'
import TableTransformer from '#transformers/table_transformer'
import { tableFilterValidator, createTableValidator, updateTableValidator } from '#validators/table_validator'
import TableFilter from '#filters/table_filter'

export default class TablesController {
  async index({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(tableFilterValidator)
    const page = payload.page ?? 1
    const limit = payload.limit ?? 50

    let query = Table.query()
      .where('business_id', user.businessId)
      .preload('location')
      .orderBy('name', 'asc')

    query = new TableFilter(query, { ...payload }).apply()

    const tables = await query.paginate(page, limit)
    const transformed = await serialize(TableTransformer.paginate(tables.all(), tables.getMeta()))

    return response.ok({
      message: 'Tables fetched successfully',
      data: transformed.data,
      meta: transformed.metadata,
    })
  }

  async store({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createTableValidator)

    const table = await Table.create({
      businessId: user.businessId,
      name: data.name,
      capacity: data.capacity ?? 2,
      locationId: data.locationId ?? null,
    })

    await table.load('location')

    const transformed = await serialize(TableTransformer.transform(table))
    return response.created({ message: 'Table created successfully', data: transformed.data })
  }

  async show({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const table = await Table.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .preload('location')
      .firstOrFail()

    const transformed = await serialize(TableTransformer.transform(table))
    return response.ok({ data: transformed.data })
  }

  async update({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const table = await Table.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const data = await request.validateUsing(updateTableValidator)
    table.merge(data as any)
    await table.save()

    await table.load('location')

    const transformed = await serialize(TableTransformer.transform(table))
    return response.ok({ message: 'Table updated successfully', data: transformed.data })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const table = await Table.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    await table.delete()
    return response.noContent()
  }
}
