// هذه الخطوة تكمل إنشاء الحساب بعد إدخال البريد الإلكتروني.
function AuthEmailProfileStep({ auth }) {
  return (
    <>
      <button className="link-btn" onClick={auth.back}>← رجوع</button>
      <input
        value={auth.emailForm.name}
        placeholder="الاسم الكامل"
        onChange={(e) => auth.setEmailForm({ name: e.target.value })}
      />
      <input value={auth.emailForm.email} disabled />
      <input
        list="villages"
        value={auth.emailForm.village}
        placeholder="القرية"
        onChange={(e) => auth.setEmailForm({ village: e.target.value })}
      />
      <button className="primary-btn block" onClick={auth.continueEmail}>إنشاء الحساب</button>
    </>
  )
}

export default AuthEmailProfileStep
