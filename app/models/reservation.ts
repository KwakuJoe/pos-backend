import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Business from '#models/business'
import Location from '#models/location'
import Table from '#models/table'
import Customer from '#models/customer'
import User from '#models/user'

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare businessId: string

  @column()
  declare locationId: string | null

  @column()
  declare tableId: string | null

  @column()
  declare customerId: string | null

  @column()
  declare createdBy: string

  @column()
  declare partySize: number

  @column.dateTime()
  declare reservedFor: DateTime

  @column()
  declare reservedByName: string

  @column()
  declare reservedByPhone: string

  @column()
  declare notes: string | null

  @column()
  declare status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled' | 'no_show'

  @column.dateTime()
  declare confirmedAt: DateTime | null

  @column.dateTime()
  declare seatedAt: DateTime | null

  @column.dateTime()
  declare cancelledAt: DateTime | null

  @column()
  declare cancellationReason: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Business)
  declare business: BelongsTo<typeof Business>

  @belongsTo(() => Location)
  declare location: BelongsTo<typeof Location>

  @belongsTo(() => Table)
  declare table: BelongsTo<typeof Table>

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare createdByUser: BelongsTo<typeof User>
}
