import { useEffect, useState } from 'react'
import { villages } from '../data/seedData'
import { canAddEvent, canManageUsers } from '../utils/permissions'
import { createEventActions } from './event-flow/eventActions'
import { emptyEvent, emptyNotice, emptyProfileForm } from './event-flow/eventConstants'
import { useEventCollections } from './event-flow/useEventCollections'
import { useNoticeReset } from './event-flow/useNoticeReset'

// هذا المسار مسؤول عن إدارة الأحداث والملف الشخصي والإشعارات.
// تم تقسيمه إلى: حالات + مجموعات مشتقة + إجراءات منفصلة.
export function useEventFlow(store) {
  // ==============================
  // الحالات الأساسية (useState)
  // ==============================
  const [showEventForm, setShowEventForm] = useState(false)
  const [eventForm, setEventForm] = useState(emptyEvent)
  const [profileForm, setProfileForm] = useState(emptyProfileForm)
  const [notice, setNotice] = useState(emptyNotice)

  // ==============================
  // القوائم المشتقة (useMemo داخل Hook منفصل)
  // ==============================
  const { dashboard, pending, myEvents, counts } = useEventCollections(store)

  // ==============================
  // مزامنة الرسائل (useEffect داخل Hook منفصل)
  // ==============================
  useNoticeReset(store.selectedVillage, setNotice)
useEffect(() => {
  setNotice(emptyNotice)
}, [store.currentPage, setNotice])
  // ==============================
  // الإجراءات / Handlers
  // ==============================
 const actions = createEventActions({
  store,
  eventForm,
  setEventForm,
  setShowEventForm,
  profileForm,
  setProfileForm,
  setNotice,
  emptyEvent,
})

  return {
    villages,
    eventForm,
    setEventForm,
    profileForm,
    setProfileForm,
    notice,
    setNotice,
    dashboard,
    pending,
    myEvents,
    counts,
    canAdd: canAddEvent(store.currentUser, store.selectedVillage),
    canManageUsers: canManageUsers(store.currentUser),
    showEventForm,
    setShowEventForm,
    ...actions,
    saveProfile: () => actions.saveProfileFromForm(profileForm),
    
  }
}
