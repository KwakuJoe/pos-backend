import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Tax from '#models/tax'
import BaseFilter from './base_filter.js'

type TaxQuery = ModelQueryBuilderContract<typeof Tax>

export default class TaxFilter extends BaseFilter<typeof Tax> {
  constructor(query: TaxQuery, params: Record<string, any>) {
    super(query, params)
  }

  apply(): TaxQuery {
    this.search()
    this.byIsActive()
    this.byIsInclusive()
    this.byOrderBy({ name: 'name', rate: 'rate', createdAt: 'created_at' })
    return this.query as TaxQuery
  }

  private search(): void {
    const search = this.get('search')
    if (!search) return
    this.query = this.query.whereILike('name', `%${search}%`) as any
  }

  private byIsActive(): void {
    const isActive = this.get('isActive')
    if (isActive === undefined || isActive === null) return
    this.query = this.query.where('is_active', isActive) as any
  }

  private byIsInclusive(): void {
    const isInclusive = this.get('isInclusive')
    if (isInclusive === undefined || isInclusive === null) return
    this.query = this.query.where('is_inclusive', isInclusive) as any
  }
}
