import Avatar from '../components/Avatar'
import { getRoleLabel } from '../utils/permissions'

function UserLayout({ currentUser, onLogout, children }) {
  return (
    <div className="layout">
      <div className="topbar">
        <div><div className="topbar-title">DEWEDDING</div><div className="topbar-subtitle">مرحبًا، {currentUser.name}</div></div>
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
      <div className="page-container">{children}</div>
    </div>
  )
}
export default UserLayout
