// هذا السطر يعرض الهاتف الحالي وزر تغييره.
function ProfilePhoneRow({ phone, disabled, onChangePhone }) {
  return (
    <div className="profile-row">
      <input value={phone || ''} disabled />
      <button type="button" className="ghost-btn" disabled={disabled} onClick={onChangePhone}>
        تغيير رقم الهاتف
      </button>
    </div>
  )
}

export default ProfilePhoneRow
