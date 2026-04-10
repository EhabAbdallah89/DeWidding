import { STORAGE_KEYS, loadValue, saveValue } from './storageService'
import { mockUsers } from '../auth/mockUsers'
import { User } from '../models/User'

export function loadUsers() {
  return loadValue(STORAGE_KEYS.usersData, mockUsers)
}

export function saveUsers(users) {
  saveValue(STORAGE_KEYS.usersData, users)
}

export function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '')
}

export function isValidIsraeliMobile(phone) {
  return /^05\d{8}$/.test(normalizePhone(phone))
}

export function findUserByPhone(users, phone) {
  const normalizedPhone = normalizePhone(phone)
  return users.find((user) => normalizePhone(user.phone) === normalizedPhone)
}

export function registerUser(users, userData) {
  const normalizedPhone = normalizePhone(userData.phone)

  if (!userData.name.trim() || !normalizedPhone || !userData.village) {
    return { success: false, message: 'يرجى تعبئة جميع الحقول المطلوبة' }
  }

  if (!isValidIsraeliMobile(normalizedPhone)) {
    return { success: false, message: 'رقم الهاتف غير صحيح' }
  }

  const existingUser = findUserByPhone(users, normalizedPhone)
  if (existingUser) {
    return { success: false, message: 'رقم الهاتف مسجل مسبقًا' }
  }

  const newUser = User.create({
    name: userData.name.trim(),
    phone: normalizedPhone,
    village: userData.village,
    role: 'user',
    myEvents: [],
    phoneVerified: false,
    profileImage: userData.profileImage || '',
    avatarMode: userData.profileImage ? 'local' : 'default',
  }).toJSON()

  return { success: true, user: newUser, users: [...users, newUser] }
}

export function loginWithOtp(users, phone) {
  const user = findUserByPhone(users, phone)
  if (!user) {
    return { success: false, message: 'رقم الهاتف غير موجود' }
  }

  return { success: true, user }
}

export function markPhoneVerified(users, userId) {
  return users.map((user) => (user.id === userId ? { ...user, phoneVerified: true } : user))
}

export function updateUserProfile(users, userId, payload) {
  return users.map((user) =>
    user.id === userId
      ? {
          ...user,
          name: payload.name,
          profileImage: payload.profileImage,
          avatarMode: payload.profileImage ? 'local' : 'default',
        }
      : user,
  )
}

export function updateUserRole(users, userId, nextRole) {
  return users.map((user) => (user.id === userId ? { ...user, role: nextRole } : user))
}

export function toggleMyEventForUser(users, userId, eventId) {
  return users.map((user) => {
    if (user.id !== userId) return user
    const alreadyExists = user.myEvents.includes(eventId)
    return {
      ...user,
      myEvents: alreadyExists ? user.myEvents.filter((id) => id !== eventId) : [...user.myEvents, eventId],
    }
  })
}
