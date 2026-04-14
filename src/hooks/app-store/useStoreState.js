import { useState } from 'react'
import { loadEvents } from '../../services/eventService'
import { loadUsers } from '../../services/userService'
import { STORAGE_KEYS, loadValue } from '../../services/storageService'

// هذه الدالة مسؤولة فقط عن تعريف الحالات الأساسية للتطبيق.
export function useStoreState() {
  const [users, setUsers] = useState(loadUsers())
  const [events, setEvents] = useState(loadEvents())
  const [currentUserId, setCurrentUserId] = useState(loadValue(STORAGE_KEYS.currentUserId, null))
  const [currentPage, setCurrentPage] = useState(loadValue(STORAGE_KEYS.currentPage, 'dashboard'))
  const [selectedVillage, setSelectedVillage] = useState(loadValue(STORAGE_KEYS.selectedVillage, ''))
  const [search, setSearch] = useState(loadValue(STORAGE_KEYS.searchText, ''))

  return {
    users,
    setUsers,
    events,
    setEvents,
    currentUserId,
    setCurrentUserId,
    currentPage,
    setCurrentPage,
    selectedVillage,
    setSelectedVillage,
    search,
    setSearch,
  }
}
