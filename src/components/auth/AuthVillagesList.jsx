import { villages } from '../../data/seedData'

// هذه القائمة المساعدة تُستخدم داخل حقول القرية.
function AuthVillagesList() {
  return (
    <datalist id="villages">
      {villages.map((item) => (
        <option key={item} value={item} />
      ))}
    </datalist>
  )
}

export default AuthVillagesList
