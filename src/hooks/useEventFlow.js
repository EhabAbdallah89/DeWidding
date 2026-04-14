import { villages } from '../data/seedData'
import { createEventActions } from './event-flow/eventActions'
import { useEventCollections } from './event-flow/useEventCollections'
import { useEventFlowPermissions } from './event-flow/useEventFlowPermissions'
import { useEventFlowResets } from './event-flow/useEventFlowResets'
import { useEventFlowState } from './event-flow/useEventFlowState'
import { emptyEvent } from './event-flow/eventConstants'

// هذا المسار مسؤول عن إدارة الأحداث والملف الشخصي والإشعارات.
// تم تقسيمه إلى: حالات + صلاحيات + قوائم مشتقة + عمليات إعادة ضبط + Handlers.
export function useEventFlow(store) {
  // ==============================
  // الحالات الأساسية (useState)
  // ==============================
  const state = useEventFlowState()

  // ==============================
  // القوائم المشتقة (useMemo)
  // ==============================
  const collections = useEventCollections(store)

  // ==============================
  // الصلاحيات
  // ==============================
  const permissions = useEventFlowPermissions(store)

  // ==============================
  // مزامنة الرسائل (useEffect)
  // ==============================
  useEventFlowResets(store, state.setNotice)

  // ==============================
  // الإجراءات / Handlers
  // ==============================
  const actions = createEventActions({
    store,
    eventForm: state.eventForm,
    setEventForm: state.setEventForm,
    setShowEventForm: state.setShowEventForm,
    profileForm: state.profileForm,
    setProfileForm: state.setProfileForm,
    setNotice: state.setNotice,
    emptyEvent,
  })

  return {
    villages,
    eventForm: state.eventForm,
    setEventForm: state.setEventForm,
    profileForm: state.profileForm,
    setProfileForm: state.setProfileForm,
    notice: state.notice,
    setNotice: state.setNotice,
    showEventForm: state.showEventForm,
    setShowEventForm: state.setShowEventForm,
    ...collections,
    ...permissions,
    ...actions,
    saveProfile: () => actions.saveProfileFromForm(state.profileForm),
  }
}
