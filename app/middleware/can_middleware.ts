import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { userCan } from '#services/permission_service'

export default class CanMiddleware {
  async handle(ctx: HttpContext, next: NextFn, [permission]: [string]) {
    const user = ctx.auth.getUserOrFail()

    const allowed = await userCan(user, permission)
    if (!allowed) {
      return ctx.response.forbidden({ message: `Permission denied: ${permission}` })
    }

    return next()
  }
}
