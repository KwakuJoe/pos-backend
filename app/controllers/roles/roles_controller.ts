import type { HttpContext } from '@adonisjs/core/http'
import Role from '#models/role'
import RoleTransformer from '#transformers/role_transformer'
import { roleFilterValidator, createRoleValidator, updateRoleValidator } from '#validators/role_validator'
import RoleFilter from '#filters/role_filter'

export default class RolesController {
  async index({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(roleFilterValidator)
    const page = payload.page ?? 1
    const limit = payload.limit ?? 20

    let query = Role.query()
      .where((q) => {
        q.whereNull('business_id').orWhere('business_id', user.businessId)
      })
      .preload('permissions')

    query = new RoleFilter(query, { ...payload }).apply()

    const roles = await query.paginate(page, limit)
    const transformed = await serialize(RoleTransformer.paginate(roles.all(), roles.getMeta()))

    return response.ok({
      message: 'Roles fetched successfully',
      data: transformed.data,
      meta: transformed.metadata,
    })
  }

  async show({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const role = await Role.query()
      .where('id', params.id)
      .where((q) => {
        q.whereNull('business_id').orWhere('business_id', user.businessId)
      })
      .preload('permissions')
      .firstOrFail()

    const transformed = await serialize(RoleTransformer.transform(role))
    return response.ok({ data: transformed.data })
  }

  async store({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const { name, description, permissionIds } = await request.validateUsing(createRoleValidator)

    const role = await Role.create({
      businessId: user.businessId,
      name,
      description: description ?? null,
      isSystem: false,
      hasFullAccess: false,
    })

    if (permissionIds.length > 0) {
      await role.related('permissions').attach(permissionIds)
    }

    await role.load('permissions')

    const transformed = await serialize(RoleTransformer.transform(role))
    return response.created({
      message: 'Role created successfully',
      data: transformed.data,
    })
  }

  async update({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const role = await Role.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    if (role.isSystem) {
      return response.forbidden({ message: 'System roles cannot be modified.' })
    }

    const { name, description, permissionIds } = await request.validateUsing(updateRoleValidator)

    if (name !== undefined) role.name = name
    if (description !== undefined) role.description = description ?? null
    await role.save()

    if (permissionIds !== undefined) {
      await role.related('permissions').sync(permissionIds)
    }

    await role.load('permissions')

    const transformed = await serialize(RoleTransformer.transform(role))
    return response.ok({
      message: 'Role updated successfully',
      data: transformed.data,
    })
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()

    const role = await Role.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    if (role.isSystem) {
      return response.forbidden({ message: 'System roles cannot be deleted.' })
    }

    await role.delete()
    return response.noContent()
  }
}
