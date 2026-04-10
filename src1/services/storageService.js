export const STORAGE_KEYS = {
  selectedVillage: 'dewedding.selectedVillage',
  searchText: 'dewedding.searchText',
  currentUserId: 'dewedding.currentUserId',
  eventsData: 'dewedding.eventsData'
}

export function loadValue(key, fallbackValue) {
  const rawValue = localStorage.getItem(key)

  if (rawValue === null) {
    return fallbackValue
  }

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
