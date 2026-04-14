// هذا السطر يجمع البريد الإلكتروني مع رفع الصورة.
function ProfileEmailImageRow({ email, onEmailChange, onImageChange }) {
  return (
    <div className="profile-row">
      <input
        type="text"
        value={email}
        placeholder="البريد الإلكتروني"
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={onImageChange} />
    </div>
  )
}

export default ProfileEmailImageRow
