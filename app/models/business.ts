import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { BusinessType } from '#enums/business_type'

export default class Business extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare email: string

  @column()
  declare phone: string | null

  @column()
  declare address: string | null

  @column()
  declare city: string | null

  @column()
  declare country: string

  @column()
  declare logoUrl: string | null

  @column()
  declare currency: string

  @column()
  declare timezone: string

  @column()
  declare businessType: BusinessType | null

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
