import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Business from '#models/business'
import Location from '#models/location'
import Customer from '#models/customer'
import User from '#models/user'
import Discount from '#models/discount'
import Table from '#models/table'
import SaleItem from '#models/sale_item'
import SalePayment from '#models/sale_payment'
import Appointment from '#models/appointment'
import Reservation from '#models/reservation'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare businessId: string

  @column()
  declare locationId: string | null

  @column()
  declare tableId: string | null

  @column()
  declare reservationId: string | null

  @column()
  declare customerId: string | null

  @column()
  declare createdBy: string

  @column()
  declare voidedBy: string | null

  @column()
  declare discountId: string | null

  @column()
  declare saleNumber: string

  @column()
  declare saleNumberInt: number

  @column()
  declare status: 'pending' | 'completed' | 'voided' | 'refunded'

  @column()
  declare type: 'dine_in' | 'takeaway' | 'delivery' | 'service'

  @column()
  declare subtotal: number

  @column()
  declare discountAmount: number

  @column()
  declare taxAmount: number

  @column()
  declare totalAmount: number

  @column()
  declare amountPaid: number

  @column()
  declare changeAmount: number

  @column()
  declare notes: string | null

  @column()
  declare metadata: Record<string, any> | null

  @column()
  declare voidReason: string | null

  @column.dateTime()
  declare completedAt: DateTime | null

  @column.dateTime()
  declare voidedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Business)
  declare business: BelongsTo<typeof Business>

  @belongsTo(() => Location)
  declare location: BelongsTo<typeof Location>

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare createdByUser: BelongsTo<typeof User>

  @belongsTo(() => Discount)
  declare discount: BelongsTo<typeof Discount>

  @belongsTo(() => Table)
  declare table: BelongsTo<typeof Table>

  @hasMany(() => SaleItem)
  declare items: HasMany<typeof SaleItem>

  @hasMany(() => SalePayment)
  declare payments: HasMany<typeof SalePayment>

  @hasOne(() => Appointment, { foreignKey: 'saleId' })
  declare appointment: HasOne<typeof Appointment>

  @belongsTo(() => Reservation)
  declare reservation: BelongsTo<typeof Reservation>
}
