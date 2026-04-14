import { isAdmin } from './roleChecks'

// هذه الدوال تفحص صلاحيات المستخدمين والإدارة.
export function canManageUsers(user) {
  return isAdmin(user)
}
