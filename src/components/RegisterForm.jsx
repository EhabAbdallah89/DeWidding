import { villages } from '../data/seedData'

function RegisterForm({ registerData, onChange, onImageChange, onSendOtp, onVerifyOtp, onSubmit, errorMessage, successMessage, otpSentCode, otpVerified }) {
  return (
    <div className="card">
      <h3 className="section-title">تسجيل حساب جديد</h3>
      <div className="grid-2">
        <div className="field"><label>الاسم الكامل</label><input type="text" name="name" value={registerData.name} onChange={onChange} placeholder="أدخل الاسم الكامل" /></div>
        <div className="field"><label>رقم الهاتف</label><input type="text" name="phone" value={registerData.phone} onChange={onChange} placeholder="05XXXXXXXX" /></div>
        <div className="field"><label>البريد الإلكتروني</label><input type="email" name="email" value={registerData.email} onChange={onChange} placeholder="name@example.com" /></div>
        <div className="field"><label>كلمة المرور</label><input type="password" name="password" value={registerData.password} onChange={onChange} placeholder="كلمة المرور" /></div>
        <div className="field"><label>القرية</label><select name="village" value={registerData.village} onChange={onChange}><option value="">اختر القرية</option>{villages.map((village)=><option key={village} value={village}>{village}</option>)}</select></div>
        <div className="field"><label>صورة المستخدم</label><input type="file" accept="image/*" onChange={onImageChange} /></div>
      </div>
      <div className="divider" />
      <div className="grid-2">
        <div className="field"><label>رمز OTP للتسجيل</label><input type="text" name="otpCode" value={registerData.otpCode} onChange={onChange} placeholder="أدخل الرمز" /></div>
        <div className="field otp-actions-wrap">
          <label>توثيق الهاتف</label>
          <div className="button-row">
            <button className="secondary-btn" onClick={onSendOtp}>إرسال OTP</button>
            <button className="success-btn" onClick={onVerifyOtp}>تأكيد OTP</button>
          </div>
        </div>
      </div>
      {otpSentCode && <div className="note-box">رمز الاختبار المحلي: <strong>{otpSentCode}</strong></div>}
      {otpVerified && <p className="message success">تم توثيق رقم الهاتف بنجاح</p>}
      <div className="button-row"><button className="primary-btn" onClick={onSubmit}>تسجيل</button></div>
      {errorMessage && <p className="message error">{errorMessage}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}
    </div>
  )
}
export default RegisterForm
