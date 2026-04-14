// مفاتيح التخزين المحلي المستخدمة داخل التطبيق.
export const STORAGE_KEYS = {
  currentUserId: 'dewedding.currentUserId',
  selectedVillage: 'dewedding.selectedVillage',
  searchText: 'dewedding.searchText',
  eventsData: 'dewedding.eventsData',
  usersData: 'dewedding.usersData',
  currentPage: 'dewedding.currentPage',
  otpStore: 'dewedding.otpStore',
}

// قراءة قيمة من التخزين المحلي مع قيمة احتياطية.
export function loadValue(key, fallbackValue) {
  const rawValue = localStorage.getItem(key)
  if (rawValue === null) return fallbackValue

  try {
    return JSON.parse(rawValue)
  } catch {
    return rawValue
  }
}

// حفظ قيمة داخل التخزين المحلي.
export function saveValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// حذف قيمة من التخزين المحلي.
export function removeValue(key) {
  localStorage.removeItem(key)
}
