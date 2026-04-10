export function canSeeManagementActions(user) {
  return user.role === 'admin' || user.role === 'generalSupervisor'
}

export function canAddEvent(user) {
  return (
    user.role === 'admin' ||
    user.role === 'generalSupervisor' ||
    user.role === 'villageSupervisor' ||
    user.role === 'eventCreator'
  )
}

export function canEditEvent(user, event) {
  if (user.role === 'admin') return true
  if (user.role === 'generalSupervisor') return true

  if (
    user.role === 'villageSupervisor' &&
    user.village === event.village
  ) {
    return true
  }

  if (user.id === event.createdByUserId) {
    return true
  }

  return false
}

export function canDeleteEvent(user, event) {
  return canEditEvent(user, event)
}

export function canViewEvent(user, event) {
  if (canSeeManagementActions(user)) return true

  if (
    user.role === 'villageSupervisor' &&
    user.village === event.village
  ) {
    return true
  }

  if (user.id === event.createdByUserId) {
    return true
  }

  return event.status === 'approved'
}
