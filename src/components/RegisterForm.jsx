import { villages } from '../data/seedData'

function RegisterForm({
  registerData,
  onChange,
  onImageChange,
  onSubmit,
  onReset,
  onSendOtp,
  onVerifyOtp,
  onOtpCodeChange,
  errorMessage,
  successMessage,
  otpMeta,
}) {
  return (
    <div className="card">
      <h3 className="section-title">تسجيل حساب جديد</h3>
      <div className="grid-2">
        <div className="field"><label>الاسم الكامل</label><input type="text" name="name" value={registerData.name} onChange={onChange} placeholder="أدخل الاسم الكامل" /></div>
        <div className="field"><label>رقم الهاتف</label><input type="text" name="phone" value={registerData.phone} onChange={onChange} placeholder="05XXXXXXXX" /></div>
        <div className="field"><label>كلمة المرور</label><input type="password" name="password" value={registerData.password} onChange={onChange} placeholder="كلمة المرور" /></div>
        <div className="field"><label>البريد الإلكتروني</label><input type="email" name="email" value={registerData.email} onChange={onChange} placeholder="name@example.com" /></div>
        <div className="field"><label>القرية</label><select name="village" value={registerData.village} onChange={onChange}><option value="">اختر القرية</option>{villages.map((village)=><option key={village} value={village}>{village}</option>)}</select></div>
        <div className="field"><label>صورة المستخدم</label><input type="file" accept="image/*" onChange={onImageChange} /></div>
      </div>

      <div className="divider" />

      <div className="grid-2">
        <div className="field">
          <label>رمز OTP</label>
          <input
            type="text"
            name="otpCode"
            value={registerData.otpCode}
            onChange={onOtpCodeChange}
            placeholder="أدخل رمز التحقق"
            disabled={otpMeta.verified}
          />
        </div>
        <div className="field">
          <label>حالة التحقق من الهاتف</label>
          <input type="text" value={otpMeta.verified ? 'تم التحقق' : otpMeta.sent ? 'تم إرسال الرمز' : 'لم يتم التحقق بعد'} disabled className="profile-readonly" />
        </div>
      </div>

      <div className="button-row">
        <button className="secondary-btn" onClick={onSendOtp} disabled={otpMeta.verified}>إرسال OTP</button>
        <button className="success-btn" onClick={onVerifyOtp} disabled={otpMeta.verified || !otpMeta.sent}>تأكيد OTP</button>
        <button className="primary-btn" onClick={onSubmit}>تسجيل</button>
        <button className="ghost-btn" onClick={onReset}>نקה</button>
      </div>

      {otpMeta.debugCode && !otpMeta.verified && <div className="note-box">رمز الفحص المحلي: <strong>{otpMeta.debugCode}</strong></div>}
      <div className="note-box">ملاحظة: لا يمكن تغيير القرية أو رقم الهاتف لاحقًا</div>
      {errorMessage && <p className="message error">{errorMessage}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}
    </div>
  )
}

export default RegisterForm
