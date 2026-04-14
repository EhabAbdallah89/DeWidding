// هذه الخطوة خاصة بإرسال رمز OTP والتحقق منه.
function AuthPhoneStep({ auth }) {
  return (
    <>
      <button className="link-btn" onClick={auth.back}>← رجوع</button>

      <div className="phone-row">
        <span>+972</span>
        <input
          value={auth.phoneForm.phone}
          placeholder="050XXXXXXXX"
          onChange={(e) => auth.setPhoneForm({ phone: e.target.value })}
        />
      </div>

      <label className="check-row">
        <input
          type="checkbox"
          checked={auth.phoneForm.consent}
          onChange={(e) => auth.setPhoneForm({ consent: e.target.checked })}
        />
        <span>أوافق على استلام رسائل التحقق.</span>
      </label>

      <button className="primary-btn block" onClick={auth.sendPhoneOtp}>إرسال رمز التحقق</button>

      {!!auth.phoneForm.sentCode && (
        <div className="otp-box">
          رمز التحقق للاختبار: <strong>{auth.phoneForm.sentCode}</strong>
        </div>
      )}

      {!!auth.phoneForm.sentCode && (
        <input
          value={auth.phoneForm.otp}
          placeholder="أدخل رمز التحقق"
          onChange={(e) => auth.setPhoneForm({ otp: e.target.value })}
        />
      )}

      {!!auth.phoneForm.sentCode && (
        <button className="primary-btn block" onClick={auth.verifyPhoneOtp}>تأكيد الرمز</button>
      )}
    </>
  )
}

export default AuthPhoneStep
