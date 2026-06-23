import type User from '#models/user'

export async function userCan(user: User, permissionName: string): Promise<boolean> {
  // Per-user override takes precedence
  if (user.permissionsOverride?.[permissionName] !== undefined) {
    return user.permissionsOverride[permissionName]
  }

  // Load role with its permissions (Lucid caches once preloaded on the instance)
  const role = await user.related('role').query().preload('permissions').firstOrFail()

  // Full-access roles bypass all permission checks
  if (role.hasFullAccess) return true

  return role.permissions.some((p) => p.name === permissionName)
}
