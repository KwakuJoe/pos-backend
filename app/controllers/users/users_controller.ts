import type { HttpContext } from '@adonisjs/core/http'
import { randomBytes } from 'node:crypto'
import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { userFilterValidator, createUserValidator, updateUserValidator } from '#validators/user_validator'
import UserFilter from '#filters/user_filter'

function generatePassword(): string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const digits = '0123456789'
  const symbols = '!@#$%^&*'
  const all = upper + lower + digits + symbols
  const bytes = randomBytes(12)
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += all[bytes[i] % all.length]
  }
  return password
}

export default class UsersController {
  async index({ auth, request, response, serialize }: HttpContext) {
    const currentUser = auth.getUserOrFail()
    const payload = await request.validateUsing(userFilterValidator)
    const page = payload.page ?? 1
    const limit = payload.limit ?? 20

    let query = User.query()
      .where('business_id', currentUser.businessId)
      .preload('role', (q) => q.preload('permissions'))
      .preload('locations')

    query = new UserFilter(query, { ...payload }).apply()

    const users = await query.paginate(page, limit)
    const transformed = await serialize(UserTransformer.paginate(users.all(), users.getMeta()))

    return response.ok({
      message: 'Users fetched successfully',
      data: transformed.data,
      meta: transformed.metadata,
    })
  }

  async show({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const target = await User.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .preload('role', (q) => q.preload('permissions'))
      .preload('locations')
      .firstOrFail()

    const transformed = await serialize(UserTransformer.transform(target))
    return response.ok({ data: transformed.data })
  }

  async store({ auth, request, response, serialize }: HttpContext) {
    const currentUser = auth.getUserOrFail()
    const { fullName, email, phone, roleId, locationIds } = await request.validateUsing(createUserValidator)

    const plainPassword = generatePassword()

    const newUser = await User.create({
      businessId: currentUser.businessId,
      roleId,
      fullName,
      email,
      phone: phone ?? null,
      password: plainPassword,
      mustChangePassword: true,
    })

    if (locationIds && locationIds.length > 0) {
      await newUser.related('locations').attach(locationIds)
    }

    await newUser.load('role', (q) => q.preload('permissions'))
    await newUser.load('locations')

    const transformed = await serialize(UserTransformer.transform(newUser))

    return response.created({
      message: 'User created successfully',
      data: transformed.data,
      temporaryPassword: plainPassword,
    })
  }

  async update({ auth, params, request, response, serialize }: HttpContext) {
    const currentUser = auth.getUserOrFail()

    const target = await User.query()
      .where('id', params.id)
      .where('business_id', currentUser.businessId)
      .firstOrFail()

    const data = await request.validateUsing(updateUserValidator)
    const { locationIds, resetPassword, ...fields } = data

    target.merge(fields as any)

    let temporaryPassword: string | undefined
    if (resetPassword) {
      temporaryPassword = generatePassword()
      target.password = temporaryPassword
      target.mustChangePassword = true
    }

    await target.save()

    if (locationIds !== undefined) {
      await target.related('locations').sync(locationIds)
    }

    await target.load('role', (q) => q.preload('permissions'))
    await target.load('locations')

    const transformed = await serialize(UserTransformer.transform(target))

    const responseBody: Record<string, unknown> = {
      message: 'User updated successfully',
      data: transformed.data,
    }
    if (temporaryPassword) responseBody.temporaryPassword = temporaryPassword

    return response.ok(responseBody)
  }

  async destroy({ auth, params, response }: HttpContext) {
    const currentUser = auth.getUserOrFail()

    const target = await User.query()
      .where('id', params.id)
      .where('business_id', currentUser.businessId)
      .firstOrFail()

    target.isActive = false
    await target.save()

    return response.noContent()
  }
}
