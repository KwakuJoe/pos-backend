import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'taxes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo((this.schema as any).client.raw('gen_random_uuid()'))

      table.uuid('business_id').notNullable().references('id').inTable('businesses').onDelete('CASCADE')

      table.string('name').notNullable()
      table.decimal('rate', 6, 4).notNullable()
      table.boolean('is_inclusive').notNullable().defaultTo(false)
      table.boolean('is_active').notNullable().defaultTo(true)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
