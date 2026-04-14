// هذه الدوال تفحص هوية الدور فقط.
export function isAdmin(user) {
  return user?.role === 'admin'
}

export function isGeneralSupervisor(user) {
  return user?.role === 'generalSupervisor'
}

export function isVillageSupervisor(user) {
  return user?.role === 'villageSupervisor'
}

export function isManagementUser(user) {
  return isAdmin(user) || isGeneralSupervisor(user) || isVillageSupervisor(user)
}
