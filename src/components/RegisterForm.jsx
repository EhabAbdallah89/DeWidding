import { villages } from '../data/seedData'
function RegisterForm({ registerData, onChange, onImageChange, onSubmit, errorMessage, successMessage }) {
  return (
    <div className="card">
      <h3 className="section-title">تسجيل حساب جديد</h3>
      <div className="grid-2">
        <div className="field"><label>الاسم الكامل</label><input type="text" name="name" value={registerData.name} onChange={onChange} placeholder="أدخل الاسم الكامل" /></div>
        <div className="field"><label>رقم الهاتف</label><input type="text" name="phone" value={registerData.phone} onChange={onChange} placeholder="05XXXXXXXX" /></div>
        <div className="field"><label>كلمة المرور</label><input type="password" name="password" value={registerData.password} onChange={onChange} placeholder="كلمة المرور" /><small>سنقوي الشروط لاحقًا.</small></div>
        <div className="field"><label>القرية</label><select name="village" value={registerData.village} onChange={onChange}><option value="">اختر القرية</option>{villages.map((village)=><option key={village} value={village}>{village}</option>)}</select></div>
        <div className="field"><label>صورة المستخدم</label><input type="file" accept="image/*" onChange={onImageChange} /></div>
      </div>
      <div className="note-box">ملاحظة: لا يمكن تغيير القرية أو رقم الهاتف لاحقًا</div>
      <div className="button-row"><button className="primary-btn" onClick={onSubmit}>تسجيل</button></div>
      {errorMessage && <p className="message error">{errorMessage}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}
    </div>
  )
}
export default RegisterForm
