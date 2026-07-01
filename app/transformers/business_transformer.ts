import { BaseTransformer } from '@adonisjs/core/transformers'
import type Business from '#models/business'

export default class BusinessTransformer extends BaseTransformer<Business> {
  toObject() {
    return {
      id: this.resource.id,
      name: this.resource.name,
      slug: this.resource.slug,
      email: this.resource.email,
      phone: this.resource.phone,
      address: this.resource.address,
      city: this.resource.city,
      country: this.resource.country,
      logoUrl: this.resource.logoUrl,
      logoPublicId: this.resource.logoPublicId,
      currency: this.resource.currency,
      timezone: this.resource.timezone,
      businessType: this.resource.businessType,
      isActive: this.resource.isActive,
      createdAt: this.resource.createdAt,
      updatedAt: this.resource.updatedAt,
    }
  }
}
