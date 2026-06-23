import { BaseTransformer } from '@adonisjs/core/transformers'
import type Role from '#models/role'

export default class RoleTransformer extends BaseTransformer<Role> {
  toObject() {
    return {
      id: this.resource.id,
      name: this.resource.name,
      description: this.resource.description,
      isSystem: this.resource.isSystem,
      hasFullAccess: this.resource.hasFullAccess,
      permissions: this.resource.permissions?.map((p) => ({
        id: p.id,
        name: p.name,
        module: p.module,
      })) ?? [],
    }
  }
}
