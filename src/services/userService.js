import { STORAGE_KEYS, loadValue, saveValue } from './storageService'
import { mockUsers } from '../auth/mockUsers'
import { User } from '../models/User'

export function loadUsers() {
  return loadValue(STORAGE_KEYS.usersData, mockUsers)
}

export function saveUsers(users) {
  saveValue(STORAGE_KEYS.usersData, users)
}

export function normalizePhone(phone = '') {
  return String(phone).replace(/\D/g, '')
}

export function normalizeEmail(email = '') {
  return String(email).trim().toLowerCase()
}

export function findUserByPhone(users, phone) {
  const normalizedPhone = normalizePhone(phone)
  return users.find((user) => normalizePhone(user.phone) === normalizedPhone)
}

export function registerUser(users, userData) {
  const phone = normalizePhone(userData.phone)
  const email = normalizeEmail(userData.email)

  const existingPhoneUser = users.find((user) => normalizePhone(user.phone) === phone)
  if (existingPhoneUser) {
    return { success: false, message: 'رقم الهاتف مسجل مسبقًا' }
  }

  if (email) {
    const existingEmailUser = users.find((user) => normalizeEmail(user.email) === email)
    if (existingEmailUser) {
      return { success: false, message: 'البريد الإلكتروني مسجل مسبقًا' }
    }
  }

  const newUser = User.create({
    ...userData,
    phone,
    email,
    role: 'regular',
    myEvents: [],
    phoneVerified: true,
  }).toJSON()

  return { success: true, user: newUser, users: [...users, newUser] }
}

export function loginWithPassword(users, phone, password) {
  const normalizedPhone = normalizePhone(phone)
  const normalizedPassword = String(password ?? '').trim()

  const user = users.find(
    (item) => normalizePhone(item.phone) === normalizedPhone && String(item.password ?? '').trim() === normalizedPassword,
  )

  if (!user) {
    return { success: false, message: 'رقم الهاتف أو كلمة المرور غير صحيحة' }
  }

  return { success: true, user }
}

export function loginWithOtp(users, phone) {
  const user = findUserByPhone(users, phone)
  if (!user) {
    return { success: false, message: 'رقم الهاتف غير موجود' }
  }

  return { success: true, user, message: 'تم تسجيل الدخول بنجاح عبر OTP' }
}

export function updateUserProfile(users, userId, payload) {
  return users.map((user) =>
    user.id === userId
      ? {
          ...user,
          name: payload.name,
          profileImage: payload.profileImage,
        }
      : user,
  )
}

export function updateUserRole(users, userId, role) {
  if (role === 'admin') {
    return users
  }

  return users.map((user) =>
    user.id === userId
      ? {
          ...user,
          role,
        }
      : user,
  )
}
