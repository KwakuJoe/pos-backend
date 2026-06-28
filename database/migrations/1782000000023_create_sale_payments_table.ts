import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sale_payments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo((this.schema as any).client.raw('gen_random_uuid()'))

      table.uuid('sale_id').notNullable().references('id').inTable('sales').onDelete('CASCADE')
      table.uuid('recorded_by').notNullable().references('id').inTable('users').onDelete('RESTRICT')

      table.decimal('amount', 12, 2).notNullable()
      // cash | card | mobile_money | credit | bank_transfer | other
      table.string('method').notNullable()
      table.decimal('cash_tendered', 12, 2).nullable()    // for cash payments
      table.string('reference').nullable()                  // card/momo transaction ref
      table.text('notes').nullable()

      table.timestamp('created_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
