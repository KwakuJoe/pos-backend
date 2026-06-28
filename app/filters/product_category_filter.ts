import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import ProductCategory from '#models/product_category'
import BaseFilter from './base_filter.js'

type CategoryQuery = ModelQueryBuilderContract<typeof ProductCategory>

export default class ProductCategoryFilter extends BaseFilter<typeof ProductCategory> {
  constructor(query: CategoryQuery, params: Record<string, any>) {
    super(query, params)
  }

  apply(): CategoryQuery {
    this.search()
    this.byIsActive()
    this.byOrderBy({ name: 'name', createdAt: 'created_at' })
    return this.query as CategoryQuery
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
}
