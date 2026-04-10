function UserSwitcher({ users, currentUserId, onUserChange }) {
  const currentUser = users.find((user) => user.id === currentUserId)

  return (
    <div className="user-box">
      <label>المستخدم الحالي (محاكاة قبل Firebase)</label>
      <select value={currentUserId} onChange={onUserChange}>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name} - {user.role}
          </option>
        ))}
      </select>

      {currentUser && (
        <div className="user-meta">
          <div>Role: {currentUser.role}</div>
          <div>Village: {currentUser.village || '—'}</div>
        </div>
      )}
    </div>
  )
}

export default UserSwitcher
