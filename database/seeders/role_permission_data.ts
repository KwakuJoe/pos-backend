// ─────────────────────────────────────────────────────────────
// POS Backend — Roles & Permissions seed data
// Permissions use module.action format (matches middleware usage)
// ─────────────────────────────────────────────────────────────

// ── Roles ─────────────────────────────────────────────────────
export const roleData = [
  {
    name: 'Owner',
    key: 'owner',
    description: 'Business owner with unrestricted access to all features',
    isSystem: true,
    hasFullAccess: true,
  },
  {
    name: 'Admin',
    key: 'admin',
    description: 'Administrator with unrestricted access to all features',
    isSystem: true,
    hasFullAccess: true,
  },
  {
    name: 'Manager',
    key: 'manager',
    description: 'Manager with broad operational access',
    isSystem: true,
    hasFullAccess: false,
  },
  {
    name: 'Cashier',
    key: 'cashier',
    description: 'Cashier with point-of-sale access only',
    isSystem: true,
    hasFullAccess: false,
  },
]

// ── Permissions ───────────────────────────────────────────────
export const permissionData = [
  // users
  { name: 'users.view', module: 'users', description: 'View user accounts' },
  { name: 'users.manage', module: 'users', description: 'Create, update, and deactivate users' },

  // roles
  { name: 'roles.view', module: 'roles', description: 'View roles and their permission sets' },
  { name: 'roles.manage', module: 'roles', description: 'Create, update, and delete custom roles' },

  // locations
  { name: 'locations.view', module: 'locations', description: 'View locations' },
  { name: 'locations.manage', module: 'locations', description: 'Create and update locations' },

  // products
  { name: 'products.view', module: 'products', description: 'View products and catalog' },
  { name: 'products.create', module: 'products', description: 'Add new products to the catalog' },
  { name: 'products.update', module: 'products', description: 'Edit product details and pricing' },
  { name: 'products.delete', module: 'products', description: 'Remove products from the catalog' },

  // inventory
  { name: 'inventory.view', module: 'inventory', description: 'View inventory levels across locations' },
  { name: 'inventory.adjust', module: 'inventory', description: 'Adjust inventory quantities manually' },
  { name: 'inventory.transfer', module: 'inventory', description: 'Transfer stock between locations' },

  // sales
  { name: 'sales.view', module: 'sales', description: 'View sales transactions and history' },
  { name: 'sales.create', module: 'sales', description: 'Process sales at the point of sale' },
  { name: 'sales.refund', module: 'sales', description: 'Process refunds on completed sales' },
  { name: 'sales.void', module: 'sales', description: 'Void transactions before completion' },

  // kitchen
  { name: 'kitchen.manage', module: 'kitchen', description: 'Update kitchen item statuses on the KDS' },

  // reservations
  { name: 'reservations.view', module: 'reservations', description: 'View reservations and booking schedule' },
  { name: 'reservations.manage', module: 'reservations', description: 'Create, update, confirm, and cancel reservations' },

  // discounts
  { name: 'discounts.apply', module: 'discounts', description: 'Apply discounts during a sale' },
  { name: 'discounts.manage', module: 'discounts', description: 'Create and manage discount rules' },

  // tables
  { name: 'tables.view', module: 'tables', description: 'View tables and their status' },
  { name: 'tables.manage', module: 'tables', description: 'Create, update, and delete tables' },

  // customers
  { name: 'customers.view', module: 'customers', description: 'View customer profiles and history' },
  { name: 'customers.manage', module: 'customers', description: 'Create and update customer records' },

  // reports
  { name: 'reports.view', module: 'reports', description: 'View sales reports and analytics' },

  // taxes
  { name: 'taxes.manage', module: 'taxes', description: 'Create, update, and manage tax rates' },

  // appointments
  { name: 'appointments.view', module: 'appointments', description: 'View appointment schedule and walk-in queue' },
  { name: 'appointments.manage', module: 'appointments', description: 'Create, confirm, start, and cancel appointments' },

  // settings
  { name: 'settings.manage', module: 'settings', description: 'Manage business settings and configuration' },
]

// ── Role → Permission mapping ──────────────────────────────────
// Owner and Admin have hasFullAccess: true — they bypass permission
// checks entirely, so listing permissions here has no effect.
// Included for documentation purposes only.
export const rolePermissionMap: Record<string, string[]> = {
  owner: [], // hasFullAccess — all permissions implicitly granted
  admin: [], // hasFullAccess — all permissions implicitly granted

  manager: [
    // staff & configuration (read-only)
    'users.view',
    'roles.view',
    'locations.view',
    // products (full)
    'products.view',
    'products.create',
    'products.update',
    // inventory (full operational)
    'inventory.view',
    'inventory.adjust',
    'inventory.transfer',
    // sales (full operational)
    'sales.view',
    'sales.create',
    'sales.refund',
    'sales.void',
    // kitchen
    'kitchen.manage',
    // reservations (full)
    'reservations.view',
    'reservations.manage',
    // discounts (full)
    'discounts.apply',
    'discounts.manage',
    // tables (full)
    'tables.view',
    'tables.manage',
    // customers (full)
    'customers.view',
    'customers.manage',
    // taxes
    'taxes.manage',
    // reports
    'reports.view',
    // appointments
    'appointments.view',
    'appointments.manage',
  ],

  cashier: [
    'products.view',
    'inventory.view',
    'sales.view',
    'sales.create',
    'discounts.apply',
    'tables.view',
    'customers.view',
    'reservations.view',
    'appointments.view',
  ],
}
