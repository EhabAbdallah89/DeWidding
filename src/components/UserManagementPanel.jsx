import { getRoleLabel } from '../utils/eventUtils'

const roleOptions = ['user', 'supervisor', 'admin']

function UserManagementPanel({ users, currentUser, onChangeUserRole }) {
  return (
    <div className="card">
      <h2 className="card-title">إدارة المستخدمين</h2>
      <p className="card-subtitle">فقط ADMIN يمكنه تغيير صلاحيات المستخدمين.</p>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الهاتف</th>
              <th>القرية</th>
              <th>الدور الحالي</th>
              <th>تعديل الدور</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.village}</td>
                <td><span className="badge-role">{getRoleLabel(user.role)}</span></td>
                <td>
                  <select value={user.role} onChange={(event) => onChangeUserRole(user.id, event.target.value)} disabled={currentUser.id === user.id && user.role === 'admin'}>
                    {roleOptions.map((roleOption) => (
                      <option key={roleOption} value={roleOption}>{getRoleLabel(roleOption)}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagementPanel
