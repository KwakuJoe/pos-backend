/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.login': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'auth.logout': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.logout']['types'],
  },
  'auth.change_password': {
    methods: ["POST"],
    pattern: '/api/v1/auth/change-password',
    tokens: [{"old":"/api/v1/auth/change-password","type":0,"val":"api","end":""},{"old":"/api/v1/auth/change-password","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/change-password","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/change-password","type":0,"val":"change-password","end":""}],
    types: placeholder as Registry['auth.change_password']['types'],
  },
  'auth.me': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/auth/me',
    tokens: [{"old":"/api/v1/auth/me","type":0,"val":"api","end":""},{"old":"/api/v1/auth/me","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/me","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/me","type":0,"val":"me","end":""}],
    types: placeholder as Registry['auth.me']['types'],
  },
  'users.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users',
    tokens: [{"old":"/api/v1/users","type":0,"val":"api","end":""},{"old":"/api/v1/users","type":0,"val":"v1","end":""},{"old":"/api/v1/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.index']['types'],
  },
  'users.store': {
    methods: ["POST"],
    pattern: '/api/v1/users',
    tokens: [{"old":"/api/v1/users","type":0,"val":"api","end":""},{"old":"/api/v1/users","type":0,"val":"v1","end":""},{"old":"/api/v1/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.store']['types'],
  },
  'users.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users/:id',
    tokens: [{"old":"/api/v1/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.show']['types'],
  },
  'users.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/users/:id',
    tokens: [{"old":"/api/v1/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.update']['types'],
  },
  'users.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/users/:id',
    tokens: [{"old":"/api/v1/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.destroy']['types'],
  },
  'roles.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/roles',
    tokens: [{"old":"/api/v1/roles","type":0,"val":"api","end":""},{"old":"/api/v1/roles","type":0,"val":"v1","end":""},{"old":"/api/v1/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['roles.index']['types'],
  },
  'roles.store': {
    methods: ["POST"],
    pattern: '/api/v1/roles',
    tokens: [{"old":"/api/v1/roles","type":0,"val":"api","end":""},{"old":"/api/v1/roles","type":0,"val":"v1","end":""},{"old":"/api/v1/roles","type":0,"val":"roles","end":""}],
    types: placeholder as Registry['roles.store']['types'],
  },
  'roles.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/roles/:id',
    tokens: [{"old":"/api/v1/roles/:id","type":0,"val":"api","end":""},{"old":"/api/v1/roles/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/roles/:id","type":0,"val":"roles","end":""},{"old":"/api/v1/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['roles.show']['types'],
  },
  'roles.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/roles/:id',
    tokens: [{"old":"/api/v1/roles/:id","type":0,"val":"api","end":""},{"old":"/api/v1/roles/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/roles/:id","type":0,"val":"roles","end":""},{"old":"/api/v1/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['roles.update']['types'],
  },
  'roles.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/roles/:id',
    tokens: [{"old":"/api/v1/roles/:id","type":0,"val":"api","end":""},{"old":"/api/v1/roles/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/roles/:id","type":0,"val":"roles","end":""},{"old":"/api/v1/roles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['roles.destroy']['types'],
  },
  'permissions.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/permissions',
    tokens: [{"old":"/api/v1/permissions","type":0,"val":"api","end":""},{"old":"/api/v1/permissions","type":0,"val":"v1","end":""},{"old":"/api/v1/permissions","type":0,"val":"permissions","end":""}],
    types: placeholder as Registry['permissions.index']['types'],
  },
  'locations.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/locations',
    tokens: [{"old":"/api/v1/locations","type":0,"val":"api","end":""},{"old":"/api/v1/locations","type":0,"val":"v1","end":""},{"old":"/api/v1/locations","type":0,"val":"locations","end":""}],
    types: placeholder as Registry['locations.index']['types'],
  },
  'locations.store': {
    methods: ["POST"],
    pattern: '/api/v1/locations',
    tokens: [{"old":"/api/v1/locations","type":0,"val":"api","end":""},{"old":"/api/v1/locations","type":0,"val":"v1","end":""},{"old":"/api/v1/locations","type":0,"val":"locations","end":""}],
    types: placeholder as Registry['locations.store']['types'],
  },
  'locations.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/locations/:id',
    tokens: [{"old":"/api/v1/locations/:id","type":0,"val":"api","end":""},{"old":"/api/v1/locations/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/locations/:id","type":0,"val":"locations","end":""},{"old":"/api/v1/locations/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['locations.update']['types'],
  },
  'customers.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/customers',
    tokens: [{"old":"/api/v1/customers","type":0,"val":"api","end":""},{"old":"/api/v1/customers","type":0,"val":"v1","end":""},{"old":"/api/v1/customers","type":0,"val":"customers","end":""}],
    types: placeholder as Registry['customers.index']['types'],
  },
  'customers.store': {
    methods: ["POST"],
    pattern: '/api/v1/customers',
    tokens: [{"old":"/api/v1/customers","type":0,"val":"api","end":""},{"old":"/api/v1/customers","type":0,"val":"v1","end":""},{"old":"/api/v1/customers","type":0,"val":"customers","end":""}],
    types: placeholder as Registry['customers.store']['types'],
  },
  'customers.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/customers/:id',
    tokens: [{"old":"/api/v1/customers/:id","type":0,"val":"api","end":""},{"old":"/api/v1/customers/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/customers/:id","type":0,"val":"customers","end":""},{"old":"/api/v1/customers/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['customers.show']['types'],
  },
  'customers.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/customers/:id',
    tokens: [{"old":"/api/v1/customers/:id","type":0,"val":"api","end":""},{"old":"/api/v1/customers/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/customers/:id","type":0,"val":"customers","end":""},{"old":"/api/v1/customers/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['customers.update']['types'],
  },
  'customers.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/customers/:id',
    tokens: [{"old":"/api/v1/customers/:id","type":0,"val":"api","end":""},{"old":"/api/v1/customers/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/customers/:id","type":0,"val":"customers","end":""},{"old":"/api/v1/customers/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['customers.destroy']['types'],
  },
  'credit_payments.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/customers/:customerId/credit-payments',
    tokens: [{"old":"/api/v1/customers/:customerId/credit-payments","type":0,"val":"api","end":""},{"old":"/api/v1/customers/:customerId/credit-payments","type":0,"val":"v1","end":""},{"old":"/api/v1/customers/:customerId/credit-payments","type":0,"val":"customers","end":""},{"old":"/api/v1/customers/:customerId/credit-payments","type":1,"val":"customerId","end":""},{"old":"/api/v1/customers/:customerId/credit-payments","type":0,"val":"credit-payments","end":""}],
    types: placeholder as Registry['credit_payments.index']['types'],
  },
  'credit_payments.store': {
    methods: ["POST"],
    pattern: '/api/v1/customers/:customerId/credit-payments',
    tokens: [{"old":"/api/v1/customers/:customerId/credit-payments","type":0,"val":"api","end":""},{"old":"/api/v1/customers/:customerId/credit-payments","type":0,"val":"v1","end":""},{"old":"/api/v1/customers/:customerId/credit-payments","type":0,"val":"customers","end":""},{"old":"/api/v1/customers/:customerId/credit-payments","type":1,"val":"customerId","end":""},{"old":"/api/v1/customers/:customerId/credit-payments","type":0,"val":"credit-payments","end":""}],
    types: placeholder as Registry['credit_payments.store']['types'],
  },
  'uploads.image': {
    methods: ["POST"],
    pattern: '/api/v1/uploads/image',
    tokens: [{"old":"/api/v1/uploads/image","type":0,"val":"api","end":""},{"old":"/api/v1/uploads/image","type":0,"val":"v1","end":""},{"old":"/api/v1/uploads/image","type":0,"val":"uploads","end":""},{"old":"/api/v1/uploads/image","type":0,"val":"image","end":""}],
    types: placeholder as Registry['uploads.image']['types'],
  },
  'uploads.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/uploads/image',
    tokens: [{"old":"/api/v1/uploads/image","type":0,"val":"api","end":""},{"old":"/api/v1/uploads/image","type":0,"val":"v1","end":""},{"old":"/api/v1/uploads/image","type":0,"val":"uploads","end":""},{"old":"/api/v1/uploads/image","type":0,"val":"image","end":""}],
    types: placeholder as Registry['uploads.destroy']['types'],
  },
  'taxes.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/taxes',
    tokens: [{"old":"/api/v1/taxes","type":0,"val":"api","end":""},{"old":"/api/v1/taxes","type":0,"val":"v1","end":""},{"old":"/api/v1/taxes","type":0,"val":"taxes","end":""}],
    types: placeholder as Registry['taxes.index']['types'],
  },
  'taxes.store': {
    methods: ["POST"],
    pattern: '/api/v1/taxes',
    tokens: [{"old":"/api/v1/taxes","type":0,"val":"api","end":""},{"old":"/api/v1/taxes","type":0,"val":"v1","end":""},{"old":"/api/v1/taxes","type":0,"val":"taxes","end":""}],
    types: placeholder as Registry['taxes.store']['types'],
  },
  'taxes.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/taxes/:id',
    tokens: [{"old":"/api/v1/taxes/:id","type":0,"val":"api","end":""},{"old":"/api/v1/taxes/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/taxes/:id","type":0,"val":"taxes","end":""},{"old":"/api/v1/taxes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['taxes.show']['types'],
  },
  'taxes.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/taxes/:id',
    tokens: [{"old":"/api/v1/taxes/:id","type":0,"val":"api","end":""},{"old":"/api/v1/taxes/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/taxes/:id","type":0,"val":"taxes","end":""},{"old":"/api/v1/taxes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['taxes.update']['types'],
  },
  'taxes.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/taxes/:id',
    tokens: [{"old":"/api/v1/taxes/:id","type":0,"val":"api","end":""},{"old":"/api/v1/taxes/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/taxes/:id","type":0,"val":"taxes","end":""},{"old":"/api/v1/taxes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['taxes.destroy']['types'],
  },
  'product_categories.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/product-categories',
    tokens: [{"old":"/api/v1/product-categories","type":0,"val":"api","end":""},{"old":"/api/v1/product-categories","type":0,"val":"v1","end":""},{"old":"/api/v1/product-categories","type":0,"val":"product-categories","end":""}],
    types: placeholder as Registry['product_categories.index']['types'],
  },
  'product_categories.store': {
    methods: ["POST"],
    pattern: '/api/v1/product-categories',
    tokens: [{"old":"/api/v1/product-categories","type":0,"val":"api","end":""},{"old":"/api/v1/product-categories","type":0,"val":"v1","end":""},{"old":"/api/v1/product-categories","type":0,"val":"product-categories","end":""}],
    types: placeholder as Registry['product_categories.store']['types'],
  },
  'product_categories.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/product-categories/:id',
    tokens: [{"old":"/api/v1/product-categories/:id","type":0,"val":"api","end":""},{"old":"/api/v1/product-categories/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/product-categories/:id","type":0,"val":"product-categories","end":""},{"old":"/api/v1/product-categories/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['product_categories.update']['types'],
  },
  'product_categories.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/product-categories/:id',
    tokens: [{"old":"/api/v1/product-categories/:id","type":0,"val":"api","end":""},{"old":"/api/v1/product-categories/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/product-categories/:id","type":0,"val":"product-categories","end":""},{"old":"/api/v1/product-categories/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['product_categories.destroy']['types'],
  },
  'products.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/products',
    tokens: [{"old":"/api/v1/products","type":0,"val":"api","end":""},{"old":"/api/v1/products","type":0,"val":"v1","end":""},{"old":"/api/v1/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['products.index']['types'],
  },
  'products.store': {
    methods: ["POST"],
    pattern: '/api/v1/products',
    tokens: [{"old":"/api/v1/products","type":0,"val":"api","end":""},{"old":"/api/v1/products","type":0,"val":"v1","end":""},{"old":"/api/v1/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['products.store']['types'],
  },
  'products.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/products/:id',
    tokens: [{"old":"/api/v1/products/:id","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['products.show']['types'],
  },
  'products.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/products/:id',
    tokens: [{"old":"/api/v1/products/:id","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['products.update']['types'],
  },
  'products.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/products/:id',
    tokens: [{"old":"/api/v1/products/:id","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['products.destroy']['types'],
  },
  'products.store_variant': {
    methods: ["POST"],
    pattern: '/api/v1/products/:id/variants',
    tokens: [{"old":"/api/v1/products/:id/variants","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id/variants","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id/variants","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id/variants","type":1,"val":"id","end":""},{"old":"/api/v1/products/:id/variants","type":0,"val":"variants","end":""}],
    types: placeholder as Registry['products.store_variant']['types'],
  },
  'products.update_variant': {
    methods: ["PATCH"],
    pattern: '/api/v1/products/:id/variants/:variantId',
    tokens: [{"old":"/api/v1/products/:id/variants/:variantId","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id/variants/:variantId","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id/variants/:variantId","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id/variants/:variantId","type":1,"val":"id","end":""},{"old":"/api/v1/products/:id/variants/:variantId","type":0,"val":"variants","end":""},{"old":"/api/v1/products/:id/variants/:variantId","type":1,"val":"variantId","end":""}],
    types: placeholder as Registry['products.update_variant']['types'],
  },
  'products.destroy_variant': {
    methods: ["DELETE"],
    pattern: '/api/v1/products/:id/variants/:variantId',
    tokens: [{"old":"/api/v1/products/:id/variants/:variantId","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id/variants/:variantId","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id/variants/:variantId","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id/variants/:variantId","type":1,"val":"id","end":""},{"old":"/api/v1/products/:id/variants/:variantId","type":0,"val":"variants","end":""},{"old":"/api/v1/products/:id/variants/:variantId","type":1,"val":"variantId","end":""}],
    types: placeholder as Registry['products.destroy_variant']['types'],
  },
  'products.store_modifier': {
    methods: ["POST"],
    pattern: '/api/v1/products/:id/modifiers',
    tokens: [{"old":"/api/v1/products/:id/modifiers","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id/modifiers","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id/modifiers","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id/modifiers","type":1,"val":"id","end":""},{"old":"/api/v1/products/:id/modifiers","type":0,"val":"modifiers","end":""}],
    types: placeholder as Registry['products.store_modifier']['types'],
  },
  'products.update_modifier': {
    methods: ["PATCH"],
    pattern: '/api/v1/products/:id/modifiers/:modifierId',
    tokens: [{"old":"/api/v1/products/:id/modifiers/:modifierId","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId","type":1,"val":"id","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId","type":0,"val":"modifiers","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId","type":1,"val":"modifierId","end":""}],
    types: placeholder as Registry['products.update_modifier']['types'],
  },
  'products.destroy_modifier': {
    methods: ["DELETE"],
    pattern: '/api/v1/products/:id/modifiers/:modifierId',
    tokens: [{"old":"/api/v1/products/:id/modifiers/:modifierId","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId","type":1,"val":"id","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId","type":0,"val":"modifiers","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId","type":1,"val":"modifierId","end":""}],
    types: placeholder as Registry['products.destroy_modifier']['types'],
  },
  'products.store_modifier_option': {
    methods: ["POST"],
    pattern: '/api/v1/products/:id/modifiers/:modifierId/options',
    tokens: [{"old":"/api/v1/products/:id/modifiers/:modifierId/options","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options","type":1,"val":"id","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options","type":0,"val":"modifiers","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options","type":1,"val":"modifierId","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options","type":0,"val":"options","end":""}],
    types: placeholder as Registry['products.store_modifier_option']['types'],
  },
  'products.update_modifier_option': {
    methods: ["PATCH"],
    pattern: '/api/v1/products/:id/modifiers/:modifierId/options/:optionId',
    tokens: [{"old":"/api/v1/products/:id/modifiers/:modifierId/options/:optionId","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options/:optionId","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options/:optionId","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options/:optionId","type":1,"val":"id","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options/:optionId","type":0,"val":"modifiers","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options/:optionId","type":1,"val":"modifierId","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options/:optionId","type":0,"val":"options","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options/:optionId","type":1,"val":"optionId","end":""}],
    types: placeholder as Registry['products.update_modifier_option']['types'],
  },
  'products.destroy_modifier_option': {
    methods: ["DELETE"],
    pattern: '/api/v1/products/:id/modifiers/:modifierId/options/:optionId',
    tokens: [{"old":"/api/v1/products/:id/modifiers/:modifierId/options/:optionId","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options/:optionId","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options/:optionId","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options/:optionId","type":1,"val":"id","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options/:optionId","type":0,"val":"modifiers","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options/:optionId","type":1,"val":"modifierId","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options/:optionId","type":0,"val":"options","end":""},{"old":"/api/v1/products/:id/modifiers/:modifierId/options/:optionId","type":1,"val":"optionId","end":""}],
    types: placeholder as Registry['products.destroy_modifier_option']['types'],
  },
  'tables.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/tables',
    tokens: [{"old":"/api/v1/tables","type":0,"val":"api","end":""},{"old":"/api/v1/tables","type":0,"val":"v1","end":""},{"old":"/api/v1/tables","type":0,"val":"tables","end":""}],
    types: placeholder as Registry['tables.index']['types'],
  },
  'tables.store': {
    methods: ["POST"],
    pattern: '/api/v1/tables',
    tokens: [{"old":"/api/v1/tables","type":0,"val":"api","end":""},{"old":"/api/v1/tables","type":0,"val":"v1","end":""},{"old":"/api/v1/tables","type":0,"val":"tables","end":""}],
    types: placeholder as Registry['tables.store']['types'],
  },
  'tables.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/tables/:id',
    tokens: [{"old":"/api/v1/tables/:id","type":0,"val":"api","end":""},{"old":"/api/v1/tables/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/tables/:id","type":0,"val":"tables","end":""},{"old":"/api/v1/tables/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tables.show']['types'],
  },
  'tables.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/tables/:id',
    tokens: [{"old":"/api/v1/tables/:id","type":0,"val":"api","end":""},{"old":"/api/v1/tables/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/tables/:id","type":0,"val":"tables","end":""},{"old":"/api/v1/tables/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tables.update']['types'],
  },
  'tables.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/tables/:id',
    tokens: [{"old":"/api/v1/tables/:id","type":0,"val":"api","end":""},{"old":"/api/v1/tables/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/tables/:id","type":0,"val":"tables","end":""},{"old":"/api/v1/tables/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['tables.destroy']['types'],
  },
  'discounts.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/discounts',
    tokens: [{"old":"/api/v1/discounts","type":0,"val":"api","end":""},{"old":"/api/v1/discounts","type":0,"val":"v1","end":""},{"old":"/api/v1/discounts","type":0,"val":"discounts","end":""}],
    types: placeholder as Registry['discounts.index']['types'],
  },
  'discounts.store': {
    methods: ["POST"],
    pattern: '/api/v1/discounts',
    tokens: [{"old":"/api/v1/discounts","type":0,"val":"api","end":""},{"old":"/api/v1/discounts","type":0,"val":"v1","end":""},{"old":"/api/v1/discounts","type":0,"val":"discounts","end":""}],
    types: placeholder as Registry['discounts.store']['types'],
  },
  'discounts.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/discounts/:id',
    tokens: [{"old":"/api/v1/discounts/:id","type":0,"val":"api","end":""},{"old":"/api/v1/discounts/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/discounts/:id","type":0,"val":"discounts","end":""},{"old":"/api/v1/discounts/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['discounts.show']['types'],
  },
  'discounts.update': {
    methods: ["PATCH"],
    pattern: '/api/v1/discounts/:id',
    tokens: [{"old":"/api/v1/discounts/:id","type":0,"val":"api","end":""},{"old":"/api/v1/discounts/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/discounts/:id","type":0,"val":"discounts","end":""},{"old":"/api/v1/discounts/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['discounts.update']['types'],
  },
  'discounts.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/discounts/:id',
    tokens: [{"old":"/api/v1/discounts/:id","type":0,"val":"api","end":""},{"old":"/api/v1/discounts/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/discounts/:id","type":0,"val":"discounts","end":""},{"old":"/api/v1/discounts/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['discounts.destroy']['types'],
  },
  'discounts.validate': {
    methods: ["POST"],
    pattern: '/api/v1/discounts/validate-code',
    tokens: [{"old":"/api/v1/discounts/validate-code","type":0,"val":"api","end":""},{"old":"/api/v1/discounts/validate-code","type":0,"val":"v1","end":""},{"old":"/api/v1/discounts/validate-code","type":0,"val":"discounts","end":""},{"old":"/api/v1/discounts/validate-code","type":0,"val":"validate-code","end":""}],
    types: placeholder as Registry['discounts.validate']['types'],
  },
  'sales.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/sales',
    tokens: [{"old":"/api/v1/sales","type":0,"val":"api","end":""},{"old":"/api/v1/sales","type":0,"val":"v1","end":""},{"old":"/api/v1/sales","type":0,"val":"sales","end":""}],
    types: placeholder as Registry['sales.index']['types'],
  },
  'sales.store': {
    methods: ["POST"],
    pattern: '/api/v1/sales',
    tokens: [{"old":"/api/v1/sales","type":0,"val":"api","end":""},{"old":"/api/v1/sales","type":0,"val":"v1","end":""},{"old":"/api/v1/sales","type":0,"val":"sales","end":""}],
    types: placeholder as Registry['sales.store']['types'],
  },
  'sales.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/sales/:id',
    tokens: [{"old":"/api/v1/sales/:id","type":0,"val":"api","end":""},{"old":"/api/v1/sales/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/sales/:id","type":0,"val":"sales","end":""},{"old":"/api/v1/sales/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['sales.show']['types'],
  },
  'sales.void': {
    methods: ["POST"],
    pattern: '/api/v1/sales/:id/void',
    tokens: [{"old":"/api/v1/sales/:id/void","type":0,"val":"api","end":""},{"old":"/api/v1/sales/:id/void","type":0,"val":"v1","end":""},{"old":"/api/v1/sales/:id/void","type":0,"val":"sales","end":""},{"old":"/api/v1/sales/:id/void","type":1,"val":"id","end":""},{"old":"/api/v1/sales/:id/void","type":0,"val":"void","end":""}],
    types: placeholder as Registry['sales.void']['types'],
  },
  'sales.complete': {
    methods: ["POST"],
    pattern: '/api/v1/sales/:id/complete',
    tokens: [{"old":"/api/v1/sales/:id/complete","type":0,"val":"api","end":""},{"old":"/api/v1/sales/:id/complete","type":0,"val":"v1","end":""},{"old":"/api/v1/sales/:id/complete","type":0,"val":"sales","end":""},{"old":"/api/v1/sales/:id/complete","type":1,"val":"id","end":""},{"old":"/api/v1/sales/:id/complete","type":0,"val":"complete","end":""}],
    types: placeholder as Registry['sales.complete']['types'],
  },
  'sales.apply_discount': {
    methods: ["POST"],
    pattern: '/api/v1/sales/:id/apply-discount',
    tokens: [{"old":"/api/v1/sales/:id/apply-discount","type":0,"val":"api","end":""},{"old":"/api/v1/sales/:id/apply-discount","type":0,"val":"v1","end":""},{"old":"/api/v1/sales/:id/apply-discount","type":0,"val":"sales","end":""},{"old":"/api/v1/sales/:id/apply-discount","type":1,"val":"id","end":""},{"old":"/api/v1/sales/:id/apply-discount","type":0,"val":"apply-discount","end":""}],
    types: placeholder as Registry['sales.apply_discount']['types'],
  },
  'sales.store_item': {
    methods: ["POST"],
    pattern: '/api/v1/sales/:id/items',
    tokens: [{"old":"/api/v1/sales/:id/items","type":0,"val":"api","end":""},{"old":"/api/v1/sales/:id/items","type":0,"val":"v1","end":""},{"old":"/api/v1/sales/:id/items","type":0,"val":"sales","end":""},{"old":"/api/v1/sales/:id/items","type":1,"val":"id","end":""},{"old":"/api/v1/sales/:id/items","type":0,"val":"items","end":""}],
    types: placeholder as Registry['sales.store_item']['types'],
  },
  'sales.update_item': {
    methods: ["PATCH"],
    pattern: '/api/v1/sales/:id/items/:itemId',
    tokens: [{"old":"/api/v1/sales/:id/items/:itemId","type":0,"val":"api","end":""},{"old":"/api/v1/sales/:id/items/:itemId","type":0,"val":"v1","end":""},{"old":"/api/v1/sales/:id/items/:itemId","type":0,"val":"sales","end":""},{"old":"/api/v1/sales/:id/items/:itemId","type":1,"val":"id","end":""},{"old":"/api/v1/sales/:id/items/:itemId","type":0,"val":"items","end":""},{"old":"/api/v1/sales/:id/items/:itemId","type":1,"val":"itemId","end":""}],
    types: placeholder as Registry['sales.update_item']['types'],
  },
  'sales.destroy_item': {
    methods: ["DELETE"],
    pattern: '/api/v1/sales/:id/items/:itemId',
    tokens: [{"old":"/api/v1/sales/:id/items/:itemId","type":0,"val":"api","end":""},{"old":"/api/v1/sales/:id/items/:itemId","type":0,"val":"v1","end":""},{"old":"/api/v1/sales/:id/items/:itemId","type":0,"val":"sales","end":""},{"old":"/api/v1/sales/:id/items/:itemId","type":1,"val":"id","end":""},{"old":"/api/v1/sales/:id/items/:itemId","type":0,"val":"items","end":""},{"old":"/api/v1/sales/:id/items/:itemId","type":1,"val":"itemId","end":""}],
    types: placeholder as Registry['sales.destroy_item']['types'],
  },
  'sales.store_payment': {
    methods: ["POST"],
    pattern: '/api/v1/sales/:id/payments',
    tokens: [{"old":"/api/v1/sales/:id/payments","type":0,"val":"api","end":""},{"old":"/api/v1/sales/:id/payments","type":0,"val":"v1","end":""},{"old":"/api/v1/sales/:id/payments","type":0,"val":"sales","end":""},{"old":"/api/v1/sales/:id/payments","type":1,"val":"id","end":""},{"old":"/api/v1/sales/:id/payments","type":0,"val":"payments","end":""}],
    types: placeholder as Registry['sales.store_payment']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
