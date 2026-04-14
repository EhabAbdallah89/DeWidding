import UserAvatarCell from './UserAvatarCell'
import UserImageActionButton from './UserImageActionButton'
import UserRoleSelect from './UserRoleSelect'
import UserVillageSelect from './UserVillageSelect'

// هذا الصف مسؤول عن إدارة مستخدم واحد في جدول الإدارة.
function UserTableRow({ user, events }) {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.phone}</td>
      <td><UserAvatarCell image={user.profileImage} /></td>
      <td><UserImageActionButton onRemove={() => events.adminRemoveUserImage(user.id)} /></td>
      <td>{user.email}</td>
      <td><UserVillageSelect value={user.village} onChange={(value) => events.updateVillage(user.id, value)} /></td>
      <td><UserRoleSelect value={user.role} onChange={(value) => events.updateRole(user.id, value)} /></td>
    </tr>
  )
}

export default UserTableRow
