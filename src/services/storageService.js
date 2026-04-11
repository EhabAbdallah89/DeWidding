export const STORAGE_KEYS = {
  currentUserId: 'dewedding.currentUserId',
  selectedVillage: 'dewedding.selectedVillage',
  searchText: 'dewedding.searchText',
  eventsData: 'dewedding.eventsData',
  usersData: 'dewedding.usersData',
  currentPage: 'dewedding.currentPage',
  otpStore: 'dewedding.otpStore',
}

export function loadValue(key, fallbackValue) {
  const rawValue = localStorage.getItem(key)
  if (rawValue === null) return fallbackValue
  try {
    return JSON.parse(rawValue)
  } catch {
    return rawValue
  }
}

export function saveValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeValue(key) {
  localStorage.removeItem(key)
}
