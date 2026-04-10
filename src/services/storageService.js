export const STORAGE_KEYS = {
  usersData: 'dewedding.usersData',
  eventsData: 'dewedding.eventsData',
  currentUserId: 'dewedding.currentUserId',
  selectedVillage: 'dewedding.selectedVillage',
  searchText: 'dewedding.searchText',
  currentPage: 'dewedding.currentPage',
  adminMeta: 'dewedding.adminMeta',
  otpDraft: 'dewedding.otpDraft',
}

export function loadValue(key, fallbackValue) {
  try {
    const rawValue = localStorage.getItem(key)
    return rawValue ? JSON.parse(rawValue) : fallbackValue
  } catch {
    return fallbackValue
  }
}

export function saveValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeValue(key) {
  localStorage.removeItem(key)
}
