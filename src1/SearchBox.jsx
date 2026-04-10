function SearchBox({ search, onSearchChange, onClearSearch }) {
    return (
        <div className="search-box">
            <input
                type="text"
                placeholder="ابحث عن اسم"
                value={search}
                onChange={onSearchChange}
            />

            {search && (
                <button onClick={onClearSearch}>
                    ❌
                </button>
            )}
        </div>
    )
}

export default SearchBox