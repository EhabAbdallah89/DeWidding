import { villages } from '../../data/seedData'
import { getRoleLabel } from '../../utils/permissions'
import { DEFAULT_USER_AVATAR } from '../../config/profileImages'

// هذا الصف مسؤول عن إدارة مستخدم واحد في جدول الإدارة.
function UserTableRow({ user, events }) {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.phone}</td>
      <td>
        <img
          src={user.profileImage || DEFAULT_USER_AVATAR}
          width="40"
          height="40"
          style={{ borderRadius: '50%' }}
        />
      </td>
      <td>
        <button className="ghost-btn" onClick={() => events.adminRemoveUserImage(user.id)}>
          حذف الصورة
        </button>
      </td>
      <td>{user.email}</td>
      <td>
        <select value={user.village} onChange={(e) => events.updateVillage(user.id, e.target.value)}>
          {villages.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </td>
      <td>
        <select value={user.role} onChange={(e) => events.updateRole(user.id, e.target.value)}>
          {['regular', 'villageSupervisor', 'generalSupervisor'].map((role) => (
            <option key={role} value={role}>
              {getRoleLabel(role)}
            </option>
          ))}
        </select>
      </td>
    </tr>
  )
}

export default UserTableRow
