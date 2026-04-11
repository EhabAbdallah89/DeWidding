function OtpLoginForm({ otpData, onChange, onSendOtp, onSubmit, errorMessage, successMessage, sentCode }) {
  return (
    <div className="card">
      <h3 className="section-title">تسجيل الدخول عبر OTP</h3>
      <div className="grid-2">
        <div className="field"><label>رقم الهاتف</label><input type="text" name="phone" value={otpData.phone} onChange={onChange} placeholder="05XXXXXXXX" /></div>
        <div className="field"><label>رمز التحقق</label><input type="text" name="code" value={otpData.code} onChange={onChange} placeholder="أدخل الرمز" /></div>
      </div>
      <div className="button-row">
        <button className="secondary-btn" onClick={onSendOtp}>إرسال الرمز</button>
        <button className="success-btn" onClick={onSubmit}>دخول عبر OTP</button>
      </div>
      {sentCode && <div className="note-box">رمز الاختبار المحلي: <strong>{sentCode}</strong></div>}
      {errorMessage && <p className="message error">{errorMessage}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}
    </div>
  )
}
export default OtpLoginForm
