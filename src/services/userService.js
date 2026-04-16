import { normalizeEmail, normalizePhone } from '../utils/validation'
import { findUserByEmail, findUserByPhone } from './user-service/userFinders'
import { applyPasswordReset, applyProfileImageRemoval, applyProfileImageUpdate, applyProfileUpdate, applyRoleUpdate, applyVillageUpdate } from './user-service/userMutations'
import { loadOtpStore, saveOtpStore } from './user-service/otpStore'
import { validatePasswordReset, validateProfilePayload, validateRole, validateVillage } from './user-service/userValidators'
// import { mockUsers } from '../auth/mockUsers'
// import { User } from '../models/User'
// import { normalizeRegistrationPayload, normalizeUserPayload } from './user-service/userNormalization'
// import { STORAGE_KEYS, loadValue, saveValue } from './storageService'


// هذا الملف هو الواجهة العامة لخدمات المستخدمين.
// تم تقسيم التفاصيل إلى ملفات صغيرة للحفاظ على البساطة.

// export function loadUsers() {
//   const storedUsers = loadValue(STORAGE_KEYS.usersData, mockUsers)
//   const sourceUsers = Array.isArray(storedUsers) ? storedUsers : mockUsers
//   return sourceUsers.map((user) => normalizeUserPayload(user))
// }


// export function saveUsers(users) {
//   saveValue(STORAGE_KEYS.usersData, users.map((user) => normalizeUserPayload(user)))
// }

export { findUserByPhone, findUserByEmail }

export function sendOtpCode(phone, purpose = 'login') {
  const code = `${Math.floor(100000 + Math.random() * 900000)}`
  const normalizedPhone = normalizePhone(phone)
  const store = loadOtpStore()
  store[`${purpose}:${normalizedPhone}`] = { code, createdAt: Date.now() }
  saveOtpStore(store)
  return { success: true, code, message: 'تم إرسال رمز التحقق محليًا للاختبار' }
}

export function verifyOtpCode(phone, code, purpose = 'login') {
  const store = loadOtpStore()
  const key = `${purpose}:${normalizePhone(phone)}`
  const item = store[key]
  if (!item) return { success: false, message: 'لم يتم إرسال رمز لهذا الرقم' }
  if (item.code !== code) return { success: false, message: 'رمز التحقق غير صحيح' }
  delete store[key]
  saveOtpStore(store)
  return { success: true, message: 'تم التحقق من الرمز بنجاح' }
}

// export function registerUser(users, userData) {
//   const normalizedUserData = normalizeRegistrationPayload(userData)
//   const existingPhone = findUserByPhone(users, normalizedUserData.phone)
//   if (existingPhone) return { success: false, message: 'رقم الهاتف مسجل مسبقًا' }

//   const existingEmail = findUserByEmail(users, normalizedUserData.email)
//   if (existingEmail) return { success: false, message: 'البريد الإلكتروني مسجل مسبقًا' }

//   if (!normalizedUserData.phoneVerified) return { success: false, message: 'يجب توثيق رقم الهاتف قبل التسجيل' }

//   const newUser = User.create({
//     ...normalizedUserData,
//     role: 'regular',
//     myEvents: [],
//     phoneVerified: true,
//   }).toJSON()

//   return { success: true, user: newUser, users: [...users, newUser] }
// }

export function loginWithPassword(users, phone, password) {
  const normalizedPhone = normalizePhone(phone)
  const user = users.find((item) => normalizePhone(item.phone) === normalizedPhone && item.password === `${password}`)
  if (!user) return { success: false, message: 'رقم الهاتف أو كلمة المرور غير صحيحة' }
  return { success: true, user }
}

export function loginWithOtp(users, phone) {
  const normalizedPhone = normalizePhone(phone)
  const user = users.find((item) => normalizePhone(item.phone) === normalizedPhone)
  if (!user) return { success: false, message: 'رقم الهاتف غير موجود' }
  return { success: true, user, message: 'تم تسجيل الدخول عبر OTP بنجاح' }
}

export function updateUserProfile(users, userId, payload) {
  const validation = validateProfilePayload(users, userId, payload)
  if (!validation.success) return validation

  return {
    success: true,
    users: applyProfileUpdate(users, userId, {
      ...validation,
      profileImage: payload.profileImage,
    }),
  }
}

export function updateUserVillage(users, targetUserId, village) {
  const validation = validateVillage(village)
  if (!validation.success) return validation

  return {
    success: true,
    users: applyVillageUpdate(users, targetUserId, village),
  }
}

export function updateUserRole(users, targetUserId, newRole) {
  const validation = validateRole(newRole)
  if (!validation.success) return validation

  return {
    success: true,
    users: applyRoleUpdate(users, targetUserId, newRole),
  }
}

export function resetPasswordWithEmail(users, payload) {
  const email = normalizeEmail(payload.email)
  const phone = normalizePhone(payload.phone)
  const { newPassword } = payload
  const user = users.find((item) => normalizeEmail(item.email) === email && normalizePhone(item.phone) === phone)
  if (!user) return { success: false, message: 'بيانات التحقق غير صحيحة' }

  const validation = validatePasswordReset(newPassword)
  if (!validation.success) return validation

  return {
    success: true,
    users: applyPasswordReset(users, user.id, newPassword),
    message: 'تم تغيير كلمة المرور بنجاح',
  }
}

export function updateUserProfileImage(users, userId, profileImage) {
  const targetUser = users.find((user) => user.id === userId)
  if (!targetUser) return { success: false, message: 'المستخدم غير موجود' }

  return {
    success: true,
    users: applyProfileImageUpdate(users, userId, profileImage),
  }
}

export function removeUserProfileImage(users, userId) {
  const targetUser = users.find((user) => user.id === userId)
  if (!targetUser) return { success: false, message: 'المستخدم غير موجود' }

  const updatedUsers = applyProfileImageRemoval(users, userId)
  return {
    success: true,
    users: updatedUsers,
    user: updatedUsers.find((user) => user.id === userId),
  }
}
