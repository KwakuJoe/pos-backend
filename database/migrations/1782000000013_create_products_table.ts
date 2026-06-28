import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo((this.schema as any).client.raw('gen_random_uuid()'))

      table.uuid('business_id').notNullable().references('id').inTable('businesses').onDelete('CASCADE')
      table.uuid('category_id').nullable().references('id').inTable('product_categories').onDelete('SET NULL')
      table.uuid('tax_id').nullable().references('id').inTable('taxes').onDelete('SET NULL')

      table.string('name').notNullable()
      table.text('description').nullable()
      table.string('image_url').nullable()

      // physical | service | composite
      table.string('type').notNullable().defaultTo('physical')

      table.string('sku').nullable()
      table.string('barcode').nullable()

      table.decimal('price', 12, 2).notNullable()
      table.decimal('cost_price', 12, 2).nullable()

      // fixed | per_kg | per_hour
      table.string('pricing_model').notNullable().defaultTo('fixed')

      // piece | kg | g | litre | ml | hour | pack | dozen | other
      table.string('unit').notNullable().defaultTo('piece')

      table.boolean('is_active').notNullable().defaultTo(true)

      table.jsonb('metadata').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
