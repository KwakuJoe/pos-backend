import { BaseCommand } from '@adonisjs/core/ace'
import { randomBytes } from 'node:crypto'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'

export default class UserResetPassword extends BaseCommand {
  static commandName = 'user:reset-password'
  static description = 'Reset a user\'s password and force a change on next login'
  static options = { startApp: true }

  async run() {
    const email = await this.prompt.ask('User email', {
      validate: (v) => /\S+@\S+\.\S+/.test(v) || 'Invalid email',
    })

    const user = await db.from('users').where('email', email).first()
    if (!user) {
      this.logger.error(`No user found with email "${email}".`)
      this.exitCode = 1
      return
    }

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

    await db
      .from('users')
      .where('email', email)
      .update({
        password: await hash.make(plainPassword),
        must_change_password: true,
        updated_at: new Date(),
      })

    this.logger.success(`Password reset for ${user.full_name} <${email}>\n`)
    this.logger.log(`New password:   ${plainPassword}   (one-time — relay securely)`)
    this.logger.log('The user will be required to set a new password on next login.')
  }
}
