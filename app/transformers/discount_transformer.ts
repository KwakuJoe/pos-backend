import { BaseTransformer } from '@adonisjs/core/transformers'
import type Discount from '#models/discount'

export default class DiscountTransformer extends BaseTransformer<Discount> {
  toObject() {
    return {
      id: this.resource.id,
      businessId: this.resource.businessId,
      name: this.resource.name,
      code: this.resource.code,
      type: this.resource.type,
      value: this.resource.value,
      minOrderAmount: this.resource.minOrderAmount,
      maxUses: this.resource.maxUses,
      usesCount: this.resource.usesCount,
      startsAt: this.resource.startsAt,
      endsAt: this.resource.endsAt,
      isActive: this.resource.isActive,
      isExpired: this.resource.isExpired,
      isExhausted: this.resource.isExhausted,
      isUsable: this.resource.isUsable,
      createdAt: this.resource.createdAt,
      updatedAt: this.resource.updatedAt,
    }
  }
}
