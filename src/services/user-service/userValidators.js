import { isStrongEnoughPassword, isValidEmail, isValidPhone, normalizeEmail, normalizeText } from '../../utils/validation'

// هذه الدوال تتحقق من صحة مدخلات المستخدم قبل التنفيذ.
export function validateProfilePayload(users, userId, payload) {
  const name = normalizeText(payload.name)
  const email = normalizeEmail(payload.email)
  const phone = normalizeText(payload.phone)
  const currentUser = users.find((user) => user.id === userId)

  if (!currentUser) return { success: false, message: 'المستخدم غير موجود' }
  if (!name) return { success: false, message: 'الاسم مطلوب' }
  if (!email) return { success: false, message: 'البريد الإلكتروني مطلوب' }
  if (!isValidEmail(email)) return { success: false, message: 'البريد الإلكتروني غير صحيح' }
  if (!phone) return { success: false, message: 'رقم الهاتف مطلوب' }
  if (!isValidPhone(phone)) return { success: false, message: 'رقم الهاتف غير صحيح' }

  const existingEmail = users.find((user) => user.id !== userId && normalizeEmail(user.email) === email)
  if (existingEmail) return { success: false, message: 'البريد الإلكتروني مستخدم من قبل مستخدم آخر' }

  const existingPhone = users.find((user) => user.id !== userId && normalizeText(user.phone) === phone)
  if (existingPhone) return { success: false, message: 'رقم الهاتف مستخدم من قبل مستخدم آخر' }

  const phoneChanged = phone !== normalizeText(currentUser.phone)
  const phoneChangeUsed = currentUser.phoneChangeUsed ?? false
  if (phoneChanged && phoneChangeUsed) return { success: false, message: 'يمكن تعديل رقم الهاتف مرة واحدة فقط' }

  return { success: true, currentUser, name, email, phone, phoneChanged }
}

export function validateVillage(nextVillage) {
  if (!normalizeText(nextVillage)) return { success: false, message: 'القرية مطلوبة' }
  return { success: true }
}

export function validateRole(newRole) {
  const allowedRoles = ['regular', 'villageSupervisor', 'generalSupervisor']
  if (!allowedRoles.includes(newRole)) return { success: false, message: 'نوع الدور غير مسموح' }
  return { success: true }
}

export function validatePasswordReset(newPassword) {
  if (!isStrongEnoughPassword(newPassword)) return { success: false, message: 'كلمة المرور الجديدة ضعيفة' }
  return { success: true }
}
