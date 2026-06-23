import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_locations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo((this.schema as any).client.raw('gen_random_uuid()'))
      table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE')
      table
        .uuid('location_id')
        .notNullable()
        .references('id')
        .inTable('locations')
        .onDelete('CASCADE')
      table.timestamp('created_at').notNullable().defaultTo((this.schema as any).client.raw('now()'))

      table.unique(['user_id', 'location_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
