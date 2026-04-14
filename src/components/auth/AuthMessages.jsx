// هذا المكون يعرض رسائل الخطأ أو النجاح الخاصة بالمصادقة.
function AuthMessages({ message }) {
  return (
    <>
      {message.error && <p className="msg error">{message.error}</p>}
      {message.success && <p className="msg success">{message.success}</p>}
    </>
  )
}

export default AuthMessages
