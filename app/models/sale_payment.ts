import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Sale from '#models/sale'
import User from '#models/user'

export default class SalePayment extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare saleId: string

  @column()
  declare recordedBy: string

  @column()
  declare amount: number

  @column()
  declare method: 'cash' | 'card' | 'mobile_money' | 'credit' | 'bank_transfer' | 'other'

  @column()
  declare cashTendered: number | null

  @column()
  declare reference: string | null

  @column()
  declare notes: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Sale)
  declare sale: BelongsTo<typeof Sale>

  @belongsTo(() => User, { foreignKey: 'recordedBy' })
  declare recordedByUser: BelongsTo<typeof User>
}
