import { BaseSeeder } from '@adonisjs/lucid/seeders'
import PermissionSeeder from './permission_seeder.js'
import RoleSeeder from './role_seeder.js'

export default class MainSeeder extends BaseSeeder {
  async run() {
    await new PermissionSeeder(this.client).run()
    await new RoleSeeder(this.client).run()
  }
}
