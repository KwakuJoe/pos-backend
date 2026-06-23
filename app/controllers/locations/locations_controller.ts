import type { HttpContext } from '@adonisjs/core/http'
import Location from '#models/location'
import LocationTransformer from '#transformers/location_transformer'
import { locationFilterValidator, createLocationValidator, updateLocationValidator } from '#validators/location_validator'
import LocationFilter from '#filters/location_filter'

export default class LocationsController {
  async index({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(locationFilterValidator)
    const page = payload.page ?? 1
    const limit = payload.limit ?? 20

    let query = Location.query()
      .where('business_id', user.businessId)
      .orderBy('is_main', 'desc')
      .orderBy('name')

    query = new LocationFilter(query, { ...payload }).apply()

    const locations = await query.paginate(page, limit)
    const transformed = await serialize(LocationTransformer.paginate(locations.all(), locations.getMeta()))

    return response.ok({
      message: 'Locations fetched successfully',
      data: transformed.data,
      meta: transformed.metadata,
    })
  }

  async store({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createLocationValidator)

    const location = await Location.create({
      businessId: user.businessId,
      name: data.name,
      address: data.address ?? null,
      city: data.city ?? null,
      phone: data.phone ?? null,
      isMain: false,
    })

    const transformed = await serialize(LocationTransformer.transform(location))
    return response.created({
      message: 'Location created successfully',
      data: transformed.data,
    })
  }

  async update({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const location = await Location.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const data = await request.validateUsing(updateLocationValidator)
    location.merge(data as any)
    await location.save()

    const transformed = await serialize(LocationTransformer.transform(location))
    return response.ok({
      message: 'Location updated successfully',
      data: transformed.data,
    })
  }
}
