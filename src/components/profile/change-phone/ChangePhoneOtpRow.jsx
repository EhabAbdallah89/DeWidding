// هذا السطر يلتقط رمز OTP ويؤكد العملية.
function ChangePhoneOtpRow({ value, enabled, onChange, onVerify }) {
  if (!enabled) return null

  return (
    <div className="profile-row">
      <div className="otp-field-group">
        <input
          type="text"
          value={value}
          placeholder="رمز التحقق OTP"
          onChange={(e) => onChange(e.target.value)}
        />
        <button type="button" className="ghost-btn" onClick={onVerify}>تأكيد OTP</button>
      </div>
    </div>
  )
}

export default ChangePhoneOtpRow
