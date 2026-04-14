import { useEffect } from 'react'
import { getAllowedPages } from '../../utils/permissions'

// هذه الدالة تضبط القرية الافتراضية حسب قرية المستخدم.
export function useVillageBootstrap({ currentUser, selectedVillage, setSelectedVillage }) {
  useEffect(() => {
    if (!currentUser?.village) return

    setSelectedVillage(currentUser.village)
  }, [currentUser?.id, currentUser?.village, setSelectedVillage])
}

// هذه الدالة تمنع الوصول إلى صفحات غير مسموح بها حسب الدور.
export function useAllowedPageGuard({ currentUser, currentPage, setCurrentPage }) {
  useEffect(() => {
    const allowedPages = getAllowedPages(currentUser)
    if (!allowedPages.includes(currentPage)) {
      setCurrentPage(currentUser ? 'dashboard' : 'auth')
    }
  }, [currentUser, currentPage, setCurrentPage])
}
