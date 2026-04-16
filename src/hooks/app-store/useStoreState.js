import { useEffect, useState } from 'react'
import { loadEvents } from '../../services/eventService'
import { loadUsers } from '../../services/userService'
import { STORAGE_KEYS, loadValue } from '../../services/storageService'
import { getUsersFromSupabase } from '../../services/supabaseUserService'

// هذه الدالة مسؤولة فقط عن تعريف الحالات الأساسية للتطبيق.
export function useStoreState() {
const [users, setUsers] = useState([])
  const [events, setEvents] = useState(loadEvents())
  const [currentUserId, setCurrentUserId] = useState(loadValue(STORAGE_KEYS.currentUserId, null))
  const [currentPage, setCurrentPage] = useState(loadValue(STORAGE_KEYS.currentPage, 'dashboard'))
  const [selectedVillage, setSelectedVillage] = useState(loadValue(STORAGE_KEYS.selectedVillage, ''))
  const [search, setSearch] = useState(loadValue(STORAGE_KEYS.searchText, ''))

  useEffect(() => {
  async function loadUsersFromSupabase() {
    const result = await getUsersFromSupabase()

    if (result.success) {
      console.log('USERS LOADED FROM SUPABASE:', result.data)
      setUsers(result.data)
    } else {
      console.error('SUPABASE USERS LOAD ERROR:', result.message)
    }
  }

  loadUsersFromSupabase()
}, [])

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
