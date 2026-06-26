import { BaseTransformer } from '@adonisjs/core/transformers'
import type Customer from '#models/customer'

export default class CustomerTransformer extends BaseTransformer<Customer> {
  toObject() {
    return {
      id: this.resource.id,
      businessId: this.resource.businessId,
      fullName: this.resource.fullName,
      email: this.resource.email,
      phone: this.resource.phone,
      address: this.resource.address,
      dateOfBirth: this.resource.dateOfBirth,
      notes: this.resource.notes,
      creditLimit: this.resource.creditLimit,
      outstandingBalance: this.resource.outstandingBalance,
      isActive: this.resource.isActive,
      createdBy: this.resource.createdBy,
      createdAt: this.resource.createdAt,
      updatedAt: this.resource.updatedAt,
    }
  }
}
