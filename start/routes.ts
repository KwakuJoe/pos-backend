import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth/auth_controller')
const UsersController = () => import('#controllers/users/users_controller')
const RolesController = () => import('#controllers/roles/roles_controller')
const PermissionsController = () => import('#controllers/permissions/permissions_controller')
const LocationsController = () => import('#controllers/locations/locations_controller')
const CustomersController = () => import('#controllers/customers/customers_controller')
const CreditPaymentsController = () => import('#controllers/credit_payments/credit_payments_controller')
const TaxesController = () => import('#controllers/taxes/taxes_controller')
const ProductCategoriesController = () => import('#controllers/products/product_categories_controller')
const ProductsController = () => import('#controllers/products/products_controller')
const UploadsController = () => import('#controllers/uploads/uploads_controller')
const TablesController = () => import('#controllers/tables/tables_controller')
const DiscountsController = () => import('#controllers/discounts/discounts_controller')
const SalesController = () => import('#controllers/sales/sales_controller')

router
  .group(() => {
    // ── Public auth ──────────────────────────────────────────────────
    router.post('/auth/login', [AuthController, 'login']).use(middleware.throttle())

    // ── Auth-only (no mustChangePassword guard) ──────────────────────
    router
      .group(() => {
        router.post('/auth/logout', [AuthController, 'logout'])
        router.post('/auth/change-password', [AuthController, 'changePassword'])
      })
      .use(middleware.auth())

    // ── Auth + mustChangePassword guard ──────────────────────────────
    router
      .group(() => {
        router.get('/auth/me', [AuthController, 'me'])

        // Users
        router.get('/users', [UsersController, 'index']).use(middleware.can(['users.view']))
        router.post('/users', [UsersController, 'store']).use(middleware.can(['users.manage']))
        router.get('/users/:id', [UsersController, 'show']).use(middleware.can(['users.view']))
        router.patch('/users/:id', [UsersController, 'update']).use(middleware.can(['users.manage']))
        router.delete('/users/:id', [UsersController, 'destroy']).use(middleware.can(['users.manage']))

        // Roles
        router.get('/roles', [RolesController, 'index']).use(middleware.can(['roles.view']))
        router.post('/roles', [RolesController, 'store']).use(middleware.can(['roles.manage']))
        router.get('/roles/:id', [RolesController, 'show']).use(middleware.can(['roles.view']))
        router.patch('/roles/:id', [RolesController, 'update']).use(middleware.can(['roles.manage']))
        router.delete('/roles/:id', [RolesController, 'destroy']).use(middleware.can(['roles.manage']))

        // Permissions (read-only, only users who can view/manage roles need this)
        router.get('/permissions', [PermissionsController, 'index']).use(middleware.can(['roles.view']))

        // Locations
        router.get('/locations', [LocationsController, 'index']).use(middleware.can(['locations.view']))
        router.post('/locations', [LocationsController, 'store']).use(middleware.can(['locations.manage']))
        router.patch('/locations/:id', [LocationsController, 'update']).use(middleware.can(['locations.manage']))

        // Customers
        router.get('/customers', [CustomersController, 'index']).use(middleware.can(['customers.view']))
        router.post('/customers', [CustomersController, 'store']).use(middleware.can(['customers.manage']))
        router.get('/customers/:id', [CustomersController, 'show']).use(middleware.can(['customers.view']))
        router.patch('/customers/:id', [CustomersController, 'update']).use(middleware.can(['customers.manage']))
        router.delete('/customers/:id', [CustomersController, 'destroy']).use(middleware.can(['customers.manage']))

        // Credit payments (nested under customer)
        router.get('/customers/:customerId/credit-payments', [CreditPaymentsController, 'index']).use(middleware.can(['customers.view']))
        router.post('/customers/:customerId/credit-payments', [CreditPaymentsController, 'store']).use(middleware.can(['customers.manage']))

        // Uploads
        router.post('/uploads/image', [UploadsController, 'image'])
        router.delete('/uploads/image', [UploadsController, 'destroy'])

        // Taxes
        router.get('/taxes', [TaxesController, 'index']).use(middleware.can(['taxes.manage']))
        router.post('/taxes', [TaxesController, 'store']).use(middleware.can(['taxes.manage']))
        router.get('/taxes/:id', [TaxesController, 'show']).use(middleware.can(['taxes.manage']))
        router.patch('/taxes/:id', [TaxesController, 'update']).use(middleware.can(['taxes.manage']))
        router.delete('/taxes/:id', [TaxesController, 'destroy']).use(middleware.can(['taxes.manage']))

        // Product categories
        router.get('/product-categories', [ProductCategoriesController, 'index']).use(middleware.can(['products.view']))
        router.post('/product-categories', [ProductCategoriesController, 'store']).use(middleware.can(['products.create']))
        router.patch('/product-categories/:id', [ProductCategoriesController, 'update']).use(middleware.can(['products.update']))
        router.delete('/product-categories/:id', [ProductCategoriesController, 'destroy']).use(middleware.can(['products.delete']))

        // Products
        router.get('/products', [ProductsController, 'index']).use(middleware.can(['products.view']))
        router.post('/products', [ProductsController, 'store']).use(middleware.can(['products.create']))
        router.get('/products/:id', [ProductsController, 'show']).use(middleware.can(['products.view']))
        router.patch('/products/:id', [ProductsController, 'update']).use(middleware.can(['products.update']))
        router.delete('/products/:id', [ProductsController, 'destroy']).use(middleware.can(['products.delete']))

        // Product variants (nested under product)
        router.post('/products/:id/variants', [ProductsController, 'storeVariant']).use(middleware.can(['products.update']))
        router.patch('/products/:id/variants/:variantId', [ProductsController, 'updateVariant']).use(middleware.can(['products.update']))
        router.delete('/products/:id/variants/:variantId', [ProductsController, 'destroyVariant']).use(middleware.can(['products.update']))

        // Product modifiers (nested under product)
        router.post('/products/:id/modifiers', [ProductsController, 'storeModifier']).use(middleware.can(['products.update']))
        router.patch('/products/:id/modifiers/:modifierId', [ProductsController, 'updateModifier']).use(middleware.can(['products.update']))
        router.delete('/products/:id/modifiers/:modifierId', [ProductsController, 'destroyModifier']).use(middleware.can(['products.update']))

        // Modifier options (nested under product modifier)
        router.post('/products/:id/modifiers/:modifierId/options', [ProductsController, 'storeModifierOption']).use(middleware.can(['products.update']))
        router.patch('/products/:id/modifiers/:modifierId/options/:optionId', [ProductsController, 'updateModifierOption']).use(middleware.can(['products.update']))
        router.delete('/products/:id/modifiers/:modifierId/options/:optionId', [ProductsController, 'destroyModifierOption']).use(middleware.can(['products.update']))

        // Tables
        router.get('/tables', [TablesController, 'index']).use(middleware.can(['tables.view']))
        router.post('/tables', [TablesController, 'store']).use(middleware.can(['tables.manage']))
        router.get('/tables/:id', [TablesController, 'show']).use(middleware.can(['tables.view']))
        router.patch('/tables/:id', [TablesController, 'update']).use(middleware.can(['tables.manage']))
        router.delete('/tables/:id', [TablesController, 'destroy']).use(middleware.can(['tables.manage']))

        // Discounts
        router.get('/discounts', [DiscountsController, 'index']).use(middleware.can(['discounts.manage']))
        router.post('/discounts', [DiscountsController, 'store']).use(middleware.can(['discounts.manage']))
        router.get('/discounts/:id', [DiscountsController, 'show']).use(middleware.can(['discounts.manage']))
        router.patch('/discounts/:id', [DiscountsController, 'update']).use(middleware.can(['discounts.manage']))
        router.delete('/discounts/:id', [DiscountsController, 'destroy']).use(middleware.can(['discounts.manage']))
        router.post('/discounts/validate-code', [DiscountsController, 'validate']).use(middleware.can(['discounts.apply']))

        // Sales
        router.get('/sales', [SalesController, 'index']).use(middleware.can(['sales.view']))
        router.post('/sales', [SalesController, 'store']).use(middleware.can(['sales.create']))
        router.get('/sales/:id', [SalesController, 'show']).use(middleware.can(['sales.view']))
        router.post('/sales/:id/void', [SalesController, 'void']).use(middleware.can(['sales.void']))
        router.post('/sales/:id/complete', [SalesController, 'complete']).use(middleware.can(['sales.create']))
        router.post('/sales/:id/apply-discount', [SalesController, 'applyDiscount']).use(middleware.can(['discounts.apply']))

        // Sale items (nested under sale)
        router.post('/sales/:id/items', [SalesController, 'storeItem']).use(middleware.can(['sales.create']))
        router.patch('/sales/:id/items/:itemId', [SalesController, 'updateItem']).use(middleware.can(['sales.create']))
        router.delete('/sales/:id/items/:itemId', [SalesController, 'destroyItem']).use(middleware.can(['sales.create']))

        // Sale payments (nested under sale)
        router.post('/sales/:id/payments', [SalesController, 'storePayment']).use(middleware.can(['sales.create']))
      })
      .use([middleware.auth(), middleware.mustChangePassword()])
  })
  .prefix('/api/v1')
