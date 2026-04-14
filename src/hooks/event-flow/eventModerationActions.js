import {
  canApproveEvent,
  canRejectEvent,
} from '../../utils/permissions'

// هذه الدالة تجمع عمليات الموافقة والرفض.
export function createEventModerationActions({
  store,
  patchEvents,
  writeNotice,
}) {
  const updateStatus = (eventId, status) => {
    patchEvents(
      store.events.map((item) =>
        item.id === eventId ? { ...item, status } : item
      )
    )
  }

  const approveEvent = (eventId) => {
    const targetEvent = store.events.find((item) => item.id === eventId)
    if (canApproveEvent(store.currentUser, targetEvent)) {
      updateStatus(eventId, 'approved')
      writeNotice('', 'تمت الموافقة على الحدث')
    }
  }

  const rejectEvent = (eventId) => {
    const targetEvent = store.events.find((item) => item.id === eventId)
    if (canRejectEvent(store.currentUser, targetEvent)) {
      updateStatus(eventId, 'rejected')
      writeNotice('', 'تم رفض الحدث')
    }
  }

  return {
    approveEvent,
    rejectEvent,
  }
}