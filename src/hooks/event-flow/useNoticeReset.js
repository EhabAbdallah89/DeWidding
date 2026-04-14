import { useEffect } from 'react'
import { emptyNotice } from './eventConstants'

// هذه الدالة تنظف الرسائل عند تغيير القرية المختارة.
export function useNoticeReset(selectedVillage, setNotice) {
  useEffect(() => {
    setNotice(emptyNotice)
  }, [selectedVillage, setNotice])
}
