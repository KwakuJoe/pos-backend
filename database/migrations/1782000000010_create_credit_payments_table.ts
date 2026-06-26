import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'credit_payments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo((this.schema as any).client.raw('gen_random_uuid()'))

      table.uuid('business_id').notNullable().references('id').inTable('businesses').onDelete('CASCADE')
      table.uuid('customer_id').notNullable().references('id').inTable('customers').onDelete('CASCADE')
      table.uuid('recorded_by').notNullable().references('id').inTable('users').onDelete('RESTRICT')

      table.decimal('amount', 12, 2).notNullable()
      table.string('payment_method').notNullable() // cash, mobile_money, card, bank_transfer
      table.text('notes').nullable()

      table.timestamp('created_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
