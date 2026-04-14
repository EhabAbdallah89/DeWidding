import { Event } from '../../models/Event'
import { validateEventForm } from '../../utils/eventUtils'
import {
  canDeleteEvent,
  canEditEvent,
  getNewEventStatus,
} from '../../utils/permissions'

// هذه الدالة تجمع عمليات إنشاء وتعديل وحذف الحدث.
export function createEventCrudActions({
  store,
  eventForm,
  setEventForm,
  setShowEventForm,
  emptyEvent,
  patchUsers,
  patchEvents,
  writeNotice,
}) {
  const addEvent = () => {
    const error = validateEventForm(eventForm, store.selectedVillage, store.currentUser)
    if (error) {
      writeNotice(error)
      return
    }

    const event = Event.create({
      ...eventForm,
      village: store.selectedVillage,
      title: `${eventForm.groom} / ${eventForm.bride}`,
      createdByUserId: store.currentUser.id,
      status: getNewEventStatus(store.currentUser, store.selectedVillage),
    }).toJSON()

    patchEvents([...store.events, event])
    patchUsers(
      store.users.map((user) =>
        user.id === store.currentUser.id
          ? { ...user, myEvents: [...new Set([...user.myEvents, event.id])] }
          : user
      )
    )

    setEventForm(emptyEvent)
    setShowEventForm(false)
    writeNotice('', 'تم إرسال الحدث وسيتم فحصه من الإدارة')
  }

  const updateEvent = (eventId, draft) => {
    const sourceEvent = store.events.find((item) => item.id === eventId)

    if (!sourceEvent || !canEditEvent(store.currentUser, sourceEvent)) {
      return { success: false, message: 'ليس لديك صلاحية تعديل هذا الحدث' }
    }

    const error = validateEventForm(draft, sourceEvent.village, store.currentUser)
    if (error) {
      return { success: false, message: error }
    }

    patchEvents(
      store.events.map((item) =>
        item.id === eventId
          ? { ...item, ...draft, title: `${draft.groom} / ${draft.bride}` }
          : item
      )
    )

    writeNotice('', 'تم تحديث الحدث بنجاح')
    return { success: true }
  }

  const toggleMyEvent = (eventId) => {
    patchUsers(
      store.users.map((user) =>
        user.id === store.currentUser.id
          ? {
              ...user,
              myEvents: user.myEvents.includes(eventId)
                ? user.myEvents.filter((id) => id !== eventId)
                : [...user.myEvents, eventId],
            }
          : user
      )
    )
  }

  const deleteEvent = (eventId) => {
    const targetEvent = store.events.find((item) => item.id === eventId)
    if (!canDeleteEvent(store.currentUser, targetEvent)) return

    patchEvents(store.events.filter((item) => item.id !== eventId))
    patchUsers(
      store.users.map((user) => ({
        ...user,
        myEvents: user.myEvents.filter((savedId) => savedId !== eventId),
      }))
    )
    writeNotice('', 'تم حذف الحدث')
  }

  return {
    addEvent,
    updateEvent,
    toggleMyEvent,
    deleteEvent,
  }
}