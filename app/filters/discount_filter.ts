import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import { DateTime } from 'luxon'
import Discount from '#models/discount'
import BaseFilter from './base_filter.js'

type DiscountQuery = ModelQueryBuilderContract<typeof Discount>

export default class DiscountFilter extends BaseFilter<typeof Discount> {
  constructor(query: DiscountQuery, params: Record<string, any>) {
    super(query, params)
  }

  apply(): DiscountQuery {
    this.search()
    this.byType()
    this.byIsActive()
    this.byIsUsable()
    this.byOrderBy({ name: 'name', value: 'value', usesCount: 'uses_count', createdAt: 'created_at' })
    return this.query as DiscountQuery
  }

  private search(): void {
    const search = this.get('search')
    if (!search) return
    this.query = this.query.where((q) => {
      q.whereILike('name', `%${search}%`).orWhereILike('code', `%${search}%`)
    }) as any
  }

  private byType(): void {
    const type = this.get('type')
    if (!type) return
    this.query = this.query.where('type', type) as any
  }

  private byIsActive(): void {
    const isActive = this.get('isActive')
    if (isActive === undefined || isActive === null) return
    this.query = this.query.where('is_active', isActive) as any
  }

  private byIsUsable(): void {
    const isUsable = this.get('isUsable')
    if (isUsable === undefined || isUsable === null) return
    const now = DateTime.now().toSQL()!
    if (isUsable) {
      this.query = this.query
        .where('is_active', true)
        .where((q) => q.whereNull('ends_at').orWhere('ends_at', '>', now))
        .where((q) => q.whereNull('starts_at').orWhere('starts_at', '<=', now))
        .where((q) => q.whereNull('max_uses').orWhereRaw('uses_count < max_uses')) as any
    } else {
      this.query = this.query.where((q) => {
        q.where('is_active', false)
          .orWhere('ends_at', '<=', now)
          .orWhereRaw('(max_uses IS NOT NULL AND uses_count >= max_uses)')
      }) as any
    }
  }
}
