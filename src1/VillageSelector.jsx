function VillageSelector({ villages, selectedVillage, onVillageChange }) {
    return (
        <select value={selectedVillage} onChange={onVillageChange}>
            <option value="" disabled>
                اختر قرية
            </option>

            {villages.map((village) => (
                <option key={village} value={village}>
                    {village}
                </option>
            ))}
        </select>
    )
}

export default VillageSelector