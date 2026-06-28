import { BaseTransformer } from '@adonisjs/core/transformers'
import type Sale from '#models/sale'
import type SaleItem from '#models/sale_item'
import type SalePayment from '#models/sale_payment'

export default class SaleTransformer extends BaseTransformer<Sale> {
  toObject() {
    const sale = this.resource

    const itemsLoaded = sale.$relations?.items as SaleItem[] | undefined
    const paymentsLoaded = sale.$relations?.payments as SalePayment[] | undefined

    return {
      id: sale.id,
      businessId: sale.businessId,
      saleNumber: sale.saleNumber,
      status: sale.status,
      type: sale.type,

      customer: sale.customer
        ? { id: sale.customer.id, fullName: sale.customer.fullName, phone: sale.customer.phone }
        : null,

      table: sale.$relations?.table
        ? { id: (sale.$relations.table as any).id, name: (sale.$relations.table as any).name }
        : null,

      location: sale.location
        ? { id: sale.location.id, name: sale.location.name }
        : null,

      createdBy: sale.$relations?.createdByUser
        ? { id: (sale.$relations.createdByUser as any).id, fullName: (sale.$relations.createdByUser as any).fullName }
        : { id: sale.createdBy, fullName: null },

      discount: sale.discount
        ? { id: sale.discount.id, name: sale.discount.name, type: sale.discount.type, value: sale.discount.value }
        : null,

      subtotal: sale.subtotal,
      discountAmount: sale.discountAmount,
      taxAmount: sale.taxAmount,
      totalAmount: sale.totalAmount,
      amountPaid: sale.amountPaid,
      changeAmount: sale.changeAmount,
      balance: Math.max(0, Number(sale.totalAmount) - Number(sale.amountPaid)),

      notes: sale.notes,

      items: itemsLoaded
        ? itemsLoaded.map((item) => ({
            id: item.id,
            productId: item.productId,
            variantId: item.variantId,
            productName: item.productName,
            variantName: item.variantName,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            modifiers: item.modifiers ?? [],
            modifierCost: item.modifierCost,
            taxRate: item.taxRate,
            isInclusive: item.isInclusive,
            taxAmount: item.taxAmount,
            subtotal: item.subtotal,
            total: item.total,
            notes: item.notes,
          }))
        : undefined,

      payments: paymentsLoaded
        ? paymentsLoaded.map((p) => ({
            id: p.id,
            amount: p.amount,
            method: p.method,
            cashTendered: p.cashTendered,
            reference: p.reference,
            notes: p.notes,
            createdAt: p.createdAt,
          }))
        : undefined,

      voidReason: sale.voidReason,
      completedAt: sale.completedAt,
      voidedAt: sale.voidedAt,
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt,
    }
  }
}
