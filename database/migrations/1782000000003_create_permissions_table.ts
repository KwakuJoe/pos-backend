import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'permissions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo((this.schema as any).client.raw('gen_random_uuid()'))
      table.string('name').notNullable().unique()
      table.string('module').notNullable()
      table.string('description').nullable()
      table.timestamp('created_at').notNullable().defaultTo((this.schema as any).client.raw('now()'))
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
