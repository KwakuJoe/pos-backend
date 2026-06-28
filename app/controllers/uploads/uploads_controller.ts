import type { HttpContext } from '@adonisjs/core/http'
import { uploadImage, deleteImage } from '#services/cloudinary_service'
import Business from '#models/business'

const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp']
const MAX_SIZE = '5mb'

export default class UploadsController {
  async image({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const business = await Business.findOrFail(user.businessId)
    const folder = `${business.slug}/products`

    const file = request.file('image', {
      size: MAX_SIZE,
      extnames: ALLOWED_EXTENSIONS,
    })

    if (!file) {
      return response.badRequest({ message: 'No image file provided. Send as multipart/form-data with field name "image".' })
    }

    if (!file.isValid) {
      return response.unprocessableEntity({
        message: 'Invalid file.',
        errors: file.errors,
      })
    }

    const result = await uploadImage(file.tmpPath!, folder)

    return response.created({
      message: 'Image uploaded successfully',
      data: {
        url: result.url,
        publicId: result.publicId,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      },
    })
  }

  async destroy({ auth, request, response }: HttpContext) {
    auth.getUserOrFail()

    const { publicId } = request.only(['publicId'])

    if (!publicId) {
      return response.badRequest({ message: 'publicId is required.' })
    }

    await deleteImage(publicId)

    return response.noContent()
  }
}
