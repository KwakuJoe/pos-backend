import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Table from '#models/table'
import BaseFilter from './base_filter.js'

type TableQuery = ModelQueryBuilderContract<typeof Table>

export default class TableFilter extends BaseFilter<typeof Table> {
  constructor(query: TableQuery, params: Record<string, any>) {
    super(query, params)
  }

  apply(): TableQuery {
    this.search()
    this.byLocationId()
    this.byStatus()
    this.byIsActive()
    this.byOrderBy({ name: 'name', capacity: 'capacity', status: 'status', createdAt: 'created_at' })
    return this.query as TableQuery
  }

  private search(): void {
    const search = this.get('search')
    if (!search) return
    this.query = this.query.whereILike('name', `%${search}%`) as any
  }

  private byLocationId(): void {
    const locationId = this.get('locationId')
    if (!locationId) return
    this.query = this.query.where('location_id', locationId) as any
  }

  private byStatus(): void {
    const status = this.get('status')
    if (!status) return
    this.query = this.query.where('status', status) as any
  }

  private byIsActive(): void {
    const isActive = this.get('isActive')
    if (isActive === undefined || isActive === null) return
    this.query = this.query.where('is_active', isActive) as any
  }
}
