import { useStoreState } from './app-store/useStoreState'
import { useStoreSelectors } from './app-store/useStoreSelectors'
import { useStorePersistence } from './app-store/useStorePersistence'
import { useAllowedPageGuard, useVillageBootstrap } from './app-store/useStoreGuards'

// هذا هو المخزن الرئيسي للتطبيق.
// تم تقسيمه إلى: حالات أساسية + قيم مشتقة + مزامنة التخزين + حراس التنقل.
export function useAppStore() {
  // ==============================
  // الحالات الأساسية (useState)
  // ==============================
  const state = useStoreState()

  // ==============================
  // القيم المشتقة (useMemo)
  // ==============================
  const selectors = useStoreSelectors(state)

  // ==============================
  // الحراس والمزامنة (useEffect)
  // ==============================
  useStorePersistence(state)
  useVillageBootstrap({
    currentUser: selectors.currentUser,
    selectedVillage: state.selectedVillage,
    setSelectedVillage: state.setSelectedVillage,
  })
  useAllowedPageGuard({
    currentUser: selectors.currentUser,
    currentPage: state.currentPage,
    setCurrentPage: state.setCurrentPage,
  })

  return {
    ...state,
    ...selectors,
  }
}
