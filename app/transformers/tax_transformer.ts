import { BaseTransformer } from '@adonisjs/core/transformers'
import type Tax from '#models/tax'

export default class TaxTransformer extends BaseTransformer<Tax> {
  toObject() {
    return {
      id: this.resource.id,
      businessId: this.resource.businessId,
      name: this.resource.name,
      rate: this.resource.rate,
      isInclusive: this.resource.isInclusive,
      isActive: this.resource.isActive,
      createdAt: this.resource.createdAt,
      updatedAt: this.resource.updatedAt,
    }
  }
}
