import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import User from '#models/user'
import BaseFilter from './base_filter.js'

type UserQuery = ModelQueryBuilderContract<typeof User>

export default class UserFilter extends BaseFilter<typeof User> {
  constructor(query: UserQuery, params: Record<string, any>) {
    super(query, params)
  }

  apply(): UserQuery {
    this.search()
    this.byRoleId()
    this.byIsActive()
    this.byOrderBy({
      fullName: 'full_name',
      email: 'email',
      createdAt: 'created_at',
    })
    return this.query as UserQuery
  }

  private search(): void {
    const search = this.get('search')
    if (!search) return
    this.query = this.query.where((q) => {
      q.whereILike('full_name', `%${search}%`)
        .orWhereILike('email', `%${search}%`)
        .orWhereILike('phone', `%${search}%`)
    }) as any
  }

  private byRoleId(): void {
    const roleId = this.get('roleId')
    if (!roleId) return
    this.query = this.query.where('role_id', roleId) as any
  }

  private byIsActive(): void {
    const isActive = this.get('isActive')
    if (isActive === undefined || isActive === null) return
    this.query = this.query.where('is_active', isActive) as any
  }
}
