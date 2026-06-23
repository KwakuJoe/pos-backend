import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Permission from '#models/permission'
import { permissionData } from './role_permission_data.js'

export default class PermissionSeeder extends BaseSeeder {
  async run() {
    for (const perm of permissionData) {
      await Permission.updateOrCreate({ name: perm.name }, perm)
    }
  }
}
