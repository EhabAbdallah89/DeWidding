export function normalizeText(value = '') {
  return `${value}`.trim()
}

export function normalizePhone(value = '') {
  return normalizeText(value)
}

export function normalizeEmail(value = '') {
  return normalizeText(value).toLowerCase()
}

export function isValidPhone(phone = '') {
  return /^05\d{8}$/.test(normalizePhone(phone))
}

export function isValidEmail(email = '') {
  return /^\S+@\S+\.\S+$/.test(normalizeEmail(email))
}

export function isStrongEnoughPassword(password = '') {
  return `${password}`.length >= 6
}
