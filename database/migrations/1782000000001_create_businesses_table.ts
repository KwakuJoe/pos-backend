import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'businesses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo((this.schema as any).client.raw('gen_random_uuid()'))
      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('phone').nullable()
      table.string('address').nullable()
      table.string('city').nullable()
      table.string('country').notNullable().defaultTo('Ghana')
      table.string('logo_url').nullable()
      table.string('currency').notNullable().defaultTo('GHS')
      table.string('timezone').notNullable().defaultTo('Africa/Accra')
      table.string('business_type').nullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
