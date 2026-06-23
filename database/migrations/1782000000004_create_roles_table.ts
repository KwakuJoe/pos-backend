import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'roles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo((this.schema as any).client.raw('gen_random_uuid()'))
      table
        .uuid('business_id')
        .nullable()
        .references('id')
        .inTable('businesses')
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('description').nullable()
      table.boolean('is_system').notNullable().defaultTo(false)
      table.boolean('has_full_access').notNullable().defaultTo(false)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.unique(['business_id', 'name'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
