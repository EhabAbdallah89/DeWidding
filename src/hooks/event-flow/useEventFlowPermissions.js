import { canAddEvent, canManageUsers } from '../../utils/permissions'

// هذه الدالة تحسب صلاحيات الواجهة الحالية فقط.
export function useEventFlowPermissions(store) {
  return {
    canAdd: canAddEvent(store.currentUser, store.selectedVillage),
    canManageUsers: canManageUsers(store.currentUser),
  }
}
