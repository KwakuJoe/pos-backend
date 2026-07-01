import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'appointments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo((this.schema as any).client.raw('gen_random_uuid()'))
      table.uuid('business_id').notNullable().references('id').inTable('businesses').onDelete('CASCADE')
      table.uuid('location_id').nullable().references('id').inTable('locations').onDelete('SET NULL')
      table.uuid('staff_id').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.uuid('service_id').nullable().references('id').inTable('products').onDelete('SET NULL')
      table.uuid('customer_id').nullable().references('id').inTable('customers').onDelete('SET NULL')
      table.uuid('sale_id').nullable().references('id').inTable('sales').onDelete('SET NULL')
      table.uuid('created_by').notNullable().references('id').inTable('users')

      table.enum('type', ['appointment', 'walk_in']).notNullable().defaultTo('appointment')
      table
        .enum('status', ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'])
        .notNullable()
        .defaultTo('pending')

      table.string('customer_name').notNullable()
      table.string('customer_phone').notNullable()
      table.text('notes').nullable()

      table.timestamp('scheduled_for').notNullable()
      table.integer('duration_minutes').nullable()

      table.timestamp('confirmed_at').nullable()
      table.timestamp('started_at').nullable()
      table.timestamp('completed_at').nullable()
      table.timestamp('cancelled_at').nullable()
      table.string('cancellation_reason').nullable()

      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
