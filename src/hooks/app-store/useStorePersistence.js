import { useEffect } from 'react'
import { saveEvents } from '../../services/eventService'
import { STORAGE_KEYS, saveValue } from '../../services/storageService'

// هذه الدالة تحفظ البيانات المحلية المطلوبة فقط.
// المستخدمون لم يعودوا يُحفَظون محليًا لأن المصدر الحقيقي أصبح Supabase.
export function useStorePersistence({ events, currentUserId, currentPage, selectedVillage, search }) {
  useEffect(() => saveEvents(events), [events])
  useEffect(() => saveValue(STORAGE_KEYS.currentUserId, currentUserId), [currentUserId])
  useEffect(() => saveValue(STORAGE_KEYS.currentPage, currentPage), [currentPage])
  useEffect(() => saveValue(STORAGE_KEYS.selectedVillage, selectedVillage), [selectedVillage])
  useEffect(() => saveValue(STORAGE_KEYS.searchText, search), [search])
}