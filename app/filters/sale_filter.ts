import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Sale from '#models/sale'
import BaseFilter from './base_filter.js'

type SaleQuery = ModelQueryBuilderContract<typeof Sale>

export default class SaleFilter extends BaseFilter<typeof Sale> {
  constructor(query: SaleQuery, params: Record<string, any>) {
    super(query, params)
  }

  apply(): SaleQuery {
    this.search()
    this.byStatus()
    this.bySaleType()
    this.byCustomerId()
    this.byTableId()
    this.byLocationId()
    this.byDateRange('created_at')
    this.byOrderBy({
      createdAt: 'created_at',
      totalAmount: 'total_amount',
      saleNumber: 'sale_number_int',
    }, 'created_at', 'desc')
    return this.query as SaleQuery
  }

  private search(): void {
    const search = this.get('search')
    if (!search) return
    this.query = this.query.whereILike('sale_number', `%${search}%`) as any
  }

  private byStatus(): void {
    const status = this.get('status')
    if (!status) return
    this.query = this.query.where('status', status) as any
  }

  private bySaleType(): void {
    const type = this.get('type')
    if (!type) return
    this.query = this.query.where('type', type) as any
  }

  private byCustomerId(): void {
    const customerId = this.get('customerId')
    if (!customerId) return
    this.query = this.query.where('customer_id', customerId) as any
  }

  private byTableId(): void {
    const tableId = this.get('tableId')
    if (!tableId) return
    this.query = this.query.where('table_id', tableId) as any
  }

  private byLocationId(): void {
    const locationId = this.get('locationId')
    if (!locationId) return
    this.query = this.query.where('location_id', locationId) as any
  }
}
