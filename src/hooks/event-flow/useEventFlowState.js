import { useState } from 'react'
import { emptyEvent, emptyNotice, emptyProfileForm } from './eventConstants'

// هذه الدالة تجمع الحالات المحلية لمسار الأحداث والملف الشخصي.
export function useEventFlowState() {
  const [showEventForm, setShowEventForm] = useState(false)
  const [eventForm, setEventForm] = useState(emptyEvent)
  const [profileForm, setProfileForm] = useState(emptyProfileForm)
  const [notice, setNotice] = useState(emptyNotice)

  return {
    showEventForm,
    setShowEventForm,
    eventForm,
    setEventForm,
    profileForm,
    setProfileForm,
    notice,
    setNotice,
  }
}
