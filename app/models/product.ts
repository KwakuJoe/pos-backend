import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Business from '#models/business'
import ProductCategory from '#models/product_category'
import Tax from '#models/tax'
import ProductVariant from '#models/product_variant'
import ProductModifier from '#models/product_modifier'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare businessId: string

  @column()
  declare categoryId: string | null

  @column()
  declare taxId: string | null

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare imageUrl: string | null

  @column()
  declare imagePublicId: string | null

  @column()
  declare type: 'physical' | 'service' | 'composite'

  @column()
  declare sku: string | null

  @column()
  declare barcode: string | null

  @column()
  declare price: number

  @column()
  declare costPrice: number | null

  @column()
  declare pricingModel: 'fixed' | 'per_kg' | 'per_hour'

  @column()
  declare unit: 'piece' | 'kg' | 'g' | 'litre' | 'ml' | 'hour' | 'pack' | 'dozen' | 'other'

  @column()
  declare isActive: boolean

  @column()
  declare metadata: Record<string, any> | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Business)
  declare business: BelongsTo<typeof Business>

  @belongsTo(() => ProductCategory, { foreignKey: 'categoryId' })
  declare category: BelongsTo<typeof ProductCategory>

  @belongsTo(() => Tax, { foreignKey: 'taxId' })
  declare tax: BelongsTo<typeof Tax>

  @hasMany(() => ProductVariant)
  declare variants: HasMany<typeof ProductVariant>

  @hasMany(() => ProductModifier)
  declare modifiers: HasMany<typeof ProductModifier>
}
