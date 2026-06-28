/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.login': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth_validator').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth_validator').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['login']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['login']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.logout': {
    methods: ["POST"]
    pattern: '/api/v1/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['logout']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['logout']>>>
    }
  }
  'auth.change_password': {
    methods: ["POST"]
    pattern: '/api/v1/auth/change-password'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/auth_validator').changePasswordValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/auth_validator').changePasswordValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['changePassword']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['changePassword']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.me': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/auth/me'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['me']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth/auth_controller').default['me']>>>
    }
  }
  'users.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/user_validator').userFilterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.store': {
    methods: ["POST"]
    pattern: '/api/v1/users'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user_validator').createUserValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user_validator').createUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['show']>>>
    }
  }
  'users.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/users/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user_validator').updateUserValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/user_validator').updateUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users/users_controller').default['destroy']>>>
    }
  }
  'roles.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/role_validator').roleFilterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/roles/roles_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/roles/roles_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'roles.store': {
    methods: ["POST"]
    pattern: '/api/v1/roles'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/role_validator').createRoleValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/role_validator').createRoleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/roles/roles_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/roles/roles_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'roles.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/roles/roles_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/roles/roles_controller').default['show']>>>
    }
  }
  'roles.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/roles/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/role_validator').updateRoleValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/role_validator').updateRoleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/roles/roles_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/roles/roles_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'roles.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/roles/roles_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/roles/roles_controller').default['destroy']>>>
    }
  }
  'permissions.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/permissions'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/permission_validator').permissionFilterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/permissions/permissions_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/permissions/permissions_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'locations.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/locations'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/location_validator').locationFilterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/locations/locations_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/locations/locations_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'locations.store': {
    methods: ["POST"]
    pattern: '/api/v1/locations'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/location_validator').createLocationValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/location_validator').createLocationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/locations/locations_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/locations/locations_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'locations.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/locations/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/location_validator').updateLocationValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/location_validator').updateLocationValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/locations/locations_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/locations/locations_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'customers.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/customers'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/customer_validator').customerFilterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/customers/customers_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/customers/customers_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'customers.store': {
    methods: ["POST"]
    pattern: '/api/v1/customers'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/customer_validator').createCustomerValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/customer_validator').createCustomerValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/customers/customers_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/customers/customers_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'customers.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/customers/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/customers/customers_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/customers/customers_controller').default['show']>>>
    }
  }
  'customers.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/customers/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/customer_validator').updateCustomerValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/customer_validator').updateCustomerValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/customers/customers_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/customers/customers_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'customers.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/customers/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/customers/customers_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/customers/customers_controller').default['destroy']>>>
    }
  }
  'credit_payments.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/customers/:customerId/credit-payments'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { customerId: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/credit_payment_validator').creditPaymentFilterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/credit_payments/credit_payments_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/credit_payments/credit_payments_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'credit_payments.store': {
    methods: ["POST"]
    pattern: '/api/v1/customers/:customerId/credit-payments'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/credit_payment_validator').createCreditPaymentValidator)>>
      paramsTuple: [ParamValue]
      params: { customerId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/credit_payment_validator').createCreditPaymentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/credit_payments/credit_payments_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/credit_payments/credit_payments_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'uploads.image': {
    methods: ["POST"]
    pattern: '/api/v1/uploads/image'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/uploads/uploads_controller').default['image']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/uploads/uploads_controller').default['image']>>>
    }
  }
  'uploads.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/uploads/image'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/uploads/uploads_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/uploads/uploads_controller').default['destroy']>>>
    }
  }
  'taxes.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/taxes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/tax_validator').taxFilterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/taxes/taxes_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/taxes/taxes_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'taxes.store': {
    methods: ["POST"]
    pattern: '/api/v1/taxes'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/tax_validator').createTaxValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/tax_validator').createTaxValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/taxes/taxes_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/taxes/taxes_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'taxes.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/taxes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/taxes/taxes_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/taxes/taxes_controller').default['show']>>>
    }
  }
  'taxes.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/taxes/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/tax_validator').updateTaxValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/tax_validator').updateTaxValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/taxes/taxes_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/taxes/taxes_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'taxes.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/taxes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/taxes/taxes_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/taxes/taxes_controller').default['destroy']>>>
    }
  }
  'product_categories.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/product-categories'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/product_category_validator').productCategoryFilterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/product_categories_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/product_categories_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'product_categories.store': {
    methods: ["POST"]
    pattern: '/api/v1/product-categories'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/product_category_validator').createProductCategoryValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/product_category_validator').createProductCategoryValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/product_categories_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/product_categories_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'product_categories.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/product-categories/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/product_category_validator').updateProductCategoryValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/product_category_validator').updateProductCategoryValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/product_categories_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/product_categories_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'product_categories.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/product-categories/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/product_categories_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/product_categories_controller').default['destroy']>>>
    }
  }
  'products.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/products'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/product_validator').productFilterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'products.store': {
    methods: ["POST"]
    pattern: '/api/v1/products'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/product_validator').createProductValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/product_validator').createProductValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'products.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/products/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['show']>>>
    }
  }
  'products.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/products/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/product_validator').updateProductValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/product_validator').updateProductValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'products.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/products/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['destroy']>>>
    }
  }
  'products.store_variant': {
    methods: ["POST"]
    pattern: '/api/v1/products/:id/variants'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/product_validator').createVariantValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/product_validator').createVariantValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['storeVariant']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['storeVariant']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'products.update_variant': {
    methods: ["PATCH"]
    pattern: '/api/v1/products/:id/variants/:variantId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/product_validator').updateVariantValidator)>>
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; variantId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/product_validator').updateVariantValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['updateVariant']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['updateVariant']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'products.destroy_variant': {
    methods: ["DELETE"]
    pattern: '/api/v1/products/:id/variants/:variantId'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; variantId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['destroyVariant']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['destroyVariant']>>>
    }
  }
  'products.store_modifier': {
    methods: ["POST"]
    pattern: '/api/v1/products/:id/modifiers'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/product_validator').createModifierValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/product_validator').createModifierValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['storeModifier']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['storeModifier']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'products.update_modifier': {
    methods: ["PATCH"]
    pattern: '/api/v1/products/:id/modifiers/:modifierId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/product_validator').updateModifierValidator)>>
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; modifierId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/product_validator').updateModifierValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['updateModifier']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['updateModifier']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'products.destroy_modifier': {
    methods: ["DELETE"]
    pattern: '/api/v1/products/:id/modifiers/:modifierId'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; modifierId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['destroyModifier']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['destroyModifier']>>>
    }
  }
  'products.store_modifier_option': {
    methods: ["POST"]
    pattern: '/api/v1/products/:id/modifiers/:modifierId/options'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/product_validator').createModifierOptionValidator)>>
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; modifierId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/product_validator').createModifierOptionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['storeModifierOption']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['storeModifierOption']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'products.update_modifier_option': {
    methods: ["PATCH"]
    pattern: '/api/v1/products/:id/modifiers/:modifierId/options/:optionId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/product_validator').updateModifierOptionValidator)>>
      paramsTuple: [ParamValue, ParamValue, ParamValue]
      params: { id: ParamValue; modifierId: ParamValue; optionId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/product_validator').updateModifierOptionValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['updateModifierOption']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['updateModifierOption']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'products.destroy_modifier_option': {
    methods: ["DELETE"]
    pattern: '/api/v1/products/:id/modifiers/:modifierId/options/:optionId'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue, ParamValue]
      params: { id: ParamValue; modifierId: ParamValue; optionId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['destroyModifierOption']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/products/products_controller').default['destroyModifierOption']>>>
    }
  }
  'tables.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/tables'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/table_validator').tableFilterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tables/tables_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tables/tables_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'tables.store': {
    methods: ["POST"]
    pattern: '/api/v1/tables'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/table_validator').createTableValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/table_validator').createTableValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tables/tables_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tables/tables_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'tables.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/tables/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tables/tables_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tables/tables_controller').default['show']>>>
    }
  }
  'tables.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/tables/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/table_validator').updateTableValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/table_validator').updateTableValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tables/tables_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tables/tables_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'tables.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/tables/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/tables/tables_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/tables/tables_controller').default['destroy']>>>
    }
  }
  'discounts.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/discounts'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/discount_validator').discountFilterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/discounts/discounts_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/discounts/discounts_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'discounts.store': {
    methods: ["POST"]
    pattern: '/api/v1/discounts'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/discount_validator').createDiscountValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/discount_validator').createDiscountValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/discounts/discounts_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/discounts/discounts_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'discounts.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/discounts/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/discounts/discounts_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/discounts/discounts_controller').default['show']>>>
    }
  }
  'discounts.update': {
    methods: ["PATCH"]
    pattern: '/api/v1/discounts/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/discount_validator').updateDiscountValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/discount_validator').updateDiscountValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/discounts/discounts_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/discounts/discounts_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'discounts.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/discounts/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/discounts/discounts_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/discounts/discounts_controller').default['destroy']>>>
    }
  }
  'discounts.validate': {
    methods: ["POST"]
    pattern: '/api/v1/discounts/validate-code'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/discounts/discounts_controller').default['validate']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/discounts/discounts_controller').default['validate']>>>
    }
  }
  'sales.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/sales'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/sale_validator').saleFilterValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'sales.store': {
    methods: ["POST"]
    pattern: '/api/v1/sales'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/sale_validator').createSaleValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/sale_validator').createSaleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'sales.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/sales/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['show']>>>
    }
  }
  'sales.void': {
    methods: ["POST"]
    pattern: '/api/v1/sales/:id/void'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/sale_validator').voidSaleValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/sale_validator').voidSaleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['void']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['void']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'sales.complete': {
    methods: ["POST"]
    pattern: '/api/v1/sales/:id/complete'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['complete']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['complete']>>>
    }
  }
  'sales.apply_discount': {
    methods: ["POST"]
    pattern: '/api/v1/sales/:id/apply-discount'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/sale_validator').applyDiscountValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/sale_validator').applyDiscountValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['applyDiscount']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['applyDiscount']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'sales.store_item': {
    methods: ["POST"]
    pattern: '/api/v1/sales/:id/items'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/sale_validator').addSaleItemValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/sale_validator').addSaleItemValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['storeItem']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['storeItem']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'sales.update_item': {
    methods: ["PATCH"]
    pattern: '/api/v1/sales/:id/items/:itemId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/sale_validator').updateSaleItemValidator)>>
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; itemId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/sale_validator').updateSaleItemValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['updateItem']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['updateItem']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'sales.destroy_item': {
    methods: ["DELETE"]
    pattern: '/api/v1/sales/:id/items/:itemId'
    types: {
      body: {}
      paramsTuple: [ParamValue, ParamValue]
      params: { id: ParamValue; itemId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['destroyItem']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['destroyItem']>>>
    }
  }
  'sales.store_payment': {
    methods: ["POST"]
    pattern: '/api/v1/sales/:id/payments'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/sale_validator').addPaymentValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/sale_validator').addPaymentValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['storePayment']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales/sales_controller').default['storePayment']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
}
