import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('businesses', (table) => {
      table.integer('sales_counter').notNullable().defaultTo(0)
    })
  }

  async down() {
    this.schema.alterTable('businesses', (table) => {
      table.dropColumn('sales_counter')
    })
  }
}
