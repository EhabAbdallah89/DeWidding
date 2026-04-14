import { isAdmin, isManagementUser } from './roleChecks'

// هذه الدالة تحدد الصفحات المسموحة حسب الدور.
export function getAllowedPages(user) {
  if (!user) return ['auth']
  if (isAdmin(user)) return ['dashboard', 'pending', 'users', 'myEvents', 'profile', 'changePhone']
  if (isManagementUser(user)) return ['dashboard', 'pending', 'myEvents', 'profile', 'changePhone']
  return ['dashboard', 'myEvents', 'profile', 'changePhone']
}
