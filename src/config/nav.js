import { canManageUsers, isManagementUser } from '../utils/permissions'

// هذه الدالة تبني عناصر القائمة الجانبية حسب نوع المستخدم.
export function getNavItems(user) {
  const baseItems = [
    { key: 'dashboard', label: 'الرئيسية' },
    { key: 'myEvents', label: 'أعراسي' },
    { key: 'profile', label: 'الملف الشخصي' },
  ]

  if (!isManagementUser(user)) {
    return baseItems
  }

  const managementItems = [
    { key: 'dashboard', label: 'لوحة التحكم' },
    { key: 'myEvents', label: 'أعراسي' },
    { key: 'profile', label: 'الملف الشخصي' },
  ]

  return canManageUsers(user)
    ? [...managementItems, { key: 'users', label: 'المستخدمون' }]
    : managementItems
}
