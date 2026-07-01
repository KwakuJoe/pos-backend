import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'event_stream': { paramsTuple?: []; params?: {} }
    'subscribe': { paramsTuple?: []; params?: {} }
    'unsubscribe': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.change_password': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'business.show': { paramsTuple?: []; params?: {} }
    'business.update': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.index': { paramsTuple?: []; params?: {} }
    'roles.store': { paramsTuple?: []; params?: {} }
    'roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'permissions.index': { paramsTuple?: []; params?: {} }
    'locations.index': { paramsTuple?: []; params?: {} }
    'locations.store': { paramsTuple?: []; params?: {} }
    'locations.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'customers.index': { paramsTuple?: []; params?: {} }
    'customers.store': { paramsTuple?: []; params?: {} }
    'customers.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'customers.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'customers.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'credit_payments.index': { paramsTuple: [ParamValue]; params: {'customerId': ParamValue} }
    'credit_payments.store': { paramsTuple: [ParamValue]; params: {'customerId': ParamValue} }
    'uploads.image': { paramsTuple?: []; params?: {} }
    'uploads.destroy': { paramsTuple?: []; params?: {} }
    'taxes.index': { paramsTuple?: []; params?: {} }
    'taxes.store': { paramsTuple?: []; params?: {} }
    'taxes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'taxes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'taxes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product_categories.index': { paramsTuple?: []; params?: {} }
    'product_categories.store': { paramsTuple?: []; params?: {} }
    'product_categories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product_categories.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.index': { paramsTuple?: []; params?: {} }
    'products.store': { paramsTuple?: []; params?: {} }
    'products.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.store_variant': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.update_variant': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'variantId': ParamValue} }
    'products.destroy_variant': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'variantId': ParamValue} }
    'products.store_modifier': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.update_modifier': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'modifierId': ParamValue} }
    'products.destroy_modifier': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'modifierId': ParamValue} }
    'products.store_modifier_option': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'modifierId': ParamValue} }
    'products.update_modifier_option': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'modifierId': ParamValue,'optionId': ParamValue} }
    'products.destroy_modifier_option': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'modifierId': ParamValue,'optionId': ParamValue} }
    'tables.index': { paramsTuple?: []; params?: {} }
    'tables.store': { paramsTuple?: []; params?: {} }
    'tables.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tables.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tables.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'discounts.index': { paramsTuple?: []; params?: {} }
    'discounts.store': { paramsTuple?: []; params?: {} }
    'discounts.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'discounts.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'discounts.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'discounts.validate': { paramsTuple?: []; params?: {} }
    'sales.index': { paramsTuple?: []; params?: {} }
    'sales.store': { paramsTuple?: []; params?: {} }
    'sales.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.void': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.complete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.apply_discount': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.store_item': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.update_item': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'itemId': ParamValue} }
    'sales.destroy_item': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'itemId': ParamValue} }
    'sales.store_payment': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.transfer_table': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.index': { paramsTuple?: []; params?: {} }
    'reservations.store': { paramsTuple?: []; params?: {} }
    'reservations.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.confirm': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.seat': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.cancel': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.no_show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.update_kitchen_status': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'itemId': ParamValue} }
    'appointments.index': { paramsTuple?: []; params?: {} }
    'appointments.store': { paramsTuple?: []; params?: {} }
    'appointments.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'appointments.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'appointments.confirm': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'appointments.start': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'appointments.cancel': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'appointments.no_show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'staff.performance': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'event_stream': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'business.show': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.index': { paramsTuple?: []; params?: {} }
    'roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'permissions.index': { paramsTuple?: []; params?: {} }
    'locations.index': { paramsTuple?: []; params?: {} }
    'customers.index': { paramsTuple?: []; params?: {} }
    'customers.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'credit_payments.index': { paramsTuple: [ParamValue]; params: {'customerId': ParamValue} }
    'taxes.index': { paramsTuple?: []; params?: {} }
    'taxes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product_categories.index': { paramsTuple?: []; params?: {} }
    'products.index': { paramsTuple?: []; params?: {} }
    'products.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tables.index': { paramsTuple?: []; params?: {} }
    'tables.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'discounts.index': { paramsTuple?: []; params?: {} }
    'discounts.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.index': { paramsTuple?: []; params?: {} }
    'sales.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.index': { paramsTuple?: []; params?: {} }
    'reservations.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'appointments.index': { paramsTuple?: []; params?: {} }
    'appointments.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'staff.performance': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'event_stream': { paramsTuple?: []; params?: {} }
    'auth.me': { paramsTuple?: []; params?: {} }
    'business.show': { paramsTuple?: []; params?: {} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.index': { paramsTuple?: []; params?: {} }
    'roles.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'permissions.index': { paramsTuple?: []; params?: {} }
    'locations.index': { paramsTuple?: []; params?: {} }
    'customers.index': { paramsTuple?: []; params?: {} }
    'customers.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'credit_payments.index': { paramsTuple: [ParamValue]; params: {'customerId': ParamValue} }
    'taxes.index': { paramsTuple?: []; params?: {} }
    'taxes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product_categories.index': { paramsTuple?: []; params?: {} }
    'products.index': { paramsTuple?: []; params?: {} }
    'products.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'tables.index': { paramsTuple?: []; params?: {} }
    'tables.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'discounts.index': { paramsTuple?: []; params?: {} }
    'discounts.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.index': { paramsTuple?: []; params?: {} }
    'sales.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.index': { paramsTuple?: []; params?: {} }
    'reservations.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'appointments.index': { paramsTuple?: []; params?: {} }
    'appointments.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'staff.performance': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'subscribe': { paramsTuple?: []; params?: {} }
    'unsubscribe': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'auth.logout': { paramsTuple?: []; params?: {} }
    'auth.change_password': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'roles.store': { paramsTuple?: []; params?: {} }
    'locations.store': { paramsTuple?: []; params?: {} }
    'customers.store': { paramsTuple?: []; params?: {} }
    'credit_payments.store': { paramsTuple: [ParamValue]; params: {'customerId': ParamValue} }
    'uploads.image': { paramsTuple?: []; params?: {} }
    'taxes.store': { paramsTuple?: []; params?: {} }
    'product_categories.store': { paramsTuple?: []; params?: {} }
    'products.store': { paramsTuple?: []; params?: {} }
    'products.store_variant': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.store_modifier': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.store_modifier_option': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'modifierId': ParamValue} }
    'tables.store': { paramsTuple?: []; params?: {} }
    'discounts.store': { paramsTuple?: []; params?: {} }
    'discounts.validate': { paramsTuple?: []; params?: {} }
    'sales.store': { paramsTuple?: []; params?: {} }
    'sales.void': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.complete': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.apply_discount': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.store_item': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.store_payment': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.store': { paramsTuple?: []; params?: {} }
    'reservations.confirm': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.seat': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.cancel': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.no_show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'appointments.store': { paramsTuple?: []; params?: {} }
    'appointments.confirm': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'appointments.start': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'appointments.cancel': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'appointments.no_show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'business.update': { paramsTuple?: []; params?: {} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'locations.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'customers.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'taxes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product_categories.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.update_variant': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'variantId': ParamValue} }
    'products.update_modifier': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'modifierId': ParamValue} }
    'products.update_modifier_option': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'modifierId': ParamValue,'optionId': ParamValue} }
    'tables.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'discounts.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.update_item': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'itemId': ParamValue} }
    'sales.transfer_table': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reservations.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.update_kitchen_status': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'itemId': ParamValue} }
    'appointments.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'roles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'customers.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'uploads.destroy': { paramsTuple?: []; params?: {} }
    'taxes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'product_categories.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.destroy_variant': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'variantId': ParamValue} }
    'products.destroy_modifier': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'modifierId': ParamValue} }
    'products.destroy_modifier_option': { paramsTuple: [ParamValue,ParamValue,ParamValue]; params: {'id': ParamValue,'modifierId': ParamValue,'optionId': ParamValue} }
    'tables.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'discounts.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.destroy_item': { paramsTuple: [ParamValue,ParamValue]; params: {'id': ParamValue,'itemId': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}