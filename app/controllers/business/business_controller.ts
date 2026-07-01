import type { HttpContext } from '@adonisjs/core/http'
import Business from '#models/business'
import BusinessTransformer from '#transformers/business_transformer'
import { updateBusinessValidator } from '#validators/business_validator'
import { deleteImage } from '#services/cloudinary_service'

export default class BusinessController {
  async show({ auth, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const business = await Business.findOrFail(user.businessId)
    const transformed = await serialize(BusinessTransformer.transform(business))
    return response.ok({ data: transformed.data })
  }

  async update({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(updateBusinessValidator)

    const business = await Business.findOrFail(user.businessId)

    // Logo replaced → delete old one from Cloudinary
    if (data.logoUrl !== undefined && data.logoUrl !== business.logoUrl) {
      if (business.logoPublicId) {
        await deleteImage(business.logoPublicId)
      }
    }

    // Logo explicitly removed → delete from Cloudinary and clear both fields
    if (data.logoUrl === null && business.logoPublicId) {
      await deleteImage(business.logoPublicId)
      business.logoPublicId = null
    }

    business.merge(data as any)
    await business.save()

    const transformed = await serialize(BusinessTransformer.transform(business))
    return response.ok({ message: 'Business updated successfully', data: transformed.data })
  }
}
