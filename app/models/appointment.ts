import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Business from '#models/business'
import Location from '#models/location'
import User from '#models/user'
import Product from '#models/product'
import Customer from '#models/customer'
import Sale from '#models/sale'

export default class Appointment extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare businessId: string

  @column()
  declare locationId: string | null

  @column()
  declare staffId: string | null

  @column()
  declare serviceId: string | null

  @column()
  declare customerId: string | null

  @column()
  declare saleId: string | null

  @column()
  declare createdBy: string

  @column()
  declare type: 'appointment' | 'walk_in'

  @column()
  declare status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'

  @column()
  declare customerName: string

  @column()
  declare customerPhone: string

  @column()
  declare notes: string | null

  @column.dateTime()
  declare scheduledFor: DateTime

  @column()
  declare durationMinutes: number | null

  @column.dateTime()
  declare confirmedAt: DateTime | null

  @column.dateTime()
  declare startedAt: DateTime | null

  @column.dateTime()
  declare completedAt: DateTime | null

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

  @belongsTo(() => User, { foreignKey: 'staffId' })
  declare staff: BelongsTo<typeof User>

  @belongsTo(() => Product, { foreignKey: 'serviceId' })
  declare service: BelongsTo<typeof Product>

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => Sale)
  declare sale: BelongsTo<typeof Sale>

  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare createdByUser: BelongsTo<typeof User>
}
