import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Role from '#models/role'
import BaseFilter from './base_filter.js'

type RoleQuery = ModelQueryBuilderContract<typeof Role>

export default class RoleFilter extends BaseFilter<typeof Role> {
  constructor(query: RoleQuery, params: Record<string, any>) {
    super(query, params)
  }

  apply(): RoleQuery {
    this.search()
    this.byIsSystem()
    this.byOrderBy({
      name: 'name',
      createdAt: 'created_at',
    })
    return this.query as RoleQuery
  }

  private search(): void {
    const search = this.get('search')
    if (!search) return
    this.query = this.query.whereILike('name', `%${search}%`) as any
  }

  private byIsSystem(): void {
    const isSystem = this.get('isSystem')
    if (isSystem === undefined || isSystem === null) return
    this.query = this.query.where('is_system', isSystem) as any
  }
}
