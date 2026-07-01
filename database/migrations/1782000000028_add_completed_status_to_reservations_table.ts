import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reservations'

  async up() {
    await this.db.rawQuery(`
      ALTER TABLE reservations
        DROP CONSTRAINT reservations_status_check,
        ADD CONSTRAINT reservations_status_check
          CHECK (status IN ('pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no_show'))
    `)
  }

  async down() {
    await this.db.rawQuery(`
      ALTER TABLE reservations
        DROP CONSTRAINT reservations_status_check,
        ADD CONSTRAINT reservations_status_check
          CHECK (status IN ('pending', 'confirmed', 'seated', 'cancelled', 'no_show'))
    `)
  }
}
