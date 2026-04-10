function SearchBox({ search, onSearchChange, onClearSearch }) {
  return (
    <div className="card">
      <div className="field">
        <label>البحث</label>
        <div className="search-row">
          <input type="text" placeholder="ابحث عن اسم العريس أو العروس أو عنوان الحدث" value={search} onChange={onSearchChange} />
          {search && <button className="ghost-btn" onClick={onClearSearch}>مسح</button>}
        </div>
      </div>
    </div>
  )
}
export default SearchBox
