import { STORAGE_KEYS, loadValue, saveValue } from './storageService'
import { seedEvents } from '../data/seedData'
export function loadEvents(){ return loadValue(STORAGE_KEYS.eventsData, seedEvents) }
export function saveEvents(events){ saveValue(STORAGE_KEYS.eventsData, events) }
