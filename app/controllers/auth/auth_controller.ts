import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { loginValidator, changePasswordValidator } from '#validators/auth_validator'

export default class AuthController {
  async login({ request, response, serialize }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    if (!user.isActive) {
      return response.unauthorized({ message: 'Account is deactivated. Contact your administrator.' })
    }

    await user.merge({ lastLoginAt: DateTime.now() }).save()

    const token = await User.accessTokens.create(user, ['*'], { expiresIn: '30 days' })

    await user.load((loader) => {
      loader.load('business')
      loader.load('role', (q) => q.preload('permissions'))
      loader.load('locations')
    })

    const transformed = await serialize(UserTransformer.transform(user))

    return response.ok({
      data: {
        user: transformed.data,
        token: token.value!.release(),
        mustChangePassword: user.mustChangePassword,
      },
    })
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }
    return response.ok({ message: 'Logged out successfully' })
  }

  async changePassword({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const { newPassword } = await request.validateUsing(changePasswordValidator)

    user.password = newPassword
    user.mustChangePassword = false
    await user.save()

    return response.ok({ message: 'Password updated successfully' })
  }

  async me({ auth, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    await user.load((loader) => {
      loader.load('business')
      loader.load('role', (q) => q.preload('permissions'))
      loader.load('locations')
    })

    const transformed = await serialize(UserTransformer.transform(user))
    return response.ok({ data: transformed.data })
  }
}
