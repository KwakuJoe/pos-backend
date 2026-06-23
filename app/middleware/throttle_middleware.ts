import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import limiter from '@adonisjs/limiter/services/main'

export default class ThrottleMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    await limiter
      .allowRequests(10)
      .every('1 min')
      .usingKey(ctx.request.ip()!)
      .throttle('login', ctx)

    return next()
  }
}
