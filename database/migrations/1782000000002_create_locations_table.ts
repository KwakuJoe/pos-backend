import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'locations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo((this.schema as any).client.raw('gen_random_uuid()'))
      table
        .uuid('business_id')
        .notNullable()
        .references('id')
        .inTable('businesses')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('address').nullable()
      table.string('city').nullable()
      table.string('phone').nullable()
      table.boolean('is_main').notNullable().defaultTo(false)
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
