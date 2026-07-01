import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Appointment from '#models/appointment'
import BaseFilter from './base_filter.js'

type AppointmentQuery = ModelQueryBuilderContract<typeof Appointment>

export default class AppointmentFilter extends BaseFilter<typeof Appointment> {
  constructor(query: AppointmentQuery, params: Record<string, any>) {
    super(query, params)
  }

  apply(): AppointmentQuery {
    this.bySearch()
    this.byStatus()
    this.byType()
    this.byStaff()
    this.byService()
    this.bySale()
    this.byDateRange('scheduled_for', 'scheduledFrom', 'scheduledTo')
    this.byOrderBy({ scheduledFor: 'scheduled_for', createdAt: 'created_at' }, 'scheduled_for', 'asc')
    return this.query as AppointmentQuery
  }

  private bySearch(): void {
    const search = this.get('search')
    if (!search) return
    this.query = this.query.where((q) => {
      q.whereILike('customer_name', `%${search}%`).orWhereILike('customer_phone', `%${search}%`)
    }) as any
  }

  private byStatus(): void {
    const status = this.get('status')
    if (!status) return
    this.query = this.query.where('status', status) as any
  }

  private byType(): void {
    const type = this.get('type')
    if (!type) return
    this.query = this.query.where('type', type) as any
  }

  private byStaff(): void {
    const staffId = this.get('staffId')
    if (!staffId) return
    this.query = this.query.where('staff_id', staffId) as any
  }

  private byService(): void {
    const serviceId = this.get('serviceId')
    if (!serviceId) return
    this.query = this.query.where('service_id', serviceId) as any
  }

  private bySale(): void {
    const saleId = this.get('saleId')
    if (!saleId) return
    this.query = this.query.where('sale_id', saleId) as any
  }
}
