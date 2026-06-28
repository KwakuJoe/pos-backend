import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import ProductModifier from '#models/product_modifier'

export default class ProductModifierOption extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare modifierId: string

  @column()
  declare name: string

  @column()
  declare priceAdjustment: number

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => ProductModifier, { foreignKey: 'modifierId' })
  declare modifier: BelongsTo<typeof ProductModifier>
}
