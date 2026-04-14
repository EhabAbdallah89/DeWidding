import { seedEvents } from '../data/seedData'
import { STORAGE_KEYS, loadValue, saveValue } from './storageService'

// هذه الخدمة مسؤولة فقط عن تحميل وحفظ الأحداث.
export function loadEvents() {
  return loadValue(STORAGE_KEYS.eventsData, seedEvents)
}

export function saveEvents(events) {
  saveValue(STORAGE_KEYS.eventsData, events)
}
