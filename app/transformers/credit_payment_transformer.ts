import { BaseTransformer } from '@adonisjs/core/transformers'
import type CreditPayment from '#models/credit_payment'

export default class CreditPaymentTransformer extends BaseTransformer<CreditPayment> {
  toObject() {
    return {
      id: this.resource.id,
      customerId: this.resource.customerId,
      amount: this.resource.amount,
      paymentMethod: this.resource.paymentMethod,
      notes: this.resource.notes,
      recordedBy: this.resource.recordedBy,
      createdAt: this.resource.createdAt,
    }
  }
}
