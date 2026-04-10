function ProfileSettings({ currentUser, profileData, onChange, onImageChange, onSave, defaultAvatar }) {
  if (!currentUser) return null

  const previewSrc = profileData.profileImage || defaultAvatar

  return (
    <div className="card">
      <h3 className="section-title">الإعدادات / الملف الشخصي</h3>
      <div className="profile-header">
        <img className="avatar-preview large" src={previewSrc} alt="avatar" />
        <div>
          <div className="card-title compact">{currentUser.name}</div>
          <div className="card-subtitle compact">{currentUser.phone}</div>
        </div>
      </div>
      <div className="grid-2">
        <div className="field"><label>الاسم</label><input type="text" name="name" value={profileData.name} onChange={onChange} /></div>
        <div className="field"><label>رقم الهاتف</label><input type="text" value={currentUser.phone} disabled className="profile-readonly" /></div>
        <div className="field"><label>القرية</label><input type="text" value={currentUser.village} disabled className="profile-readonly" /></div>
        <div className="field"><label>صورة المستخدم</label><input type="file" accept="image/*" onChange={onImageChange} /><small>حاليًا تُحفظ محليًا على هذا الجهاز فقط.</small></div>
      </div>
      <div className="button-row"><button className="primary-btn" onClick={onSave}>حفظ التعديلات</button></div>
      <div className="note-box">رقم الهاتف وتحقق OTP الحقيقي عبر SMS سيُربطان لاحقًا مع Firebase Auth.</div>
    </div>
  )
}

export default ProfileSettings
