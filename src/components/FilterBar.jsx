import { villages } from '../data/seedData'

// هذا المكون مسؤول عن الفلاتر فقط: القرية والبحث.
function FilterBar({ store }) {
  return (
    <section className="panel filter-bar">
      <div className="village-banner">
        <strong>قريتك المسجلة هي: {store.currentUser?.village || '-'}</strong>
      </div>

      <select value={store.selectedVillage} onChange={(e) => store.setSelectedVillage(e.target.value)}>
        <option value="">اختر قرية</option>
        {villages.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <input
        value={store.search}
        placeholder="ابحث باسم العريس أو العروس أو القاعة"
        onChange={(e) => store.setSearch(e.target.value)}
      />

      <button className="ghost-btn" onClick={() => store.setSearch('')}>مسح البحث</button>
    </section>
  )
}

export default FilterBar
