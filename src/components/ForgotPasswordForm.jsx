function ForgotPasswordForm({ formData, onChange, onSubmit, errorMessage, successMessage }) {
  return (
    <div className="card">
      <h3 className="section-title">إعادة تعيين كلمة المرور</h3>
      <div className="grid-3">
        <div className="field"><label>البريد الإلكتروني</label><input type="email" name="email" value={formData.email} onChange={onChange} placeholder="name@example.com" /></div>
        <div className="field"><label>رقم الهاتف</label><input type="text" name="phone" value={formData.phone} onChange={onChange} placeholder="05XXXXXXXX" /></div>
        <div className="field"><label>كلمة المرور الجديدة</label><input type="password" name="newPassword" value={formData.newPassword} onChange={onChange} placeholder="كلمة المرور الجديدة" /></div>
      </div>
      <div className="button-row"><button className="ghost-btn" onClick={onSubmit}>حفظ كلمة المرور الجديدة</button></div>
      {errorMessage && <p className="message error">{errorMessage}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}
    </div>
  )
}
export default ForgotPasswordForm
