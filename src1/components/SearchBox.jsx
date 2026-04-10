function SearchBox({ search, onSearchChange, onClearSearch }) {
  return (
    <div className="section">
      <label>البحث</label>
      <div className="search-row">
        <input
          type="text"
          placeholder="ابحث عن اسم العريس أو العروس"
          value={search}
          onChange={onSearchChange}
        />

        {search && (
          <button className="clear-btn" onClick={onClearSearch}>
            مسح
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBox
