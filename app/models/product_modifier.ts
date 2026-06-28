import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Product from '#models/product'
import ProductModifierOption from '#models/product_modifier_option'

export default class ProductModifier extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare productId: string

  @column()
  declare name: string

  @column()
  declare isRequired: boolean

  @column()
  declare maxSelections: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @hasMany(() => ProductModifierOption, { foreignKey: 'modifierId' })
  declare options: HasMany<typeof ProductModifierOption>
}
