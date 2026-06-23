import type { LucidModel } from '@adonisjs/lucid/types/model'
import type { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

export default abstract class BaseFilter<T extends LucidModel> {
  protected query: ModelQueryBuilderContract<T>
  protected params: Record<string, any>

  constructor(query: ModelQueryBuilderContract<T>, params: Record<string, any>) {
    this.query = query
    this.params = params
  }

  abstract apply(): ModelQueryBuilderContract<T>

  protected get(key: string): any {
    return this.params[key]
  }

  protected getArray(key: string): string[] | undefined {
    const val = this.params[key]
    if (val === undefined || val === null || val === '') return undefined
    return Array.isArray(val) ? val : [String(val)]
  }

  protected byOrderBy(fieldMap: Record<string, string>): void {
    const sortBy = this.get('sortBy')
    const sortOrder: 'asc' | 'desc' = this.get('sortOrder') === 'desc' ? 'desc' : 'asc'
    if (!sortBy || !fieldMap[sortBy]) return
    this.query = this.query.orderBy(fieldMap[sortBy], sortOrder) as any
  }

  protected byDateRange(column: string, fromKey: string, toKey: string): void {
    const from = this.get(fromKey)
    const to = this.get(toKey)
    if (from) this.query = this.query.where(column, '>=', from) as any
    if (to) this.query = this.query.where(column, '<=', to) as any
  }
}
