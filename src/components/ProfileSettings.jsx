function ProfileSettings({ currentUser, profileData, onChange, onImageChange, onSave }) {
  if(!currentUser) return null
  return (
    <div className="card">
      <h3 className="section-title">الإعدادات / الملف الشخصي</h3>
      <div className="grid-2">
        <div className="field"><label>الاسم</label><input type="text" name="name" value={profileData.name} onChange={onChange} /></div>
        <div className="field"><label>رقم الهاتف</label><input type="text" value={currentUser.phone} disabled className="profile-readonly" /></div>
        <div className="field"><label>القرية</label><input type="text" value={currentUser.village} disabled className="profile-readonly" /></div>
        <div className="field"><label>صورة المستخدم</label><input type="file" accept="image/*" onChange={onImageChange} /></div>
      </div>
      <div className="button-row"><button className="primary-btn" onClick={onSave}>حفظ التعديلات</button></div>
      <div className="note-box">لا يمكن تغيير رقم الهاتف أو القرية بعد التسجيل</div>
    </div>
  )
}
export default ProfileSettings
