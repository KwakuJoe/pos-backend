import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import db from '@adonisjs/lucid/services/db'

export default class LocationAccessMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const user = ctx.auth.getUserOrFail()
    const locationId = ctx.params.locationId as string | undefined

    if (!locationId) return next()

    // Load role to check hasFullAccess
    const role = await user.related('role').query().firstOrFail()

    if (role.hasFullAccess) return next()

    const row = await db
      .from('user_locations')
      .where('user_id', user.id)
      .where('location_id', locationId)
      .first()

    if (!row) {
      return ctx.response.forbidden({ message: 'You do not have access to this location.' })
    }

    return next()
  }
}
