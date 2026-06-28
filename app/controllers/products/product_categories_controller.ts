import type { HttpContext } from '@adonisjs/core/http'
import ProductCategory from '#models/product_category'
import ProductCategoryTransformer from '#transformers/product_category_transformer'
import {
  productCategoryFilterValidator,
  createProductCategoryValidator,
  updateProductCategoryValidator,
} from '#validators/product_category_validator'
import ProductCategoryFilter from '#filters/product_category_filter'

export default class ProductCategoriesController {
  async index({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(productCategoryFilterValidator)
    const page = payload.page ?? 1
    const limit = payload.limit ?? 100

    let query = ProductCategory.query().where('business_id', user.businessId)
    query = new ProductCategoryFilter(query, { ...payload }).apply()

    const categories = await query.paginate(page, limit)
    const transformed = await serialize(
      ProductCategoryTransformer.paginate(categories.all(), categories.getMeta())
    )

    return response.ok({
      message: 'Categories fetched successfully',
      data: transformed.data,
      meta: transformed.metadata,
    })
  }

  async store({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createProductCategoryValidator)

    const category = await ProductCategory.create({
      businessId: user.businessId,
      name: data.name,
      description: data.description ?? null,
    })

    const transformed = await serialize(ProductCategoryTransformer.transform(category))
    return response.created({ message: 'Category created successfully', data: transformed.data })
  }

  async update({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const category = await ProductCategory.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const data = await request.validateUsing(updateProductCategoryValidator)
    category.merge(data as any)
    await category.save()

    const transformed = await serialize(ProductCategoryTransformer.transform(category))
    return response.ok({ message: 'Category updated successfully', data: transformed.data })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const category = await ProductCategory.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    await category.delete()
    return response.noContent()
  }
}
