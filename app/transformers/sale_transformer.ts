import { BaseTransformer } from '@adonisjs/core/transformers'
import type Sale from '#models/sale'
import type SaleItem from '#models/sale_item'
import type SalePayment from '#models/sale_payment'

export default class SaleTransformer extends BaseTransformer<Sale> {
  toObject() {
    const sale = this.resource
    const preloaded = (sale as any).$preloaded ?? {}

    const itemsLoaded = preloaded.items as SaleItem[] | undefined
    const paymentsLoaded = preloaded.payments as SalePayment[] | undefined
    const createdByUser = preloaded.createdByUser as any
    const table = preloaded.table as any
    const reservationLoaded = preloaded.reservation as any ?? null
    const appt = (sale as any).__appointment !== undefined
      ? (sale as any).__appointment
      : (preloaded.appointment as any) ?? null

    return {
      id: sale.id,
      businessId: sale.businessId,
      saleNumber: sale.saleNumber,
      status: sale.status,
      type: sale.type,

      customer: sale.customer
        ? { id: sale.customer.id, fullName: sale.customer.fullName, phone: sale.customer.phone }
        : null,

      table: table
        ? { id: table.id, name: table.name }
        : null,

      location: sale.location
        ? { id: sale.location.id, name: sale.location.name }
        : null,

      createdBy: createdByUser
        ? { id: createdByUser.id, fullName: createdByUser.fullName }
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
            staffId: item.assignedStaffId,
            kitchenStatus: item.kitchenStatus,
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

      appointment: appt
        ? {
            id: appt.id,
            type: appt.type,
            status: appt.status,
            customerName: appt.customerName,
            customerPhone: appt.customerPhone,
            scheduledFor: appt.scheduledFor,
            durationMinutes: appt.durationMinutes,
            notes: appt.notes,
            staff: appt.staff
              ? { id: appt.staff.id, fullName: appt.staff.fullName }
              : null,
            service: appt.service
              ? { id: appt.service.id, name: appt.service.name }
              : null,
          }
        : null,

      reservation: reservationLoaded
        ? {
            id: reservationLoaded.id,
            status: reservationLoaded.status,
            reservedFor: reservationLoaded.reservedFor,
            partySize: reservationLoaded.partySize,
            reservedByName: reservationLoaded.reservedByName,
            reservedByPhone: reservationLoaded.reservedByPhone,
            notes: reservationLoaded.notes,
          }
        : null,

      walkInName: sale.metadata?.walkInName ?? null,
      walkInPhone: sale.metadata?.walkInPhone ?? null,

      voidReason: sale.voidReason,
      completedAt: sale.completedAt,
      voidedAt: sale.voidedAt,
      createdAt: sale.createdAt,
      updatedAt: sale.updatedAt,
    }
  }
}
