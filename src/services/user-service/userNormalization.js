import { User } from '../../models/User'
import { normalizeEmail, normalizePhone, normalizeText } from '../../utils/validation'

// هذا الملف يجمع تطبيع بيانات المستخدم قبل التخزين.
export function normalizeUserPayload(user = {}) {
  return User.fromJSON({
    ...user,
    name: normalizeText(user.name),
    phone: normalizePhone(user.phone),
    email: normalizeEmail(user.email),
    village: normalizeText(user.village),
    phoneChangeUsed: user.phoneChangeUsed ?? false,
  }).toJSON()
}

export function normalizeRegistrationPayload(userData = {}) {
  return {
    ...userData,
    name: normalizeText(userData.name),
    phone: normalizePhone(userData.phone),
    email: normalizeEmail(userData.email),
    village: normalizeText(userData.village),
  }
}
