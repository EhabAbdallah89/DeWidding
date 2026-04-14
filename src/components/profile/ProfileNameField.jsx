// هذا الحقل مسؤول عن اسم المستخدم فقط.
function ProfileNameField({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      placeholder="الاسم الكامل"
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default ProfileNameField
