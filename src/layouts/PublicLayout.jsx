// هذا التخطيط مخصص للواجهة العامة قبل تسجيل الدخول.
function PublicLayout({ children }) {
  return (
    <div className="guest-shell">
      <div className="guest-container">{children}</div>
    </div>
  )
}

export default PublicLayout
