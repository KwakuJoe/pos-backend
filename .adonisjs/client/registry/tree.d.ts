/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    login: typeof routes['auth.login']
    logout: typeof routes['auth.logout']
    changePassword: typeof routes['auth.change_password']
    me: typeof routes['auth.me']
  }
  users: {
    index: typeof routes['users.index']
    store: typeof routes['users.store']
    show: typeof routes['users.show']
    update: typeof routes['users.update']
    destroy: typeof routes['users.destroy']
  }
  roles: {
    index: typeof routes['roles.index']
    store: typeof routes['roles.store']
    show: typeof routes['roles.show']
    update: typeof routes['roles.update']
    destroy: typeof routes['roles.destroy']
  }
  permissions: {
    index: typeof routes['permissions.index']
  }
  locations: {
    index: typeof routes['locations.index']
    store: typeof routes['locations.store']
    update: typeof routes['locations.update']
  }
  customers: {
    index: typeof routes['customers.index']
    store: typeof routes['customers.store']
    show: typeof routes['customers.show']
    update: typeof routes['customers.update']
    destroy: typeof routes['customers.destroy']
  }
  creditPayments: {
    index: typeof routes['credit_payments.index']
    store: typeof routes['credit_payments.store']
  }
  uploads: {
    image: typeof routes['uploads.image']
    destroy: typeof routes['uploads.destroy']
  }
  taxes: {
    index: typeof routes['taxes.index']
    store: typeof routes['taxes.store']
    show: typeof routes['taxes.show']
    update: typeof routes['taxes.update']
    destroy: typeof routes['taxes.destroy']
  }
  productCategories: {
    index: typeof routes['product_categories.index']
    store: typeof routes['product_categories.store']
    update: typeof routes['product_categories.update']
    destroy: typeof routes['product_categories.destroy']
  }
  products: {
    index: typeof routes['products.index']
    store: typeof routes['products.store']
    show: typeof routes['products.show']
    update: typeof routes['products.update']
    destroy: typeof routes['products.destroy']
    storeVariant: typeof routes['products.store_variant']
    updateVariant: typeof routes['products.update_variant']
    destroyVariant: typeof routes['products.destroy_variant']
    storeModifier: typeof routes['products.store_modifier']
    updateModifier: typeof routes['products.update_modifier']
    destroyModifier: typeof routes['products.destroy_modifier']
    storeModifierOption: typeof routes['products.store_modifier_option']
    updateModifierOption: typeof routes['products.update_modifier_option']
    destroyModifierOption: typeof routes['products.destroy_modifier_option']
  }
  tables: {
    index: typeof routes['tables.index']
    store: typeof routes['tables.store']
    show: typeof routes['tables.show']
    update: typeof routes['tables.update']
    destroy: typeof routes['tables.destroy']
  }
  discounts: {
    index: typeof routes['discounts.index']
    store: typeof routes['discounts.store']
    show: typeof routes['discounts.show']
    update: typeof routes['discounts.update']
    destroy: typeof routes['discounts.destroy']
    validate: typeof routes['discounts.validate']
  }
  sales: {
    index: typeof routes['sales.index']
    store: typeof routes['sales.store']
    show: typeof routes['sales.show']
    void: typeof routes['sales.void']
    complete: typeof routes['sales.complete']
    applyDiscount: typeof routes['sales.apply_discount']
    storeItem: typeof routes['sales.store_item']
    updateItem: typeof routes['sales.update_item']
    destroyItem: typeof routes['sales.destroy_item']
    storePayment: typeof routes['sales.store_payment']
  }
}
