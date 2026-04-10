import Avatar from '../components/Avatar'
import { getRoleLabel } from '../utils/permissions'

const roleOptions = [
  { value: 'regular', label: 'مستخدم' },
  { value: 'villageSupervisor', label: 'مشرف قرية' },
  { value: 'generalSupervisor', label: 'مشرف عام' },
]

function UserManagementPage({ users, currentUser, onChangeUserRole, message, errorMessage }) {
  return (
    <div className="card">
      <h2 className="card-title">إدارة المستخدمين</h2>
      <p className="card-subtitle">يمكن للمدير فقط تعديل صلاحيات المستخدمين، ولا يمكن منح صلاحية مدير من هذه الشاشة.</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>المستخدم</th>
              <th>الهاتف</th>
              <th>البريد الإلكتروني</th>
              <th>القرية</th>
              <th>الدور الحالي</th>
              <th>تعديل الدور</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <Avatar name={user.name} image={user.profileImage} size={34} />
                    <span>{user.name}</span>
                  </div>
                </td>
                <td>{user.phone}</td>
                <td>{user.email || '—'}</td>
                <td>{user.village}</td>
                <td><span className="badge-role">{getRoleLabel(user.role)}</span></td>
                <td>
                  {user.id === currentUser.id ? (
                    <span className="readonly-role">مدير النظام</span>
                  ) : (
                    <select value={user.role === 'admin' ? 'regular' : user.role} onChange={(event) => onChangeUserRole(user.id, event.target.value)}>
                      {roleOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {errorMessage && <p className="message error">{errorMessage}</p>}
      {message && <p className="message success">{message}</p>}
    </div>
  )
}

export default UserManagementPage
