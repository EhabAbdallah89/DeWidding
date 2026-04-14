import ClearSearchButton from './filters/ClearSearchButton'
import EventSearchInput from './filters/EventSearchInput'
import VillageBanner from './filters/VillageBanner'
import VillageFilterSelect from './filters/VillageFilterSelect'

// هذا المكون مسؤول عن الفلاتر فقط: القرية والبحث.
function FilterBar({ store }) {
  return (
    <section className="panel filter-bar">
      <VillageBanner village={store.currentUser?.village} />
      <VillageFilterSelect value={store.selectedVillage} onChange={store.setSelectedVillage} />
      <EventSearchInput value={store.search} onChange={store.setSearch} />
      <ClearSearchButton onClear={() => store.setSearch('')} />
    </section>
  )
}

export default FilterBar
