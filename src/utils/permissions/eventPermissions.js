import { isAdmin, isGeneralSupervisor, isVillageSupervisor } from './roleChecks'

// هذه الدوال تفحص صلاحيات الأحداث.
export function canAddEvent(user, selectedVillage) {
  if (!user || !selectedVillage) return false
  if (isAdmin(user) || isGeneralSupervisor(user)) return true
  if (isVillageSupervisor(user)) return user.village === selectedVillage
  return user.role === 'regular' && user.village === selectedVillage
}

export function getNewEventStatus(user, selectedVillage) {
  if (isAdmin(user) || isGeneralSupervisor(user)) return 'approved'
  if (isVillageSupervisor(user) && user.village === selectedVillage) return 'approved'
  return 'pending'
}

export function canApproveEvent(user, event) {
  if (!user) return false
  if (isAdmin(user) || isGeneralSupervisor(user)) return true
  if (isVillageSupervisor(user) && user.village === event.village) return true
  return false
}

export function canRejectEvent(user, event) {
  return canApproveEvent(user, event)
}

export function canEditEvent(user, event) {
  if (!user) return false
  if (isAdmin(user) || isGeneralSupervisor(user)) return true
  if (isVillageSupervisor(user) && user.village === event.village) return true
  if (user.id === event.createdByUserId) return true
  return false
}

export function canDeleteEvent(user, event) {
  return canEditEvent(user, event)
}

export function canViewEvent(user, event) {
  if (!user) return event.status === 'approved'
  if (isAdmin(user) || isGeneralSupervisor(user)) return true
  if (isVillageSupervisor(user) && user.village === event.village) return true
  if (user.id === event.createdByUserId) return true
  return event.status === 'approved'
}
