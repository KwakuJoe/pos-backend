import { BaseTransformer } from '@adonisjs/core/transformers'
import type Business from '#models/business'

export default class BusinessTransformer extends BaseTransformer<Business> {
  toObject() {
    return {
      id: this.resource.id,
      name: this.resource.name,
      slug: this.resource.slug,
      email: this.resource.email,
      currency: this.resource.currency,
      timezone: this.resource.timezone,
      isActive: this.resource.isActive,
    }
  }
}
