import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'customers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .uuid('id')
        .primary()
        .defaultTo((this.schema as any).client.raw('gen_random_uuid()'))

      table.uuid('business_id').notNullable().references('id').inTable('businesses').onDelete('CASCADE')
      table.uuid('created_by').notNullable().references('id').inTable('users').onDelete('RESTRICT')

      table.string('full_name').notNullable()
      table.string('email').nullable()
      table.string('phone').nullable()
      table.string('address').nullable()
      table.date('date_of_birth').nullable()
      table.text('notes').nullable()

      table.decimal('credit_limit', 12, 2).notNullable().defaultTo(0)
      table.decimal('outstanding_balance', 12, 2).notNullable().defaultTo(0)

      table.boolean('is_active').notNullable().defaultTo(true)

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
