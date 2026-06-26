import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Customer from '#models/customer'
import User from '#models/user'

export default class CreditPayment extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare businessId: string

  @column()
  declare customerId: string

  @column()
  declare recordedBy: string

  @column()
  declare amount: number

  @column()
  declare paymentMethod: string

  @column()
  declare notes: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => User, { foreignKey: 'recordedBy' })
  declare recordedByUser: BelongsTo<typeof User>
}
