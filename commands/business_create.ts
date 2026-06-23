import { BaseCommand } from '@adonisjs/core/ace'
import { randomBytes, randomUUID } from 'node:crypto'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'

export default class BusinessCreate extends BaseCommand {
  static commandName = 'business:create'
  static description = 'One-time setup: configure the business, main location, and owner account'
  static options = { startApp: true }

  async run() {
    // ── Prompts ──────────────────────────────────────────────────────
    const businessName = await this.prompt.ask('Business name', { validate: (v) => !!v.trim() || 'Required' })
    const businessEmail = await this.prompt.ask('Business email', { validate: (v) => /\S+@\S+\.\S+/.test(v) || 'Invalid email' })
    const businessPhone = await this.prompt.ask('Business phone (optional)', { default: '' })
    const businessAddress = await this.prompt.ask('Business address (optional)', { default: '' })
    const businessCity = await this.prompt.ask('City (optional)', { default: '' })
    const currency = await this.prompt.ask('Currency code', { default: 'GHS' })
    const businessType = await this.prompt.ask('Business type (optional, e.g. retail)', { default: '' })

    const locationName = await this.prompt.ask('Main location name', { default: 'Main Branch' })
    const locationAddress = await this.prompt.ask('Location address (optional)', { default: businessAddress })

    const ownerName = await this.prompt.ask('Owner full name', { validate: (v) => !!v.trim() || 'Required' })
    const ownerEmail = await this.prompt.ask('Owner email', { validate: (v) => /\S+@\S+\.\S+/.test(v) || 'Invalid email' })

    // ── Enforce single-business constraint ───────────────────────────
    const businessCount = await db.from('businesses').count('* as total').first()
    if (Number(businessCount?.total) > 0) {
      this.logger.error('A business is already configured on this installation.')
      this.logger.error('This system supports one business per deployment.')
      this.exitCode = 1
      return
    }

    // ── Validate owner email uniqueness ──────────────────────────────
    const existing = await db.from('users').where('email', ownerEmail).first()
    if (existing) {
      this.logger.error(`A user with email "${ownerEmail}" already exists.`)
      this.exitCode = 1
      return
    }

    // ── Generate slug ────────────────────────────────────────────────
    const baseSlug = businessName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    let slug = baseSlug
    let suffix = 1
    while (await db.from('businesses').where('slug', slug).first()) {
      suffix++
      slug = `${baseSlug}-${suffix}`
    }

    // ── Generate random password ─────────────────────────────────────
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lower = 'abcdefghijklmnopqrstuvwxyz'
    const digits = '0123456789'
    const symbols = '!@#$%^&*'
    const all = upper + lower + digits + symbols
    const bytes = randomBytes(12)
    let plainPassword = ''
    for (let i = 0; i < 12; i++) {
      plainPassword += all[bytes[i] % all.length]
    }

    // ── Database transaction ─────────────────────────────────────────
    const trx = await db.transaction()
    try {
      const businessId = randomUUID()
      await trx.table('businesses').insert({
        id: businessId,
        name: businessName,
        slug,
        email: businessEmail,
        phone: businessPhone || null,
        address: businessAddress || null,
        city: businessCity || null,
        country: 'Ghana',
        currency,
        timezone: 'Africa/Accra',
        business_type: businessType || null,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      })

      const locationId = randomUUID()
      await trx.table('locations').insert({
        id: locationId,
        business_id: businessId,
        name: locationName,
        address: locationAddress || businessAddress || null,
        city: businessCity || null,
        phone: businessPhone || null,
        is_main: true,
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      })

      const ownerRole = await trx.from('roles').where('name', 'Owner').whereNull('business_id').first()
      if (!ownerRole) {
        throw new Error('Owner role not found. Run seeders first: node ace db:seed -f database/seeders/role_seeder.ts')
      }

      const hashedPassword = await hash.make(plainPassword)
      const userId = randomUUID()
      await trx.table('users').insert({
        id: userId,
        business_id: businessId,
        role_id: ownerRole.id,
        full_name: ownerName,
        email: ownerEmail,
        password: hashedPassword,
        is_active: true,
        must_change_password: true,
        created_at: new Date(),
        updated_at: new Date(),
      })

      await trx.table('user_locations').insert({
        id: randomUUID(),
        user_id: userId,
        location_id: locationId,
        created_at: new Date(),
      })

      await trx.commit()

      // ── Print one-time summary ───────────────────────────────────
      this.logger.success('Business created successfully\n')
      this.logger.log(`Business:   ${businessName} (${slug})`)
      this.logger.log(`Location:   ${locationName}`)
      this.logger.log(`Owner:      ${ownerName} <${ownerEmail}>`)
      this.logger.log(`Password:   ${plainPassword}   (one-time display — relay securely to the client)`)
      this.logger.log('')
      this.logger.log('The owner will be required to set a new password on first login.')
    } catch (error) {
      await trx.rollback()
      this.logger.error('Failed to create business. All changes rolled back.')
      this.logger.error((error as Error).message)
      this.exitCode = 1
    }
  }
}
