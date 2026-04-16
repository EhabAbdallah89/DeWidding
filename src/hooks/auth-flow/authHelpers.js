import { villages } from '../../data/seedData'
import { DEFAULT_USER_AVATAR } from '../../config/profileImages'
import { findUserByEmail, findUserByPhone } from '../../services/user-service/userFinders'
import { sendOtpCode, verifyOtpCode } from '../../services/userService'
import { isValidEmail, isValidPhone } from '../../utils/validation'
import { createUserInSupabase } from '../../services/supabaseUserService'
// هذه المجموعة تحتوي على دوال مساعدة نقية لمسار التحقق.
export function finishAuth(store, clear, resetEmailForm, resetPhoneForm, user, emailDraft, phoneDraft) {
  store.setCurrentUserId(user.id)
  clear()
  resetEmailForm(emailDraft)
  resetPhoneForm(phoneDraft)
}

export async function createSocialUser(store, finish, label, email) {
  const existingUser = findUserByEmail(store.users, email)
  if (existingUser) {
    finish(existingUser)
    return
  }

  const result = await createUserInSupabase({
    name: `${label} User`,
    email,
    phone: `05${String(Date.now()).slice(-8)}`,
    village: villages[0],
    password: '',
    profileImage: DEFAULT_USER_AVATAR,
    phoneVerified: true,
  })

  if (!result.success) {
    return
  }

  store.setUsers((prev) => [...prev, result.data])
  finish(result.data)
}

export async  function handleEmailContinuation({ mode, emailForm, phoneForm, setMode, setMessage, store, finish }) {
  if (mode === 'emailProfile') {
    if (!emailForm.name.trim()) {
      setMessage({ error: 'الاسم الكامل مطلوب', success: '' })
      return
    }

    if (!emailForm.village.trim()) {
      setMessage({ error: 'القرية مطلوبة', success: '' })
      return
    }

const result = await createUserInSupabase({
  name: emailForm.name,
  email: emailForm.email,
  village: emailForm.village,
  password: '',
  phone: `05${String(Date.now()).slice(-8)}`,
  profileImage: DEFAULT_USER_AVATAR,
  phoneVerified: true,
})

   if (result.success) {
  store.setUsers((prev) => [...prev, result.data])
  finish(result.data)
  return
}

    setMessage({ error: result.message, success: '' })
    return
  }

  if (!isValidEmail(emailForm.email)) {
    setMessage({ error: 'يرجى إدخال بريد إلكتروني صحيح', success: '' })
    return
  }

  const existingUser = findUserByEmail(store.users, emailForm.email)
  if (existingUser) {
    finish(existingUser)
    return
  }

  setMode('emailProfile')
  setMessage({ error: '', success: 'أكمل بيانات الحساب للمتابعة' })
}

export function handlePhoneOtpSend({ phoneForm, setPhoneForm, setMessage }) {
  if (!isValidPhone(phoneForm.phone)) {
    setMessage({ error: 'رقم الهاتف غير صحيح', success: '' })
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
    password: '',
    profileImage: '',
    phoneVerified: true,
  })

  if (result.success) {
    store.setUsers((prev) => [...prev, result.data])
    finish(result.data)
    return
  }

  setMessage({ error: result.message, success: '' })
}
