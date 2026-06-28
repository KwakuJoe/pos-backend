import { BaseTransformer } from '@adonisjs/core/transformers'
import type ProductCategory from '#models/product_category'

export default class ProductCategoryTransformer extends BaseTransformer<ProductCategory> {
  toObject() {
    return {
      id: this.resource.id,
      businessId: this.resource.businessId,
      name: this.resource.name,
      description: this.resource.description,
      isActive: this.resource.isActive,
      createdAt: this.resource.createdAt,
      updatedAt: this.resource.updatedAt,
    }
  }
}
