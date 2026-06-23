import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Permission from '#models/permission'
import BaseFilter from './base_filter.js'

type PermissionQuery = ModelQueryBuilderContract<typeof Permission>

export default class PermissionFilter extends BaseFilter<typeof Permission> {
  constructor(query: PermissionQuery, params: Record<string, any>) {
    super(query, params)
  }

  apply(): PermissionQuery {
    this.search()
    this.byModule()
    return this.query as PermissionQuery
  }

  private search(): void {
    const search = this.get('search')
    if (!search) return
    this.query = this.query.where((q) => {
      q.whereILike('name', `%${search}%`).orWhereILike('description', `%${search}%`)
    }) as any
  }

  private byModule(): void {
    const module = this.get('module')
    if (!module) return
    this.query = this.query.where('module', module) as any
  }
}
