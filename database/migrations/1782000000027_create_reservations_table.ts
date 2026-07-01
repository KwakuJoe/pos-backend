import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reservations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo((this.schema as any).client.raw('gen_random_uuid()'))
      table.uuid('business_id').notNullable().references('id').inTable('businesses').onDelete('CASCADE')
      table.uuid('location_id').nullable().references('id').inTable('locations').onDelete('SET NULL')
      table.uuid('table_id').nullable().references('id').inTable('tables').onDelete('SET NULL')
      table.uuid('customer_id').nullable().references('id').inTable('customers').onDelete('SET NULL')
      table.uuid('created_by').notNullable().references('id').inTable('users')

      table.integer('party_size').notNullable()
      table.timestamp('reserved_for').notNullable()

      table.string('reserved_by_name').notNullable()
      table.string('reserved_by_phone').notNullable()
      table.text('notes').nullable()

      table
        .enum('status', ['pending', 'confirmed', 'seated', 'cancelled', 'no_show'])
        .notNullable()
        .defaultTo('pending')

      table.timestamp('confirmed_at').nullable()
      table.timestamp('seated_at').nullable()
      table.timestamp('cancelled_at').nullable()
      table.string('cancellation_reason').nullable()

      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
