import { getRoleLabel } from '../../utils/permissions'

const roles = ['regular', 'villageSupervisor', 'generalSupervisor']

// هذا الحقل يغيّر دور المستخدم من لوحة الإدارة.
function UserRoleSelect({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {roles.map((role) => (
        <option key={role} value={role}>{getRoleLabel(role)}</option>
      ))}
    </select>
  )
}

export default UserRoleSelect
