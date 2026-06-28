import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'discounts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo((this.schema as any).client.raw('gen_random_uuid()'))

      table.uuid('business_id').notNullable().references('id').inTable('businesses').onDelete('CASCADE')

      table.string('name').notNullable()
      table.string('code').nullable()

      // percentage | fixed
      table.string('type').notNullable().defaultTo('percentage')

      // percentage: 0–100 | fixed: amount in currency
      table.decimal('value', 10, 2).notNullable()

      table.decimal('min_order_amount', 12, 2).nullable()
      table.integer('max_uses').nullable()
      table.integer('uses_count').notNullable().defaultTo(0)

      table.timestamp('starts_at').nullable()
      table.timestamp('ends_at').nullable()

      table.boolean('is_active').notNullable().defaultTo(true)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
