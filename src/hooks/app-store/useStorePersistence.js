import { useEffect } from 'react'
import { saveEvents } from '../../services/eventService'
import { saveUsers } from '../../services/userService'
import { STORAGE_KEYS, saveValue } from '../../services/storageService'

// هذه الدالة تحفظ البيانات في التخزين المحلي عند تغيّرها.
export function useStorePersistence({ users, events, currentUserId, currentPage, selectedVillage, search }) {
  useEffect(() => saveUsers(users), [users])
  useEffect(() => saveEvents(events), [events])
  useEffect(() => saveValue(STORAGE_KEYS.currentUserId, currentUserId), [currentUserId])
  useEffect(() => saveValue(STORAGE_KEYS.currentPage, currentPage), [currentPage])
  useEffect(() => saveValue(STORAGE_KEYS.selectedVillage, selectedVillage), [selectedVillage])
  useEffect(() => saveValue(STORAGE_KEYS.searchText, search), [search])
}
