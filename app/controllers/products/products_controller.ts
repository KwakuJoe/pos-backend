import type { HttpContext } from '@adonisjs/core/http'
import { deleteImage } from '#services/cloudinary_service'
import Product from '#models/product'
import ProductVariant from '#models/product_variant'
import ProductModifier from '#models/product_modifier'
import ProductModifierOption from '#models/product_modifier_option'
import ProductTransformer from '#transformers/product_transformer'
import {
  productFilterValidator,
  createProductValidator,
  updateProductValidator,
  createVariantValidator,
  updateVariantValidator,
  createModifierValidator,
  updateModifierValidator,
  createModifierOptionValidator,
  updateModifierOptionValidator,
} from '#validators/product_validator'
import ProductFilter from '#filters/product_filter'

export default class ProductsController {
  // ── Products ────────────────────────────────────────────────────

  async index({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(productFilterValidator)
    const page = payload.page ?? 1
    const limit = payload.limit ?? 20

    let query = Product.query()
      .where('business_id', user.businessId)
      .preload('category')
      .preload('tax')
      .withCount('variants', (q) => q.where('is_active', true))
      .withCount('modifiers')

    query = new ProductFilter(query, { ...payload }).apply()

    const products = await query.paginate(page, limit)
    const transformed = await serialize(ProductTransformer.paginate(products.all(), products.getMeta()))

    return response.ok({
      message: 'Products fetched successfully',
      data: transformed.data,
      meta: transformed.metadata,
    })
  }

  async store({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createProductValidator)

    const product = await Product.create({
      businessId: user.businessId,
      name: data.name,
      description: data.description ?? null,
      imageUrl: data.imageUrl ?? null,
      imagePublicId: data.imagePublicId ?? null,
      type: data.type ?? 'physical',
      categoryId: data.categoryId ?? null,
      taxId: data.taxId ?? null,
      sku: data.sku ?? null,
      barcode: data.barcode ?? null,
      price: data.price,
      costPrice: data.costPrice ?? null,
      pricingModel: data.pricingModel ?? 'fixed',
      unit: data.unit ?? 'piece',
      metadata: data.metadata ?? null,
    })

    await product.load('category')
    await product.load('tax')

    const transformed = await serialize(ProductTransformer.transform(product))
    return response.created({ message: 'Product created successfully', data: transformed.data })
  }

  async show({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const product = await Product.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .preload('category')
      .preload('tax')
      .preload('variants')
      .preload('modifiers', (q) => q.preload('options'))
      .firstOrFail()

    const transformed = await serialize(ProductTransformer.transform(product))
    return response.ok({ data: transformed.data })
  }

  async update({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const product = await Product.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const data = await request.validateUsing(updateProductValidator)

    // image replaced → delete old one from Cloudinary
    if (data.imageUrl !== undefined && data.imageUrl !== product.imageUrl) {
      if (product.imagePublicId) {
        await deleteImage(product.imagePublicId)
      }
    }

    // image explicitly removed → delete from Cloudinary and clear both fields
    if (data.imageUrl === null && product.imagePublicId) {
      await deleteImage(product.imagePublicId)
      product.imagePublicId = null
    }

    product.merge(data as any)
    await product.save()

    await product.load('category')
    await product.load('tax')
    await product.load('variants')
    await product.load('modifiers', (q) => q.preload('options'))

    const transformed = await serialize(ProductTransformer.transform(product))
    return response.ok({ message: 'Product updated successfully', data: transformed.data })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const product = await Product.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    product.isActive = false
    await product.save()

    return response.noContent()
  }

  // ── Variants ────────────────────────────────────────────────────

  async storeVariant({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const product = await Product.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const data = await request.validateUsing(createVariantValidator)

    if (data.isDefault) {
      await ProductVariant.query()
        .where('product_id', product.id)
        .update({ is_default: false })
    }

    const variant = await ProductVariant.create({
      productId: product.id,
      name: data.name,
      priceAdjustment: data.priceAdjustment ?? 0,
      isDefault: data.isDefault ?? false,
    })

    await product.load('category')
    await product.load('tax')
    await product.load('variants')
    await product.load('modifiers', (q) => q.preload('options'))

    const transformed = await serialize(ProductTransformer.transform(product))
    return response.created({
      message: 'Variant added successfully',
      data: { variant: { id: variant.id, name: variant.name }, product: transformed.data },
    })
  }

  async updateVariant({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const product = await Product.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const variant = await ProductVariant.query()
      .where('id', params.variantId)
      .where('product_id', product.id)
      .firstOrFail()

    const data = await request.validateUsing(updateVariantValidator)

    if (data.isDefault) {
      await ProductVariant.query()
        .where('product_id', product.id)
        .whereNot('id', variant.id)
        .update({ is_default: false })
    }

    variant.merge(data as any)
    await variant.save()

    return response.ok({ message: 'Variant updated successfully' })
  }

  async destroyVariant({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const product = await Product.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const variant = await ProductVariant.query()
      .where('id', params.variantId)
      .where('product_id', product.id)
      .firstOrFail()

    await variant.delete()
    return response.noContent()
  }

  // ── Modifiers ───────────────────────────────────────────────────

  async storeModifier({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const product = await Product.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const data = await request.validateUsing(createModifierValidator)

    const modifier = await ProductModifier.create({
      productId: product.id,
      name: data.name,
      isRequired: data.isRequired ?? false,
      maxSelections: data.maxSelections ?? 1,
    })

    return response.created({
      message: 'Modifier added successfully',
      data: { id: modifier.id, name: modifier.name },
    })
  }

  async updateModifier({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const product = await Product.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const modifier = await ProductModifier.query()
      .where('id', params.modifierId)
      .where('product_id', product.id)
      .firstOrFail()

    const data = await request.validateUsing(updateModifierValidator)
    modifier.merge(data as any)
    await modifier.save()

    return response.ok({ message: 'Modifier updated successfully' })
  }

  async destroyModifier({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const product = await Product.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const modifier = await ProductModifier.query()
      .where('id', params.modifierId)
      .where('product_id', product.id)
      .firstOrFail()

    await modifier.delete()
    return response.noContent()
  }

  // ── Modifier Options ────────────────────────────────────────────

  async storeModifierOption({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const product = await Product.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const modifier = await ProductModifier.query()
      .where('id', params.modifierId)
      .where('product_id', product.id)
      .firstOrFail()

    const data = await request.validateUsing(createModifierOptionValidator)

    const option = await ProductModifierOption.create({
      modifierId: modifier.id,
      name: data.name,
      priceAdjustment: data.priceAdjustment ?? 0,
    })

    return response.created({
      message: 'Option added successfully',
      data: { id: option.id, name: option.name, priceAdjustment: option.priceAdjustment },
    })
  }

  async updateModifierOption({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const product = await Product.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const modifier = await ProductModifier.query()
      .where('id', params.modifierId)
      .where('product_id', product.id)
      .firstOrFail()

    const option = await ProductModifierOption.query()
      .where('id', params.optionId)
      .where('modifier_id', modifier.id)
      .firstOrFail()

    const data = await request.validateUsing(updateModifierOptionValidator)
    option.merge(data as any)
    await option.save()

    return response.ok({ message: 'Option updated successfully' })
  }

  async destroyModifierOption({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const product = await Product.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    const modifier = await ProductModifier.query()
      .where('id', params.modifierId)
      .where('product_id', product.id)
      .firstOrFail()

    const option = await ProductModifierOption.query()
      .where('id', params.optionId)
      .where('modifier_id', modifier.id)
      .firstOrFail()

    await option.delete()
    return response.noContent()
  }
}
