import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'
import type { TransactionClientContract } from '@adonisjs/lucid/types/database'
import db from '@adonisjs/lucid/services/db'

import Sale from '#models/sale'
import SaleItem from '#models/sale_item'
import SalePayment from '#models/sale_payment'
import Product from '#models/product'
import ProductVariant from '#models/product_variant'
import ProductModifierOption from '#models/product_modifier_option'
import Customer from '#models/customer'
import Discount from '#models/discount'
import Table from '#models/table'

import SaleTransformer from '#transformers/sale_transformer'
import SaleFilter from '#filters/sale_filter'

import {
  saleFilterValidator,
  createSaleValidator,
  addSaleItemValidator,
  updateSaleItemValidator,
  addPaymentValidator,
  applyDiscountValidator,
  voidSaleValidator,
} from '#validators/sale_validator'

export default class SalesController {
  // ─── List ─────────────────────────────────────────────────────────────────

  async index({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const payload = await request.validateUsing(saleFilterValidator)
    const page = payload.page ?? 1
    const limit = payload.limit ?? 50

    let query = Sale.query()
      .where('business_id', user.businessId)
      .preload('customer')
      .preload('createdByUser')

    query = new SaleFilter(query, { ...payload }).apply()

    const sales = await query.paginate(page, limit)
    const transformed = await serialize(SaleTransformer.paginate(sales.all(), sales.getMeta()))

    return response.ok({
      message: 'Sales fetched successfully',
      data: transformed.data,
      meta: transformed.metadata,
    })
  }

  // ─── Create ───────────────────────────────────────────────────────────────

  async store({ auth, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = await request.validateUsing(createSaleValidator)

    const sale = await db.transaction(async (trx) => {
      const counterResult = await trx.rawQuery(
        'UPDATE businesses SET sales_counter = sales_counter + 1 WHERE id = ? RETURNING sales_counter',
        [user.businessId]
      )
      const saleNum: number = counterResult.rows[0].sales_counter
      const saleNumber = `SAL-${String(saleNum).padStart(6, '0')}`

      // Auto-detect type: if tableId provided assume dine_in, else takeaway
      const saleType = data.type ?? (data.tableId ? 'dine_in' : 'takeaway')

      const newSale = await Sale.create(
        {
          businessId: user.businessId,
          locationId: data.locationId ?? null,
          tableId: data.tableId ?? null,
          customerId: data.customerId ?? null,
          createdBy: user.id,
          saleNumber,
          saleNumberInt: saleNum,
          status: 'pending',
          type: saleType,
          subtotal: 0,
          discountAmount: 0,
          taxAmount: 0,
          totalAmount: 0,
          amountPaid: 0,
          changeAmount: 0,
          notes: data.notes ?? null,
        },
        { client: trx }
      )

      if (data.tableId) {
        await Table.query({ client: trx }).where('id', data.tableId).update({ status: 'occupied' })
      }

      if (data.items && data.items.length > 0) {
        for (const itemData of data.items) {
          await this.createItem(newSale.id, user.businessId, itemData, trx)
        }
        await this.recalculateTotals(newSale, trx)
        newSale.useTransaction(trx)
        await newSale.save()
      }

      return newSale
    })

    await this.loadSaleRelations(sale)
    const transformed = await serialize(SaleTransformer.transform(sale))
    return response.created({ message: 'Sale created successfully', data: transformed.data })
  }

  // ─── Show ─────────────────────────────────────────────────────────────────

  async show({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const sale = await Sale.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .firstOrFail()

    await this.loadSaleRelations(sale)
    const transformed = await serialize(SaleTransformer.transform(sale))
    return response.ok({ data: transformed.data })
  }

  // ─── Apply / Remove Discount ──────────────────────────────────────────────

  async applyDiscount({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const sale = await Sale.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .where('status', 'pending')
      .firstOrFail()

    const { discountId } = await request.validateUsing(applyDiscountValidator)

    if (discountId) {
      const discount = await Discount.query()
        .where('id', discountId)
        .where('business_id', user.businessId)
        .firstOrFail()

      if (!discount.isUsable) {
        return response.unprocessableEntity({ message: 'This discount is not currently usable.' })
      }

      sale.discountId = discount.id
    } else {
      sale.discountId = null
    }

    await this.recalculateTotals(sale)
    await sale.save()

    await this.loadSaleRelations(sale)
    const transformed = await serialize(SaleTransformer.transform(sale))
    return response.ok({ message: 'Discount applied successfully', data: transformed.data })
  }

  // ─── Void ─────────────────────────────────────────────────────────────────

  async void({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const sale = await Sale.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .where('status', 'pending')
      .firstOrFail()

    const data = await request.validateUsing(voidSaleValidator)

    await db.transaction(async (trx) => {
      sale.useTransaction(trx)
      sale.status = 'voided'
      sale.voidedBy = user.id
      sale.voidedAt = DateTime.now()
      sale.voidReason = data.reason ?? null
      await sale.save()

      if (sale.tableId) {
        await Table.query({ client: trx }).where('id', sale.tableId).update({ status: 'available' })
      }
    })

    await this.loadSaleRelations(sale)
    const transformed = await serialize(SaleTransformer.transform(sale))
    return response.ok({ message: 'Sale voided successfully', data: transformed.data })
  }

  // ─── Force Complete ───────────────────────────────────────────────────────

  async complete({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const sale = await Sale.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .where('status', 'pending')
      .firstOrFail()

    await db.transaction(async (trx) => {
      sale.useTransaction(trx)
      sale.status = 'completed'
      sale.completedAt = DateTime.now()
      await sale.save()

      if (sale.tableId) {
        await Table.query({ client: trx }).where('id', sale.tableId).update({ status: 'available' })
      }
    })

    await this.loadSaleRelations(sale)
    const transformed = await serialize(SaleTransformer.transform(sale))
    return response.ok({ message: 'Sale completed', data: transformed.data })
  }

  // ─── Add Item ─────────────────────────────────────────────────────────────

  async storeItem({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const sale = await Sale.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .where('status', 'pending')
      .firstOrFail()

    const data = await request.validateUsing(addSaleItemValidator)

    await db.transaction(async (trx) => {
      await this.createItem(sale.id, user.businessId, data, trx)
      await this.recalculateTotals(sale, trx)
      sale.useTransaction(trx)
      await sale.save()
    })

    await sale.refresh()
    await this.loadSaleRelations(sale)
    const transformed = await serialize(SaleTransformer.transform(sale))
    return response.created({ message: 'Item added', data: transformed.data })
  }

  // ─── Update Item ──────────────────────────────────────────────────────────

  async updateItem({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const sale = await Sale.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .where('status', 'pending')
      .firstOrFail()

    const item = await SaleItem.query()
      .where('id', params.itemId)
      .where('sale_id', sale.id)
      .firstOrFail()

    const data = await request.validateUsing(updateSaleItemValidator)

    if (data.quantity !== undefined) {
      const qty = data.quantity
      item.quantity = qty
      item.subtotal = Number(item.unitPrice) * qty + Number(item.modifierCost)

      if (item.taxRate) {
        if (item.isInclusive) {
          item.taxAmount = item.subtotal * Number(item.taxRate) / (1 + Number(item.taxRate))
          item.total = item.subtotal
        } else {
          item.taxAmount = item.subtotal * Number(item.taxRate)
          item.total = item.subtotal + item.taxAmount
        }
      } else {
        item.taxAmount = 0
        item.total = item.subtotal
      }
    }

    if (data.notes !== undefined) {
      item.notes = data.notes
    }

    await db.transaction(async (trx) => {
      item.useTransaction(trx)
      await item.save()
      await this.recalculateTotals(sale, trx)
      sale.useTransaction(trx)
      await sale.save()
    })

    await sale.refresh()
    await this.loadSaleRelations(sale)
    const transformed = await serialize(SaleTransformer.transform(sale))
    return response.ok({ message: 'Item updated', data: transformed.data })
  }

  // ─── Remove Item ──────────────────────────────────────────────────────────

  async destroyItem({ auth, params, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const sale = await Sale.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .where('status', 'pending')
      .firstOrFail()

    const item = await SaleItem.query()
      .where('id', params.itemId)
      .where('sale_id', sale.id)
      .firstOrFail()

    await db.transaction(async (trx) => {
      await item.useTransaction(trx).delete()
      await this.recalculateTotals(sale, trx)
      sale.useTransaction(trx)
      await sale.save()
    })

    await sale.refresh()
    await this.loadSaleRelations(sale)
    const transformed = await serialize(SaleTransformer.transform(sale))
    return response.ok({ message: 'Item removed', data: transformed.data })
  }

  // ─── Add Payment ──────────────────────────────────────────────────────────

  async storePayment({ auth, params, request, response, serialize }: HttpContext) {
    const user = auth.getUserOrFail()

    const sale = await Sale.query()
      .where('id', params.id)
      .where('business_id', user.businessId)
      .where('status', 'pending')
      .firstOrFail()

    const data = await request.validateUsing(addPaymentValidator)

    const amountOwed = Math.max(0, Number(sale.totalAmount) - Number(sale.amountPaid))
    if (data.amount > amountOwed + 0.01) {
      return response.badRequest({
        message: `Payment amount exceeds remaining balance of ${amountOwed.toFixed(2)}.`,
      })
    }

    await db.transaction(async (trx) => {
      await SalePayment.create(
        {
          saleId: sale.id,
          recordedBy: user.id,
          amount: data.amount,
          method: data.method,
          cashTendered: data.cashTendered ?? null,
          reference: data.reference ?? null,
          notes: data.notes ?? null,
        },
        { client: trx }
      )

      sale.useTransaction(trx)
      sale.amountPaid = Number(sale.amountPaid) + Number(data.amount)

      // Cash change
      if (data.method === 'cash' && data.cashTendered) {
        sale.changeAmount = Math.max(0, Number(data.cashTendered) - amountOwed)
      }

      // Auto-complete when fully paid
      if (Number(sale.amountPaid) >= Number(sale.totalAmount) - 0.01) {
        sale.status = 'completed'
        sale.completedAt = DateTime.now()

        if (sale.tableId) {
          await Table.query({ client: trx }).where('id', sale.tableId).update({ status: 'available' })
        }

        // Increment discount uses
        if (sale.discountId) {
          await Discount.query({ client: trx })
            .where('id', sale.discountId)
            .increment('uses_count', 1)
        }
      }

      // Credit payment — increase customer balance
      if (data.method === 'credit' && sale.customerId) {
        const customer = await Customer.query({ client: trx })
          .where('id', sale.customerId)
          .firstOrFail()
        customer.useTransaction(trx)
        customer.outstandingBalance = Number(customer.outstandingBalance) + Number(data.amount)
        await customer.save()
      }

      await sale.save()
    })

    await sale.refresh()
    await this.loadSaleRelations(sale)
    const transformed = await serialize(SaleTransformer.transform(sale))

    const message =
      sale.status === 'completed' ? 'Payment recorded. Sale completed.' : 'Payment recorded.'

    return response.created({ message, data: transformed.data })
  }

  // ─── Private Helpers ──────────────────────────────────────────────────────

  private async createItem(
    saleId: string,
    businessId: string,
    data: { productId: string; variantId?: string; quantity?: number; modifiers?: { optionId: string }[]; notes?: string },
    trx: TransactionClientContract
  ): Promise<SaleItem> {
    const product = await Product.query({ client: trx })
      .where('id', data.productId)
      .where('business_id', businessId)
      .where('is_active', true)
      .preload('tax')
      .firstOrFail()

    let unitPrice = Number(product.price)
    let variantName: string | null = null

    if (data.variantId) {
      const variant = await ProductVariant.query({ client: trx })
        .where('id', data.variantId)
        .where('product_id', product.id)
        .where('is_active', true)
        .firstOrFail()
      unitPrice += Number(variant.priceAdjustment)
      variantName = variant.name
    }

    let modifierCost = 0
    const modifiersSnapshot: any[] = []

    if (data.modifiers && data.modifiers.length > 0) {
      for (const mod of data.modifiers) {
        const option = await ProductModifierOption.query({ client: trx })
          .where('id', mod.optionId)
          .where('is_active', true)
          .preload('modifier')
          .firstOrFail()
        modifierCost += Number(option.priceAdjustment)
        modifiersSnapshot.push({
          modifierId: option.modifierId,
          modifierName: option.modifier.name,
          optionId: option.id,
          optionName: option.name,
          price: Number(option.priceAdjustment),
        })
      }
    }

    const quantity = data.quantity ?? 1
    const subtotal = unitPrice * quantity + modifierCost
    let taxAmount = 0
    let total = subtotal
    let taxRate: number | null = null
    let isInclusive = false

    if (product.tax && product.tax.isActive) {
      taxRate = Number(product.tax.rate)
      isInclusive = product.tax.isInclusive
      if (isInclusive) {
        taxAmount = subtotal * taxRate / (1 + taxRate)
        total = subtotal
      } else {
        taxAmount = subtotal * taxRate
        total = subtotal + taxAmount
      }
    }

    return SaleItem.create(
      {
        saleId,
        productId: product.id,
        variantId: data.variantId ?? null,
        productName: product.name,
        variantName,
        unitPrice,
        quantity,
        modifiers: modifiersSnapshot.length ? modifiersSnapshot : null,
        modifierCost,
        taxRate,
        isInclusive,
        taxAmount,
        subtotal,
        total,
        notes: data.notes ?? null,
      },
      { client: trx }
    )
  }

  private async recalculateTotals(sale: Sale, trx?: TransactionClientContract): Promise<void> {
    const items = await SaleItem.query({ client: trx }).where('sale_id', sale.id)

    let subtotal = 0
    let taxAmount = 0
    let grossTotal = 0

    for (const item of items) {
      subtotal += Number(item.subtotal)
      taxAmount += Number(item.taxAmount)
      grossTotal += Number(item.total)
    }

    sale.subtotal = subtotal
    sale.taxAmount = taxAmount

    let discountAmount = 0
    if (sale.discountId) {
      const discount = await Discount.find(sale.discountId)
      if (discount && discount.isUsable) {
        discountAmount =
          discount.type === 'percentage'
            ? grossTotal * Number(discount.value) / 100
            : Math.min(Number(discount.value), grossTotal)
      }
    }

    sale.discountAmount = Math.round(discountAmount * 100) / 100
    sale.totalAmount = Math.max(0, Math.round((grossTotal - discountAmount) * 100) / 100)
  }

  private async loadSaleRelations(sale: Sale): Promise<void> {
    await sale.load('createdByUser')
    await sale.load('items')
    await sale.load('payments')

    if (sale.customerId) await sale.load('customer')
    if (sale.locationId) await sale.load('location')
    if (sale.discountId) await sale.load('discount')
    if (sale.tableId) await (sale as any).load('table')
  }
}
