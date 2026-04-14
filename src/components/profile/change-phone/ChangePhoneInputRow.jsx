// هذا السطر يلتقط رقم الهاتف الجديد مع زر إرسال الرمز.
function ChangePhoneInputRow({ value, disabled, onChange, onSendOtp }) {
  return (
    <div className="profile-row">
      <div className="otp-field-group">
        <input
          type="text"
          value={value}
          placeholder="رقم الهاتف الجديد"
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        />
        {!disabled && (
          <button type="button" className="ghost-btn" onClick={onSendOtp}>إرسال OTP</button>
        )}
      </div>
    </div>
  )
}

export default ChangePhoneInputRow
