import { createEventCrudActions } from './eventCrudActions'
import { createEventModerationActions } from './eventModerationActions'
import { createEventProfileActions } from './eventProfileActions'
import { createAdminUserManagementActions } from './adminUserManagementActions'
// هذه الدالة تجمع كل المجموعات الفرعية في كائن واحد.
export function createEventActions({
  store,
  eventForm,
  setEventForm,
  setShowEventForm,
  profileForm,
  setProfileForm,
  setNotice,
  emptyEvent,
}) {
  const patchUsers = (users) => store.setUsers(users)
  const patchEvents = (events) => store.setEvents(events)
  const writeNotice = (error = '', success = '') => setNotice({ error, success })

  const crudActions = createEventCrudActions({
    store,
    eventForm,
    setEventForm,
    setShowEventForm,
    emptyEvent,
    patchUsers,
    patchEvents,
    writeNotice,
  })

  const moderationActions = createEventModerationActions({
    store,
    patchEvents,
    writeNotice,
  })

  const adminActions = createAdminUserManagementActions({
  store,
  writeNotice,
})

const profileActions = createEventProfileActions({
  store,
  profileForm,
  setProfileForm,
  patchUsers,
  writeNotice,
  updateUserVillage: adminActions.updateUserVillage,
  updateUserRole: adminActions.updateUserRole,
})



  return {
    ...crudActions,
    ...moderationActions,
    ...profileActions,
    ...adminActions, //  הוספנו
    writeNotice,
  }
}