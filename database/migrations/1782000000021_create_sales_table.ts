import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo((this.schema as any).client.raw('gen_random_uuid()'))

      table.uuid('business_id').notNullable().references('id').inTable('businesses').onDelete('CASCADE')
      table.uuid('location_id').nullable().references('id').inTable('locations').onDelete('SET NULL')
      table.uuid('table_id').nullable().references('id').inTable('tables').onDelete('SET NULL')
      table.uuid('customer_id').nullable().references('id').inTable('customers').onDelete('SET NULL')
      table.uuid('created_by').notNullable().references('id').inTable('users').onDelete('RESTRICT')
      table.uuid('voided_by').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.uuid('discount_id').nullable().references('id').inTable('discounts').onDelete('SET NULL')

      table.string('sale_number').notNullable()
      table.integer('sale_number_int').notNullable().defaultTo(0)

      // pending | completed | voided | refunded
      table.string('status').notNullable().defaultTo('pending')

      table.decimal('subtotal', 12, 2).notNullable().defaultTo(0)
      table.decimal('discount_amount', 12, 2).notNullable().defaultTo(0)
      table.decimal('tax_amount', 12, 2).notNullable().defaultTo(0)
      table.decimal('total_amount', 12, 2).notNullable().defaultTo(0)
      table.decimal('amount_paid', 12, 2).notNullable().defaultTo(0)
      table.decimal('change_amount', 12, 2).notNullable().defaultTo(0)

      table.text('notes').nullable()
      table.jsonb('metadata').nullable()

      table.timestamp('completed_at').nullable()
      table.timestamp('voided_at').nullable()
      table.text('void_reason').nullable()

      table.unique(['business_id', 'sale_number'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
