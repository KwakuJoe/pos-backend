import { BaseTransformer } from '@adonisjs/core/transformers'
import type Location from '#models/location'

export default class LocationTransformer extends BaseTransformer<Location> {
  toObject() {
    return {
      id: this.resource.id,
      businessId: this.resource.businessId,
      name: this.resource.name,
      address: this.resource.address,
      city: this.resource.city,
      phone: this.resource.phone,
      isMain: this.resource.isMain,
      isActive: this.resource.isActive,
    }
  }
}
