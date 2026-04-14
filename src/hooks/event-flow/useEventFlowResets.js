import { useEffect } from 'react'
import { emptyNotice } from './eventConstants'
import { useNoticeReset } from './useNoticeReset'

// هذه الدالة تجمع كل عمليات إعادة ضبط الرسائل.
export function useEventFlowResets(store, setNotice) {
  useNoticeReset(store.selectedVillage, setNotice)

  useEffect(() => {
    setNotice(emptyNotice)
  }, [store.currentPage, setNotice])
}
