import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tables'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo((this.schema as any).client.raw('gen_random_uuid()'))

      table.uuid('business_id').notNullable().references('id').inTable('businesses').onDelete('CASCADE')
      table.uuid('location_id').nullable().references('id').inTable('locations').onDelete('SET NULL')

      table.string('name').notNullable()
      table.integer('capacity').notNullable().defaultTo(2)

      // available | occupied | reserved | bill_requested
      table.string('status').notNullable().defaultTo('available')

      table.boolean('is_active').notNullable().defaultTo(true)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
