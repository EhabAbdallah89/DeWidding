import Avatar from './Avatar'

function ProfileSettings({ currentUser, profileData, onChange, onImageChange, onSave }) {
  if (!currentUser) return null

  return (
    <div className="card">
      <h3 className="section-title">الإعدادات / الملف الشخصي</h3>
      <div className="profile-header-box">
        <Avatar name={profileData.name || currentUser.name} image={profileData.profileImage || currentUser.profileImage} size={84} />
        <div>
          <div className="profile-title">{profileData.name || currentUser.name}</div>
          <div className="card-subtitle">{currentUser.phone}</div>
          <div className="card-subtitle">{profileData.email || currentUser.email || '—'}</div>
        </div>
      </div>
      <div className="grid-2">
        <div className="field"><label>الاسم</label><input type="text" name="name" value={profileData.name} onChange={onChange} /></div>
        <div className="field"><label>رقم الهاتف</label><input type="text" value={currentUser.phone} disabled className="profile-readonly" /></div>
        <div className="field"><label>البريد الإلكتروني</label><input type="email" name="email" value={profileData.email} onChange={onChange} /></div>
        <div className="field"><label>القرية</label><input type="text" value={currentUser.village} disabled className="profile-readonly" /></div>
        <div className="field"><label>صورة المستخدم</label><input type="file" accept="image/*" onChange={onImageChange} /></div>
      </div>
      <div className="button-row"><button className="primary-btn" onClick={onSave}>حفظ التعديلات</button></div>
      <div className="note-box">يمكن تعديل البريد الإلكتروني. تغيير رقم الهاتف يتطلب تحقق OTP في مرحلة لاحقة، وتعديل القرية متاح للمدير فقط.</div>
    </div>
  )
}
export default ProfileSettings
