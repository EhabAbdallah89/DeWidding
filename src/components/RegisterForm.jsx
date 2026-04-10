import { villages } from '../data/seedData'

function RegisterForm({ registerData, onChange, onSubmit, errorMessage, successMessage }) {
  return (
    <div className="card">
      <h3 className="section-title">تسجيل حساب جديد</h3>
      <div className="grid-2">
        <div className="field"><label>الاسم الكامل</label><input type="text" name="name" value={registerData.name} onChange={onChange} placeholder="أدخل الاسم الكامل" /></div>
        <div className="field"><label>رقم الهاتف</label><input type="text" name="phone" value={registerData.phone} onChange={onChange} placeholder="05XXXXXXXX" /></div>
        <div className="field"><label>القرية</label><select name="village" value={registerData.village} onChange={onChange}><option value="">اختر القرية</option>{villages.map((village)=><option key={village} value={village}>{village}</option>)}</select></div>
      </div>
      <div className="note-box">المرحلة الحالية تعتمد تسجيلًا محليًا. بعد Firebase يمكن ربط التسجيل بالتحقق عبر الرسائل.</div>
      <div className="button-row"><button className="primary-btn" onClick={onSubmit}>تسجيل</button></div>
      {errorMessage && <p className="message error">{errorMessage}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}
    </div>
  )
}

export default RegisterForm
