import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('sales', (table) => {
      // dine_in | takeaway | delivery
      table.string('type').notNullable().defaultTo('takeaway').after('status')
    })
  }

  async down() {
    this.schema.alterTable('sales', (table) => {
      table.dropColumn('type')
    })
  }
}
