import { DEFAULT_USER_AVATAR } from '../config/profileImages'
import { getRoleLabel } from '../utils/permissions'

// هذا المكون يعرض شريط أعلى الواجهة بعد تسجيل الدخول.
function ShellHeader({ store }) {
  const handleLogout = () => {
    store.setCurrentUserId(null)
    store.setCurrentPage('auth')
  }

  return (
    <header className="topbar">
      <div>
        <h1>DEWEDDING</h1>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={store.currentUser?.profileImage || DEFAULT_USER_AVATAR}
            width="40"
            height="40"
            style={{ borderRadius: '50%' }}
          />

          <div>
            <p>{store.currentUser?.name}</p>
          </div>
        </div>
      </div>

      <div className="topbar-actions">
        <span className="role-pill">{getRoleLabel(store.currentUser?.role)}</span>
        <button className="ghost-btn" onClick={handleLogout}>تسجيل الخروج</button>
      </div>
    </header>
  )
}

export default ShellHeader
