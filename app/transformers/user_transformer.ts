import { BaseTransformer } from '@adonisjs/core/transformers'
import type User from '#models/user'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    return {
      id: this.resource.id,
      businessId: this.resource.businessId,
      fullName: this.resource.fullName,
      email: this.resource.email,
      phone: this.resource.phone,
      isActive: this.resource.isActive,
      mustChangePassword: this.resource.mustChangePassword,
      lastLoginAt: this.resource.lastLoginAt,
      createdAt: this.resource.createdAt,
      role: this.resource.role
        ? {
            id: this.resource.role.id,
            name: this.resource.role.name,
            hasFullAccess: this.resource.role.hasFullAccess,
          }
        : null,
      permissions: this.resource.role?.permissions?.map((p) => p.name) ?? [],
      locations:
        this.resource.locations?.map((l) => ({
          id: l.id,
          name: l.name,
        })) ?? [],
    }
  }
}
