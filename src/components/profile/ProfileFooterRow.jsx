// هذا السطر يعرض القرية مع زر الحفظ.
function ProfileFooterRow({ village, onSave }) {
  return (
    <div className="profile-row">
      <input value={village || ''} disabled />
      <button className="primary-btn" onClick={onSave}>حفظ الملف الشخصي</button>
    </div>
  )
}

export default ProfileFooterRow
