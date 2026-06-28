import { BaseTransformer } from '@adonisjs/core/transformers'
import type Product from '#models/product'

export default class ProductTransformer extends BaseTransformer<Product> {
  toObject() {
    return {
      id: this.resource.id,
      businessId: this.resource.businessId,
      name: this.resource.name,
      description: this.resource.description,
      imageUrl: this.resource.imageUrl,
      imagePublicId: this.resource.imagePublicId,
      type: this.resource.type,
      sku: this.resource.sku,
      barcode: this.resource.barcode,
      price: this.resource.price,
      costPrice: this.resource.costPrice,
      pricingModel: this.resource.pricingModel,
      unit: this.resource.unit,
      isActive: this.resource.isActive,
      metadata: this.resource.metadata,
      category: this.resource.category
        ? { id: this.resource.category.id, name: this.resource.category.name }
        : null,
      tax: this.resource.tax
        ? {
            id: this.resource.tax.id,
            name: this.resource.tax.name,
            rate: this.resource.tax.rate,
            isInclusive: this.resource.tax.isInclusive,
          }
        : null,
      // hasVariants / hasModifiers — always present, used by POS list to show picker indicator
      // $extras keys from withCount() use snake_case: variants_count, modifiers_count
      hasVariants:
        this.resource.$extras?.variants_count !== undefined
          ? Number(this.resource.$extras.variants_count) > 0
          : (this.resource.variants?.length ?? 0) > 0,
      hasModifiers:
        this.resource.$extras?.modifiers_count !== undefined
          ? Number(this.resource.$extras.modifiers_count) > 0
          : (this.resource.modifiers?.length ?? 0) > 0,

      // Full arrays only on detail (GET /products/:id) — empty on list
      variants:
        this.resource.variants?.map((v) => ({
          id: v.id,
          name: v.name,
          priceAdjustment: v.priceAdjustment,
          isDefault: v.isDefault,
          isActive: v.isActive,
        })) ?? [],
      modifiers:
        this.resource.modifiers?.map((m) => ({
          id: m.id,
          name: m.name,
          isRequired: m.isRequired,
          maxSelections: m.maxSelections,
          options:
            m.options?.map((o) => ({
              id: o.id,
              name: o.name,
              priceAdjustment: o.priceAdjustment,
              isActive: o.isActive,
            })) ?? [],
        })) ?? [],
      createdAt: this.resource.createdAt,
      updatedAt: this.resource.updatedAt,
    }
  }
}
