import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
import Permission from '#models/permission'
import { roleData, rolePermissionMap } from './role_permission_data.js'

export default class RoleSeeder extends BaseSeeder {
  async run() {
    for (const data of roleData) {
      const role = await Role.updateOrCreate(
        { name: data.name, businessId: null },
        {
          description: data.description,
          isSystem: data.isSystem,
          hasFullAccess: data.hasFullAccess,
        }
      )

      const permissionNames = rolePermissionMap[data.key] ?? []
      if (permissionNames.length > 0) {
        const permissions = await Permission.query().whereIn('name', permissionNames)
        await role.related('permissions').sync(permissions.map((p) => p.id))
      }
    }
  }
}
