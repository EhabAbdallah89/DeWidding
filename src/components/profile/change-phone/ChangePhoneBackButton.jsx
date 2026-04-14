// هذا الزر يعيد المستخدم إلى صفحة الملف الشخصي.
function ChangePhoneBackButton({ onBack }) {
  return (
    <div className="button-row">
      <button type="button" className="ghost-btn" onClick={onBack}>رجوع</button>
    </div>
  )
}

export default ChangePhoneBackButton
