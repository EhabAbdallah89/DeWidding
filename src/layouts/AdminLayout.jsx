function AdminLayout({ currentUser, currentPage, onChangePage, onLogout, children }) {
  const navItems = [{ key:'dashboard', label:'لوحة التحكم' }, { key:'pending', label:'الأعراس بإنتظار الموافقة' }, { key:'my-events', label:'أعراسي' }, { key:'profile', label:'الإعدادات' }]
  return (
    <div className="layout">
      <div className="topbar">
        <div><div className="topbar-title">DEWEDDING</div><div className="topbar-subtitle">واجهة الإدارة</div></div>
        <div className="topbar-actions"><span className="badge-role">{currentUser.role}</span><button className="secondary-btn" onClick={onLogout}>تسجيل الخروج</button></div>
      </div>
      <div className="page-container sidebar-layout">
        <aside className="sidebar"><h3 className="sidebar-title">القائمة</h3><div className="nav-list">{navItems.map((item)=><button key={item.key} className={`nav-btn ${currentPage===item.key ? 'active' : ''}`} onClick={()=>onChangePage(item.key)}>{item.label}</button>)}</div></aside>
        <main>{children}</main>
      </div>
    </div>
  )
}
export default AdminLayout
