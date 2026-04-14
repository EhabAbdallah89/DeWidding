// هذا السطر يعرض رمز الاختبار فقط في بيئة العرض الحالية.
function ChangePhonePreviewCode({ code, disabled }) {
  if (disabled || !code) return null
  return <p className="msg success">رمز التحقق للتجربة: {code}</p>
}

export default ChangePhonePreviewCode
