export function isManagementUser(user) {
  return user?.role === 'admin' || user?.role === 'supervisor'
}

export function isAdmin(user) {
  return user?.role === 'admin'
}

export function canAddEvent(user, selectedVillage) {
  if (!user) return false
  if (user.role === 'admin') return true
  return user.village === selectedVillage
}

export function getNewEventStatus(user, selectedVillage) {
  if (user.role === 'admin') return 'approved'
  if (user.role === 'supervisor' && user.village === selectedVillage) return 'approved'
  return 'pending'
}

export function canApproveEvent(user, event) {
  if (!user) return false
  if (user.role === 'admin') return true
  if (user.role === 'supervisor' && user.village === event.village) return true
  return false
}

export function canRejectEvent(user, event) {
  return canApproveEvent(user, event)
}

export function canEditEvent(user, event) {
  if (!user) return false
  if (user.role === 'admin') return true
  if (user.role === 'supervisor' && user.village === event.village) return true
  if (user.id === event.createdByUserId) return true
  return false
}

export function canDeleteEvent(user, event) {
  return canEditEvent(user, event)
}

export function canViewEvent(user, event) {
  if (!user) return event.status === 'approved'
  if (user.role === 'admin') return true
  if (user.role === 'supervisor' && user.village === event.village) return true
  if (user.id === event.createdByUserId) return true
  return event.status === 'approved'
}

export function canManageUsers(user) {
  return isAdmin(user)
}

export function canViewCreatedBy(user) {
  return isAdmin(user)
}
