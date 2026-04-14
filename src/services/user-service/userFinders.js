import { normalizeEmail, normalizePhone } from '../../utils/validation'

// هذه الدوال تبحث عن مستخدمين حسب الهاتف أو البريد.
export function findUserByPhone(users, phone) {
  const normalizedPhone = normalizePhone(phone)
  return users.find((user) => normalizePhone(user.phone) === normalizedPhone)
}

export function findUserByEmail(users, email) {
  const normalizedEmail = normalizeEmail(email)
  return users.find((user) => normalizeEmail(user.email) === normalizedEmail)
}
