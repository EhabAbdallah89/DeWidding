import { villages } from '../../data/seedData'

// هذا الحقل يغيّر قرية المستخدم من لوحة الإدارة.
function UserVillageSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {villages.map((item) => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
  )
}

export default UserVillageSelect
