// هذا الملف يعرض الاسم العربي لكل دور.
export function getRoleLabel(role) {
  if (role === 'admin') return 'مدير'
  if (role === 'generalSupervisor') return 'مشرف عام'
  if (role === 'villageSupervisor') return 'مشرف قرية'
  if (role === 'regular') return 'مستخدم'
  return role
}
