import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Sale from '#models/sale'
import Product from '#models/product'

export default class SaleItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare saleId: string

  @column()
  declare productId: string

  @column()
  declare variantId: string | null

  @column()
  declare productName: string

  @column()
  declare variantName: string | null

  @column()
  declare unitPrice: number

  @column()
  declare quantity: number

  @column({
    prepare: (value: any) => (value !== null && value !== undefined ? JSON.stringify(value) : null),
    consume: (value: any) => (typeof value === 'string' ? JSON.parse(value) : value),
  })
  declare modifiers: Array<{ modifierId: string; modifierName: string; optionId: string; optionName: string; price: number }> | null

  @column()
  declare modifierCost: number

  @column()
  declare taxRate: number | null

  @column()
  declare isInclusive: boolean

  @column()
  declare taxAmount: number

  @column()
  declare subtotal: number

  @column()
  declare total: number

  @column()
  declare assignedStaffId: string | null

  @column()
  declare kitchenStatus: 'pending' | 'in_progress' | 'ready' | 'bumped'

  @column()
  declare notes: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Sale)
  declare sale: BelongsTo<typeof Sale>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}
