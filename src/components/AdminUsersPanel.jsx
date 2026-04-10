function AdminUsersPanel({ users, currentUser, onRoleChange }) {
  if (currentUser?.role !== 'admin') {
    return null
  }

  return (
    <div className="card">
      <h2 className="card-title">إدارة المستخدمين</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الهاتف</th>
              <th>القرية</th>
              <th>البريد</th>
              <th>نوع المستخدم</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.village}</td>
                <td>{user.email || '—'}</td>
                <td>
                  <select value={user.role} onChange={(event) => onRoleChange(user.id, event.target.value)} disabled={user.id === currentUser.id}>
                    <option value="regular">مستخدم רגיל</option>
                    <option value="villageSupervisor">مشرف قرية</option>
                    <option value="generalSupervisor">مشرف عام</option>
                    {user.role === 'admin' && <option value="admin">ADMIN</option>}
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

export default AdminUsersPanel
