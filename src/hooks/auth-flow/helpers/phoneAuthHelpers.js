import { DEFAULT_USER_AVATAR } from '../../../config/profileImages'
import { isValidEmail, isValidPhone } from '../../../utils/validation'
import { createUserInSupabase } from '../../../services/supabaseUserService'
import { refreshUsersFromSupabase } from './userSyncHelpers'
import { findUserByPhone } from '../../../services/user-service/userFinders'
import { sendOtpCode, verifyOtpCode } from '../../../services/userService'
export function handlePhoneOtpSend({ store, phoneForm, setPhoneForm, setMessage, finish }) {
  if (!isValidPhone(phoneForm.phone)) {
    setMessage({ error: 'رقم الهاتف غير صحيح', success: '' })
    return
  }

  const existingUser = findUserByPhone(store.users, phoneForm.phone)

  if (existingUser) {
    if (!phoneForm.password?.trim()) {
      setMessage({ error: 'يرجى إدخال كلمة المرور', success: '' })
      return
    }

    if (existingUser.password !== phoneForm.password) {
      setMessage({ error: 'كلمة المرور غير صحيحة', success: '' })
      return
    }

    finish(existingUser)
    return
  }

  if (!phoneForm.password?.trim()) {
    setMessage({ error: 'يرجى اختيار كلمة مرور', success: '' })
    return
  }

  if (!phoneForm.consent) {
    setMessage({ error: 'يجب الموافقة على استلام رسائل التحقق قبل المتابعة', success: '' })
    return
  }

  const result = sendOtpCode(phoneForm.phone, 'login')
  setPhoneForm((prev) => ({ ...prev, sentCode: result.code }))
  setMessage({ error: '', success: 'تم تجهيز رمز التحقق للاختبار' })
}

export function handlePhoneOtpVerification({ store, phoneForm, setMode, setMessage, finish }) {
  const otpResult = verifyOtpCode(phoneForm.phone, phoneForm.otp, 'login')

  if (!otpResult.success) {
    setMessage({ error: otpResult.message, success: '' })
    return
  }

  const existingUser = findUserByPhone(store.users, phoneForm.phone)
  if (existingUser) {
    finish(existingUser)
    return
  }

  setMode('phoneProfile')
  setMessage({ error: '', success: 'أكمل بيانات حساب الهاتف' })
}


export async function handlePhoneUserCreation({ store, phoneForm, setMessage, finish }) {
  if (!phoneForm.name.trim()) {
    setMessage({ error: 'الاسم مطلوب', success: '' })
    return
  }

  if (phoneForm.email && !isValidEmail(phoneForm.email)) {
    setMessage({ error: 'البريد الإلكتروني غير صحيح', success: '' })
    return
  }

const result = await createUserInSupabase({
  ...phoneForm,
  email: phoneForm.email || `phone.${Date.now()}@dewedding.local`,
  password: phoneForm.password,
  profileImage: DEFAULT_USER_AVATAR,
  phoneVerified: true,
})

 if (result.success) {
  const refreshResult = await refreshUsersFromSupabase(store)

  if (!refreshResult.success) {
    setMessage({ error: refreshResult.message, success: '' })
    return
  }

  const updatedUser = refreshResult.data.find((u) => u.id === result.data.id)
  finish(updatedUser)
  return
}

  setMessage({ error: result.message, success: '' })
}