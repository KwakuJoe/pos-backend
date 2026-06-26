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
}
