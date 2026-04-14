import { useMemo } from 'react'
import { filterEvents, splitUpcomingAndPast } from '../../utils/eventUtils'

// هذه الدالة تحضّر القوائم المشتقة: الرئيسية، قيد المراجعة، وأحداثي.
export function useEventCollections(store) {
  const scopedEvents = useMemo(() => {
    const baseEvents = store.selectedVillage
      ? store.viewableEvents.filter((item) => item.village === store.selectedVillage)
      : []

    return filterEvents(baseEvents, store.search)
  }, [store.search, store.selectedVillage, store.viewableEvents])

  const dashboard = useMemo(
    () => splitUpcomingAndPast(scopedEvents),
    [scopedEvents]
  )

  const pending = useMemo(() => {
    const pendingEvents = store.viewableEvents.filter(
      (item) => item.status === 'pending' && (!store.selectedVillage || item.village === store.selectedVillage)
    )

    return splitUpcomingAndPast(filterEvents(pendingEvents, store.search))
  }, [store.search, store.selectedVillage, store.viewableEvents])

  const myEvents = useMemo(() => {
    const ownedEvents = store.events.filter((item) => store.currentUser?.myEvents.includes(item.id))
    return splitUpcomingAndPast(ownedEvents)
  }, [store.events, store.currentUser?.myEvents])

  const counts = useMemo(() => {
    const villageFilteredEvents = store.selectedVillage
      ? store.viewableEvents.filter((item) => item.village === store.selectedVillage)
      : store.viewableEvents

    return {
      total: villageFilteredEvents.length,
      approved: villageFilteredEvents.filter((item) => item.status === 'approved').length,
      pending: villageFilteredEvents.filter((item) => item.status === 'pending').length,
      rejected: villageFilteredEvents.filter((item) => item.status === 'rejected').length,
    }
  }, [store.selectedVillage, store.viewableEvents])

  return {
    scopedEvents,
    dashboard,
    pending,
    myEvents,
    counts,
  }
}
