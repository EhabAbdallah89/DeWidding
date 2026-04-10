function AdminLayout({ currentUser, currentPage, onChangePage, onLogout, children }) {
  const navItems = [{ key:'dashboard', label:'لوحة التحكم' }, { key:'pending', label:'الأعراس بإنتظار الموافقة' }, { key:'my-events', label:'أعراسي' }, { key:'profile', label:'الإعدادات' }]
  if (currentUser?.role === 'admin') {
    navItems.splice(3, 0, { key: 'users', label: 'إدارة المستخدمين' })
  }

  return (
    <div className="layout">
      <div className="topbar">
        <div><div className="topbar-title">DEWEDDING</div><div className="topbar-subtitle">واجهة الإدارة</div></div>
        <div className="topbar-actions">
          <div className="user-chip">
            {currentUser.profileImage ? <img src={currentUser.profileImage} alt={currentUser.name} className="user-chip-avatar" /> : <div className="user-chip-avatar placeholder-avatar">{currentUser.name?.[0] || 'A'}</div>}
            <span>{currentUser.name}</span>
          </div>
          <span className="badge-role">{currentUser.role}</span>
          <button className="secondary-btn" onClick={onLogout}>تسجيل الخروج</button>
        </div>
      </div>
      <div className="page-container sidebar-layout">
        <aside className="sidebar"><h3 className="sidebar-title">القائمة</h3><div className="nav-list">{navItems.map((item)=><button key={item.key} className={`nav-btn ${currentPage===item.key ? 'active' : ''}`} onClick={()=>onChangePage(item.key)}>{item.label}</button>)}</div></aside>
        <main>{children}</main>
      </div>
    </div>
  )
}
export default AdminLayout
