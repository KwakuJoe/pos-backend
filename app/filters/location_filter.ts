import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Location from '#models/location'
import BaseFilter from './base_filter.js'

type LocationQuery = ModelQueryBuilderContract<typeof Location>

export default class LocationFilter extends BaseFilter<typeof Location> {
  constructor(query: LocationQuery, params: Record<string, any>) {
    super(query, params)
  }

  apply(): LocationQuery {
    this.search()
    this.byIsActive()
    this.byIsMain()
    this.byOrderBy({
      name: 'name',
      city: 'city',
      createdAt: 'created_at',
    })
    return this.query as LocationQuery
  }

  private search(): void {
    const search = this.get('search')
    if (!search) return
    this.query = this.query.where((q) => {
      q.whereILike('name', `%${search}%`)
        .orWhereILike('address', `%${search}%`)
        .orWhereILike('city', `%${search}%`)
    }) as any
  }

  private byIsActive(): void {
    const isActive = this.get('isActive')
    if (isActive === undefined || isActive === null) return
    this.query = this.query.where('is_active', isActive) as any
  }

  private byIsMain(): void {
    const isMain = this.get('isMain')
    if (isMain === undefined || isMain === null) return
    this.query = this.query.where('is_main', isMain) as any
  }
}
