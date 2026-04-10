function LoginForm({ loginData, onChange, onSubmit, errorMessage, successMessage }) {
  return (
    <div className="card">
      <h3 className="section-title">تسجيل الدخول بكلمة المرور</h3>
      <div className="grid-2">
        <div className="field"><label>رقم الهاتف</label><input type="text" name="phone" value={loginData.phone} onChange={onChange} placeholder="رقم الهاتف" /></div>
        <div className="field"><label>كلمة المرور</label><input type="password" name="password" value={loginData.password} onChange={onChange} placeholder="كلمة المرور" /></div>
      </div>
      <div className="button-row"><button className="success-btn" onClick={onSubmit}>دخول</button></div>
      <div className="note-box">يمكن لاحقًا ربط زر "نسيت كلمة المرور" مع البريد الإلكتروني.</div>
      {errorMessage && <p className="message error">{errorMessage}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}
    </div>
  )
}
export default LoginForm
