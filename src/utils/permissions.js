// أدوات الصلاحيات والأدوار داخل التطبيق.

export function isManagementUser(user) {
  return user?.role === 'admin' || user?.role === 'generalSupervisor' || user?.role === 'villageSupervisor'
}

export function isAdmin(user) {
  return user?.role === 'admin'
}

export function canManageUsers(user) {
  return isAdmin(user)
}

export function canAddEvent(user, selectedVillage) {
  if (!user || !selectedVillage) return false

  if (user.role === 'admin' || user.role === 'generalSupervisor') {
    return true
  }

  if (user.role === 'villageSupervisor') {
    return user.village === selectedVillage
  }

  return user.role === 'regular' && user.village === selectedVillage
}

export function getNewEventStatus(user, selectedVillage) {
  if (user.role === 'admin') return 'approved'
  if (user.role === 'generalSupervisor') return 'approved'
  if (user.role === 'villageSupervisor' && user.village === selectedVillage) return 'approved'
  return 'pending'
}

export function canApproveEvent(user, event) {
  if (!user) return false
  if (user.role === 'admin') return true
  if (user.role === 'generalSupervisor') return true
  if (user.role === 'villageSupervisor' && user.village === event.village) return true
  return false
}

export function canRejectEvent(user, event) {
  return canApproveEvent(user, event)
}

export function canEditEvent(user, event) {
  if (!user) return false
  if (user.role === 'admin') return true
  if (user.role === 'generalSupervisor') return true
  if (user.role === 'villageSupervisor' && user.village === event.village) return true
  if (user.id === event.createdByUserId) return true
  return false
}

export function canDeleteEvent(user, event) {
  return canEditEvent(user, event)
}

export function canViewEvent(user, event) {
  if (!user) return event.status === 'approved'
  if (user.role === 'admin') return true
  if (user.role === 'generalSupervisor') return true
  if (user.role === 'villageSupervisor' && user.village === event.village) return true
  if (user.id === event.createdByUserId) return true
  return event.status === 'approved'
}

// الصفحات المسموحة حسب الدور.
export function getAllowedPages(user) {
  if (!user) return ['auth']
  if (user.role === 'admin') return ['dashboard', 'pending', 'users', 'myEvents', 'profile', 'changePhone']
  if (isManagementUser(user)) return ['dashboard', 'pending', 'myEvents', 'profile', 'changePhone']
  return ['dashboard', 'myEvents', 'profile', 'changePhone']
}

export function getRoleLabel(role) {
  if (role === 'admin') return 'مدير'
  if (role === 'generalSupervisor') return 'مشرف عام'
  if (role === 'villageSupervisor') return 'مشرف قرية'
  if (role === 'regular') return 'مستخدم'
  return role
}
