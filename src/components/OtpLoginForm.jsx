function OtpLoginForm({ otpPhone, otpCode, otpStep, onPhoneChange, onCodeChange, onRequestCode, onVerifyCode, errorMessage, successMessage, otpDebugCode }) {
  return (
    <div className="card">
      <h3 className="section-title">تسجيل الدخول عبر OTP</h3>
      <div className="grid-2">
        <div className="field">
          <label>رقم الهاتف</label>
          <input type="text" value={otpPhone} onChange={onPhoneChange} placeholder="05XXXXXXXX" />
        </div>
        {otpStep === 'verify' && (
          <div className="field">
            <label>رمز التحقق</label>
            <input type="text" value={otpCode} onChange={onCodeChange} placeholder="6 digits" maxLength={6} />
          </div>
        )}
      </div>
      <div className="button-row">
        {otpStep === 'request' ? (
          <button className="secondary-btn" onClick={onRequestCode}>إرسال الرمز</button>
        ) : (
          <>
            <button className="success-btn" onClick={onVerifyCode}>تحقق وادخل</button>
            <button className="ghost-btn" onClick={onRequestCode}>إعادة إرسال</button>
          </>
        )}
      </div>
      {otpDebugCode && <div className="note-box">رمز OTP التجريبي لهذا الجهاز: <strong>{otpDebugCode}</strong></div>}
      {errorMessage && <p className="message error">{errorMessage}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}
    </div>
  )
}

export default OtpLoginForm
