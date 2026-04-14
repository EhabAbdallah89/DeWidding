import { villages } from '../../data/seedData'

// هذا الحقل مسؤول عن اختيار القرية فقط.
function VillageFilterSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="" disabled> اختر قرية </option>
      {villages.map((item) => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
  )
}

export default VillageFilterSelect
