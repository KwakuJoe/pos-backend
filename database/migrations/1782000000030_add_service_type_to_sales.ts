import { BaseSchema } from '@adonisjs/lucid/schema'

// The sales.type column is a plain string (no DB-level CHECK constraint).
// Enum validation is enforced at the application layer via VineJS validators.
// Adding 'service' as a valid type required only validator + model changes, no DDL.
export default class extends BaseSchema {
  async up() {}
  async down() {}
}
