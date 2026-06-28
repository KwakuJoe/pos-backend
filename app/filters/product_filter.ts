import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Product from '#models/product'
import BaseFilter from './base_filter.js'

type ProductQuery = ModelQueryBuilderContract<typeof Product>

export default class ProductFilter extends BaseFilter<typeof Product> {
  constructor(query: ProductQuery, params: Record<string, any>) {
    super(query, params)
  }

  apply(): ProductQuery {
    this.search()
    this.byCategoryId()
    this.byTaxId()
    this.byType()
    this.byPricingModel()
    this.byIsActive()
    this.byPriceRange()
    this.byDateRange('created_at', 'createdFrom', 'createdTo')
    this.byOrderBy({ name: 'name', price: 'price', createdAt: 'created_at' })
    return this.query as ProductQuery
  }

  private search(): void {
    const search = this.get('search')
    if (!search) return
    this.query = this.query.where((q) => {
      q.whereILike('name', `%${search}%`)
        .orWhereILike('sku', `%${search}%`)
        .orWhereILike('barcode', `%${search}%`)
        .orWhereILike('description', `%${search}%`)
    }) as any
  }

  private byCategoryId(): void {
    const categoryId = this.get('categoryId')
    if (!categoryId) return
    this.query = this.query.where('category_id', categoryId) as any
  }

  private byTaxId(): void {
    const taxId = this.get('taxId')
    if (!taxId) return
    this.query = this.query.where('tax_id', taxId) as any
  }

  private byType(): void {
    const type = this.get('type')
    if (!type) return
    this.query = this.query.where('type', type) as any
  }

  private byPricingModel(): void {
    const pricingModel = this.get('pricingModel')
    if (!pricingModel) return
    this.query = this.query.where('pricing_model', pricingModel) as any
  }

  private byIsActive(): void {
    const isActive = this.get('isActive')
    if (isActive === undefined || isActive === null) return
    this.query = this.query.where('is_active', isActive) as any
  }

  private byPriceRange(): void {
    const priceFrom = this.get('priceFrom')
    const priceTo = this.get('priceTo')
    if (priceFrom !== undefined && priceFrom !== null) {
      this.query = this.query.where('price', '>=', priceFrom) as any
    }
    if (priceTo !== undefined && priceTo !== null) {
      this.query = this.query.where('price', '<=', priceTo) as any
    }
  }
}
