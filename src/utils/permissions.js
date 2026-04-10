export function isManagementUser(user){ return user?.role==='admin' || user?.role==='generalSupervisor' || user?.role==='villageSupervisor' }
export function canAddEvent(user, selectedVillage){
  if(!user) return false
  if(user.role==='admin') return true
  if(user.role==='generalSupervisor') return true
  if(user.role==='villageSupervisor') return user.village===selectedVillage
  if(user.role==='regular') return user.village===selectedVillage
  return false
}
export function getNewEventStatus(user, selectedVillage){
  if(user.role==='admin') return 'approved'
  if(user.role==='generalSupervisor') return 'approved'
  if(user.role==='villageSupervisor' && user.village===selectedVillage) return 'approved'
  return 'pending'
}
export function canApproveEvent(user, event){
  if(!user) return false
  if(user.role==='admin') return true
  if(user.role==='generalSupervisor') return true
  if(user.role==='villageSupervisor' && user.village===event.village) return true
  return false
}
export function canRejectEvent(user, event){ return canApproveEvent(user, event) }
export function canEditEvent(user, event){
  if(!user) return false
  if(user.role==='admin') return true
  if(user.role==='generalSupervisor') return true
  if(user.role==='villageSupervisor' && user.village===event.village) return true
  if(user.id===event.createdByUserId) return true
  return false
}
export function canDeleteEvent(user, event){ return canEditEvent(user, event) }
export function canViewEvent(user, event){
  if(!user) return event.status==='approved'
  if(user.role==='admin') return true
  if(user.role==='generalSupervisor') return true
  if(user.role==='villageSupervisor' && user.village===event.village) return true
  if(user.id===event.createdByUserId) return true
  return event.status==='approved'
}
