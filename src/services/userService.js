import { STORAGE_KEYS, loadValue, saveValue } from './storageService'
import { mockUsers } from '../auth/mockUsers'
import { User } from '../models/User'
import { normalizeEmail,isValidPhone, normalizePhone, normalizeText, isValidEmail, isStrongEnoughPassword } from '../utils/validation'

function loadOtpStore() {
  return loadValue(STORAGE_KEYS.otpStore, {})
}

function saveOtpStore(store) {
  saveValue(STORAGE_KEYS.otpStore, store)
}

function normalizeUserPayload(user = {}) {
  return User.fromJSON({
    ...user,
    name: normalizeText(user.name),
    phone: normalizePhone(user.phone),
    email: normalizeEmail(user.email),
    village: normalizeText(user.village),
     // חשוב מאוד — לשמור את הערך
    phoneChangeUsed: user.phoneChangeUsed ?? false,
  }).toJSON()
  
}

export function loadUsers() {
  const storedUsers = loadValue(STORAGE_KEYS.usersData, mockUsers)
  const sourceUsers = Array.isArray(storedUsers) ? storedUsers : mockUsers
  return sourceUsers.map((user) => normalizeUserPayload(user))
}

export function saveUsers(users) {
  saveValue(STORAGE_KEYS.usersData, users.map((user) => normalizeUserPayload(user)))
}

export function findUserByPhone(users, phone) {
  const normalizedPhone = normalizePhone(phone)
  return users.find((user) => normalizePhone(user.phone) === normalizedPhone)
}

export function findUserByEmail(users, email) {
  const normalizedEmail = normalizeEmail(email)
  return users.find((user) => normalizeEmail(user.email) === normalizedEmail)
}

export function sendOtpCode(phone, purpose = 'login') {
  const code = `${Math.floor(100000 + Math.random() * 900000)}`
  const normalizedPhone = normalizePhone(phone)
  const store = loadOtpStore()
  store[`${purpose}:${normalizedPhone}`] = {
    code,
    createdAt: Date.now(),
  }
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

export function registerUser(users, userData) {
  const normalizedUserData = {
    ...userData,
    name: normalizeText(userData.name),
    phone: normalizePhone(userData.phone),
    email: normalizeEmail(userData.email),
    village: normalizeText(userData.village),
  }

  const existingPhone = findUserByPhone(users, normalizedUserData.phone)
  if (existingPhone) return { success: false, message: 'رقم الهاتف مسجل مسبقًا' }

  const existingEmail = findUserByEmail(users, normalizedUserData.email)
  if (existingEmail) return { success: false, message: 'البريد الإلكتروني مسجل مسبقًا' }

  if (!normalizedUserData.phoneVerified) return { success: false, message: 'يجب توثيق رقم الهاتف قبل التسجيل' }

  const newUser = User.create({
    ...normalizedUserData,
    role: 'regular',
    myEvents: [],
    phoneVerified: true,
  }).toJSON()

  return { success: true, user: newUser, users: [...users, newUser] }
}

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
  const name = normalizeText(payload.name)
  const email = normalizeEmail(payload.email)
  const phone = normalizeText(payload.phone)

  const currentUser = users.find((user) => user.id === userId)

  if (!currentUser) {
    return { success: false, message: 'المستخدم غير موجود' }
  }

  if (!name) {
    return { success: false, message: 'الاسم مطلوب' }
  }

  if (!email) {
    return { success: false, message: 'البريد الإلكتروني مطلوب' }
  }

  if (!isValidEmail(email)) {
    return { success: false, message: 'البريد الإلكتروني غير صحيح' }
  }

  if (!phone) {
    return { success: false, message: 'رقم الهاتف مطلوب' }
  }

  if (!isValidPhone(phone)) {
    return { success: false, message: 'رقم الهاتف غير صحيح' }
  }

  const existingEmail = users.find(
    (user) => user.id !== userId && normalizeEmail(user.email) === email
  )
  if (existingEmail) {
    return { success: false, message: 'البريد الإلكتروني مستخدم من قبل مستخدم آخر' }
  }

  const existingPhone = users.find(
    (user) => user.id !== userId && normalizeText(user.phone) === phone
  )
  if (existingPhone) {
    return { success: false, message: 'رقم الهاتف مستخدم من قبل مستخدم آخر' }
  }

  const phoneChanged = phone !== normalizeText(currentUser.phone)
  const phoneChangeUsed = currentUser.phoneChangeUsed ?? false

  if (phoneChanged && phoneChangeUsed) {
    return { success: false, message: 'يمكن تعديل رقم الهاتف مرة واحدة فقط' }
  }

  return {
    success: true,
    users: users.map((user) =>
      user.id === userId
        ? {
            ...user,
            name,
            email,
            phone,
            profileImage: payload.profileImage,
            phoneChangeUsed: phoneChanged ? true : (user.phoneChangeUsed ?? false),
          }
        : user
    ),
  }
}
export function updateUserVillage(users, targetUserId, village) {
  const nextVillage = normalizeText(village)
  if (!nextVillage) {
    return { success: false, message: 'القرية مطلوبة' }
  }

  return {
    success: true,
    users: users.map((user) =>
      user.id === targetUserId
        ? {
            ...user,
            village: nextVillage,
          }
        : user
    ),
  }
}

export function updateUserRole(users, targetUserId, newRole) {
  const allowedRoles = ['regular', 'villageSupervisor', 'generalSupervisor']
  if (!allowedRoles.includes(newRole)) {
    return { success: false, message: 'نوع الدور غير مسموح' }
  }

  return {
    success: true,
    users: users.map((user) => (user.id === targetUserId ? { ...user, role: newRole } : user)),
  }
}

export function resetPasswordWithEmail(users, payload) {
  const email = normalizeEmail(payload.email)
  const phone = normalizePhone(payload.phone)
  const { newPassword } = payload
  const user = users.find((item) => normalizeEmail(item.email) === email && normalizePhone(item.phone) === phone)
  if (!user) return { success: false, message: 'بيانات التحقق غير صحيحة' }
  if (!isStrongEnoughPassword(newPassword)) return { success: false, message: 'كلمة المرور الجديدة ضعيفة' }

  return {
    success: true,
    users: users.map((item) => (item.id === user.id ? { ...item, password: newPassword } : item)),
    message: 'تم تغيير كلمة المرور بنجاح',
  }
}

export function updateUserProfileImage(users, userId, profileImage) {
  const targetUser = users.find((user) => user.id === userId)

  if (!targetUser) {
    return {
      success: false,
      message: 'المستخدم غير موجود',
    }
  }

  const updatedUsers = users.map((user) =>
    user.id === userId
      ? { ...user, profileImage }
      : user
  )

  return {
    success: true,
    users: updatedUsers,
  }
}
export function removeUserProfileImage(users, userId) {
  const targetUser = users.find((user) => user.id === userId)

  if (!targetUser) {
    return { success: false, message: 'المستخدم غير موجود' }
  }

  const updatedUsers = users.map((user) =>
    user.id === userId ? { ...user, profileImage: '' } : user
  )

  return {
    success: true,
    users: updatedUsers,
    user: updatedUsers.find((user) => user.id === userId),
  }
}