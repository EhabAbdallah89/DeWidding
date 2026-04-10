import { getRoleLabel } from '../utils/eventUtils'

function UserLayout({ currentUser, onLogout, currentPage, onChangePage, children }) {
  return (
    <div className="layout">
      <div className="topbar">
        <div><div className="topbar-title">DEWEDDING</div><div className="topbar-subtitle">مرحبًا، {currentUser.name}</div></div>
        <div className="topbar-actions"><span className="badge-role">{getRoleLabel(currentUser.role)}</span><button className="secondary-btn" onClick={onLogout}>تسجيل الخروج</button></div>
      </div>
      <div className="page-container">
        <div className="card">
          <div className="button-row">
            <button className={currentPage==='dashboard' ? 'primary-btn' : 'ghost-btn'} onClick={()=>onChangePage('dashboard')}>الرئيسية</button>
            <button className={currentPage==='my-events' ? 'primary-btn' : 'ghost-btn'} onClick={()=>onChangePage('my-events')}>أعراسي</button>
            <button className={currentPage==='profile' ? 'primary-btn' : 'ghost-btn'} onClick={()=>onChangePage('profile')}>الإعدادات</button>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default UserLayout
