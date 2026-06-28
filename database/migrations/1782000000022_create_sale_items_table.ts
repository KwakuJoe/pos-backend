import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sale_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo((this.schema as any).client.raw('gen_random_uuid()'))

      table.uuid('sale_id').notNullable().references('id').inTable('sales').onDelete('CASCADE')
      table.uuid('product_id').notNullable().references('id').inTable('products').onDelete('RESTRICT')
      table.uuid('variant_id').nullable().references('id').inTable('product_variants').onDelete('SET NULL')

      // Snapshots — price/name at time of sale (never change even if product is edited later)
      table.string('product_name').notNullable()
      table.string('variant_name').nullable()
      table.decimal('unit_price', 12, 2).notNullable()
      table.decimal('quantity', 10, 3).notNullable().defaultTo(1)

      // Modifier snapshot and cost
      table.jsonb('modifiers').nullable()
      table.decimal('modifier_cost', 12, 2).notNullable().defaultTo(0)

      // Tax snapshot
      table.decimal('tax_rate', 7, 4).nullable()
      table.boolean('is_inclusive').notNullable().defaultTo(false)
      table.decimal('tax_amount', 12, 2).notNullable().defaultTo(0)

      // Totals
      table.decimal('subtotal', 12, 2).notNullable()  // unit_price * qty + modifier_cost
      table.decimal('total', 12, 2).notNullable()     // subtotal + exclusive_tax

      table.text('notes').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
