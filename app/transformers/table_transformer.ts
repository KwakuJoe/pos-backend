import { BaseTransformer } from '@adonisjs/core/transformers'
import type Table from '#models/table'

export default class TableTransformer extends BaseTransformer<Table> {
  toObject() {
    return {
      id: this.resource.id,
      businessId: this.resource.businessId,
      name: this.resource.name,
      capacity: this.resource.capacity,
      status: this.resource.status,
      isActive: this.resource.isActive,
      location: this.resource.location
        ? { id: this.resource.location.id, name: this.resource.location.name }
        : null,
      createdAt: this.resource.createdAt,
      updatedAt: this.resource.updatedAt,
    }
  }
}
