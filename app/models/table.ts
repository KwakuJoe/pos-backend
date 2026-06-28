import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Business from '#models/business'
import Location from '#models/location'

export default class Table extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare businessId: string

  @column()
  declare locationId: string | null

  @column()
  declare name: string

  @column()
  declare capacity: number

  @column()
  declare status: 'available' | 'occupied' | 'reserved' | 'bill_requested'

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Business)
  declare business: BelongsTo<typeof Business>

  @belongsTo(() => Location)
  declare location: BelongsTo<typeof Location>
}
