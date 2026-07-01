import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sale_items'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .enum('kitchen_status', ['pending', 'in_progress', 'ready', 'bumped'])
        .notNullable()
        .defaultTo('pending')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('kitchen_status')
    })
  }
}
