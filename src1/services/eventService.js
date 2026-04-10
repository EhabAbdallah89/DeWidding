import { STORAGE_KEYS, loadValue } from './storageService'
import { seedEvents } from '../data/seedData'

export function loadEvents() {
  return loadValue(STORAGE_KEYS.eventsData, seedEvents)
}

export function saveEvents(events) {
  localStorage.setItem(STORAGE_KEYS.eventsData, JSON.stringify(events))
}
