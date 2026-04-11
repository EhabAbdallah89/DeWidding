import Avatar from '../components/Avatar'
import { canManageUsers, getRoleLabel } from '../utils/permissions'

function AdminLayout({ currentUser, currentPage, onChangePage, onLogout, children }) {
  const navItems = [
    { key: 'dashboard', label: 'لوحة التحكم' },
    { key: 'pending', label: 'الأعراس بانتظار الموافقة' },
    ...(canManageUsers(currentUser) ? [{ key: 'users', label: 'إدارة المستخدمين' }] : []),
    { key: 'my-events', label: 'أعراسي' },
    { key: 'profile', label: 'الإعدادات' },
  ]

  return (
    <div className="layout">
      <div className="topbar">
        <div><div className="topbar-title">DEWEDDING</div><div className="topbar-subtitle">واجهة الإدارة</div></div>
        <div className="topbar-actions">
          <div className="topbar-user">
            <Avatar name={currentUser.name} image={currentUser.profileImage} size={40} />
            <div>
              <div className="topbar-user-name">{currentUser.name}</div>
              <div className="topbar-user-role">{getRoleLabel(currentUser.role)}</div>
            </div>
          </div>
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
