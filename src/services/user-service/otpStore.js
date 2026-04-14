import { STORAGE_KEYS, loadValue, saveValue } from '../storageService'

// هذا الملف مسؤول عن تحميل وحفظ مخزن رموز OTP فقط.
export function loadOtpStore() {
  return loadValue(STORAGE_KEYS.otpStore, {})
}

export function saveOtpStore(store) {
  saveValue(STORAGE_KEYS.otpStore, store)
}
