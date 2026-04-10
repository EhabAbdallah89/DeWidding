function OtpLoginForm({ otpPhone, onChange, onSubmit, errorMessage, successMessage }) {
  return (
    <div className="card">
      <h3 className="section-title">دخول تجريبي عبر OTP</h3>
      <div className="field"><label>رقم الهاتف</label><input type="text" value={otpPhone} onChange={onChange} placeholder="رقم الهاتف" /></div>
      <div className="button-row"><button className="secondary-btn" onClick={onSubmit}>دخول OTP</button></div>
      {errorMessage && <p className="message error">{errorMessage}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}
    </div>
  )
}
export default OtpLoginForm
