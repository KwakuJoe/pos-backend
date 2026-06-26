import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'
import Customer from '#models/customer'
import BaseFilter from './base_filter.js'

type CustomerQuery = ModelQueryBuilderContract<typeof Customer>

export default class CustomerFilter extends BaseFilter<typeof Customer> {
  constructor(query: CustomerQuery, params: Record<string, any>) {
    super(query, params)
  }

  apply(): CustomerQuery {
    this.search()
    this.byIsActive()
    this.byHasCredit()
    this.byDateRange('created_at', 'createdFrom', 'createdTo')
    this.byOrderBy({
      fullName: 'full_name',
      email: 'email',
      outstandingBalance: 'outstanding_balance',
      createdAt: 'created_at',
    })
    return this.query as CustomerQuery
  }

  private search(): void {
    const search = this.get('search')
    if (!search) return
    this.query = this.query.where((q) => {
      q.whereILike('full_name', `%${search}%`)
        .orWhereILike('email', `%${search}%`)
        .orWhereILike('phone', `%${search}%`)
    }) as any
  }

  private byIsActive(): void {
    const isActive = this.get('isActive')
    if (isActive === undefined || isActive === null) return
    this.query = this.query.where('is_active', isActive) as any
  }

  private byHasCredit(): void {
    const hasCredit = this.get('hasCredit')
    if (hasCredit === undefined || hasCredit === null) return
    if (hasCredit) {
      this.query = this.query.where('outstanding_balance', '>', 0) as any
    } else {
      this.query = this.query.where('outstanding_balance', '<=', 0) as any
    }
  }
}
