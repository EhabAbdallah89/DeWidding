function UserLayout({ currentUser, onLogout, children }) {
  return (
    <div className="layout">
      <div className="topbar">
        <div><div className="topbar-title">DEWEDDING</div><div className="topbar-subtitle">مرحبًا، {currentUser.name}</div></div>
        <div className="topbar-actions">
          <div className="user-chip">
            {currentUser.profileImage ? <img src={currentUser.profileImage} alt={currentUser.name} className="user-chip-avatar" /> : <div className="user-chip-avatar placeholder-avatar">{currentUser.name?.[0] || 'U'}</div>}
            <span>{currentUser.name}</span>
          </div>
          <span className="badge-role">{currentUser.role}</span>
          <button className="secondary-btn" onClick={onLogout}>تسجيل الخروج</button>
        </div>
      </div>
      <div className="page-container">{children}</div>
    </div>
  )
}
export default UserLayout
