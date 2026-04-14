// هذه الخطوة تكمل إنشاء الحساب بعد التحقق من الهاتف.
function AuthPhoneProfileStep({ auth }) {
  return (
    <>
      <button className="link-btn" onClick={auth.back}>← رجوع</button>
      <input
        value={auth.phoneForm.name}
        placeholder="الاسم الكامل"
        onChange={(e) => auth.setPhoneForm({ name: e.target.value })}
      />
      <input
        value={auth.phoneForm.email}
        placeholder="البريد الإلكتروني (اختياري)"
        onChange={(e) => auth.setPhoneForm({ email: e.target.value })}
      />
      <input
        list="villages"
        value={auth.phoneForm.village}
        placeholder="القرية"
        onChange={(e) => auth.setPhoneForm({ village: e.target.value })}
      />
      <button className="primary-btn block" onClick={auth.createPhoneUser}>إنشاء الحساب</button>
    </>
  )
}

export default AuthPhoneProfileStep
