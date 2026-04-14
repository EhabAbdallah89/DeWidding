

// هذه الشاشة هي نقطة البداية: جوجل / آبل / هاتف / بريد إلكتروني.
function AuthMainStep({ auth }) {
  return (
    <>
      <button className="provider-btn" onClick={auth.google}>المتابعة عبر Google</button>
      <button className="provider-btn" onClick={auth.apple}>المتابعة عبر Apple</button>
      <button className="provider-btn" onClick={auth.openPhone}>المتابعة عبر الهاتف</button>

      <div className="divider">
        <span>أو</span>
      </div>

      <input
        type="email"
        value={auth.emailForm.email}
        placeholder="أدخل البريد الإلكتروني"
        onChange={(e) => auth.setEmailForm({ email: e.target.value })}
      />

      <button className="primary-btn block" onClick={auth.continueEmail}>متابعة</button>
    </>
  )
}

export default AuthMainStep
