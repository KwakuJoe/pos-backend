import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo((this.schema as any).client.raw('gen_random_uuid()'))
      table
        .uuid('business_id')
        .notNullable()
        .references('id')
        .inTable('businesses')
        .onDelete('CASCADE')
      table.uuid('role_id').notNullable().references('id').inTable('roles')
      table.string('full_name').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('phone').nullable()
      table.string('password').notNullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.boolean('must_change_password').notNullable().defaultTo(true)
      table.timestamp('last_login_at').nullable()
      table.jsonb('permissions_override').nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
