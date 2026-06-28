import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Business from '#models/business'
import Product from '#models/product'

export default class Tax extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare businessId: string

  @column()
  declare name: string

  @column()
  declare rate: number

  @column()
  declare isInclusive: boolean

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Business)
  declare business: BelongsTo<typeof Business>

  @hasMany(() => Product)
  declare products: HasMany<typeof Product>
}
