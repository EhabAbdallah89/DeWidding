import { STORAGE_KEYS, loadValue, saveValue, removeValue } from './storageService'

function generateOtpCode() {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export function createOtpSession(phone) {
  const otpSession = {
    phone,
    code: generateOtpCode(),
    expiresAt: Date.now() + 3 * 60 * 1000,
    createdAt: Date.now(),
  }

  saveValue(STORAGE_KEYS.otpDraft, otpSession)
  return otpSession
}

export function getOtpSession() {
  return loadValue(STORAGE_KEYS.otpDraft, null)
}

export function clearOtpSession() {
  removeValue(STORAGE_KEYS.otpDraft)
}

export function verifyOtpCode(phone, code) {
  const currentSession = getOtpSession()

  if (!currentSession || currentSession.phone !== phone) {
    return { success: false, message: 'لا توجد جلسة OTP صالحة لهذا الرقم' }
  }

  if (Date.now() > currentSession.expiresAt) {
    clearOtpSession()
    return { success: false, message: 'انتهت صلاحية رمز التحقق، اطلب رمزًا جديدًا' }
  }

  if (String(code).trim() !== String(currentSession.code)) {
    return { success: false, message: 'رمز التحقق غير صحيح' }
  }

  clearOtpSession()
  return { success: true, message: 'تم التحقق من الرمز بنجاح' }
}
