import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class MustChangePasswordMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.getUserOrFail()

    if (!user.isActive) {
      return ctx.response.forbidden({
        message: 'Account is deactivated. Contact your administrator.',
      })
    }

    if (user.mustChangePassword) {
      return ctx.response.forbidden({
        message: 'Password change required. Please set a new password before continuing.',
      })
    }

    return next()
  }
}
