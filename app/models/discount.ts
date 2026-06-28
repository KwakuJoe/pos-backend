import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Business from '#models/business'

export default class Discount extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare businessId: string

  @column()
  declare name: string

  @column()
  declare code: string | null

  @column()
  declare type: 'percentage' | 'fixed'

  @column()
  declare value: number

  @column()
  declare minOrderAmount: number | null

  @column()
  declare maxUses: number | null

  @column()
  declare usesCount: number

  @column.dateTime()
  declare startsAt: DateTime | null

  @column.dateTime()
  declare endsAt: DateTime | null

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Business)
  declare business: BelongsTo<typeof Business>

  get isExpired(): boolean {
    if (!this.endsAt) return false
    return this.endsAt < DateTime.now()
  }

  get isExhausted(): boolean {
    if (!this.maxUses) return false
    return this.usesCount >= this.maxUses
  }

  get isUsable(): boolean {
    if (!this.isActive) return false
    if (this.isExpired) return false
    if (this.isExhausted) return false
    if (this.startsAt && this.startsAt > DateTime.now()) return false
    return true
  }
}
