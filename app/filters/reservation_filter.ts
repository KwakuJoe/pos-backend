import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Reservation from '#models/reservation'
import BaseFilter from './base_filter.js'

type ReservationQuery = ModelQueryBuilderContract<typeof Reservation>

export default class ReservationFilter extends BaseFilter<typeof Reservation> {
  constructor(query: ReservationQuery, params: Record<string, any>) {
    super(query, params)
  }

  apply(): ReservationQuery {
    this.bySearch()
    this.byStatus()
    this.byTable()
    this.byLocation()
    this.byDateRange('reserved_for', 'reservedFrom', 'reservedTo')
    this.byOrderBy(
      { reservedFor: 'reserved_for', partySize: 'party_size', createdAt: 'created_at' },
      'reserved_for',
      'asc'
    )
    return this.query as ReservationQuery
  }

  private bySearch(): void {
    const search = this.get('search')
    if (!search) return
    this.query = this.query.where((q) => {
      q.whereILike('reserved_by_name', `%${search}%`).orWhereILike(
        'reserved_by_phone',
        `%${search}%`
      )
    }) as any
  }

  private byStatus(): void {
    const status = this.get('status')
    if (!status) return
    this.query = this.query.where('status', status) as any
  }

  private byTable(): void {
    const tableId = this.get('tableId')
    if (!tableId) return
    this.query = this.query.where('table_id', tableId) as any
  }

  private byLocation(): void {
    const locationId = this.get('locationId')
    if (!locationId) return
    this.query = this.query.where('location_id', locationId) as any
  }
}
