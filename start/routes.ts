import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthController = () => import('#controllers/auth/auth_controller')
const UsersController = () => import('#controllers/users/users_controller')
const RolesController = () => import('#controllers/roles/roles_controller')
const PermissionsController = () => import('#controllers/permissions/permissions_controller')
const LocationsController = () => import('#controllers/locations/locations_controller')
const CustomersController = () => import('#controllers/customers/customers_controller')
const CreditPaymentsController = () => import('#controllers/credit_payments/credit_payments_controller')

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
      })
      .use([middleware.auth(), middleware.mustChangePassword()])
  })
  .prefix('/api/v1')
