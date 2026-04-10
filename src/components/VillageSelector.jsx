import { villages } from '../data/seedData'
function VillageSelector({ selectedVillage, onVillageChange }) {
  return (
    <div className="card">
      <div className="field">
        <label>القرية</label>
        <select value={selectedVillage} onChange={onVillageChange}>
          <option value="">اختر قرية</option>
          {villages.map((village)=><option key={village} value={village}>{village}</option>)}
        </select>
      </div>
    </div>
  )
}
export default VillageSelector
