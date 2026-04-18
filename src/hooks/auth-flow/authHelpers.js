import { villages } from '../../data/seedData'
import { DEFAULT_USER_AVATAR } from '../../config/profileImages'
import { findUserByEmail } from '../../services/user-service/userFinders'
import { isValidEmail } from '../../utils/validation'
import { createUserInSupabase } from '../../services/supabaseUserService'
import { refreshUsersFromSupabase } from './helpers/userSyncHelpers'

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

  // 🔥 במקום patch לוקאלי → רענון מה־DB
  const refreshResult = await refreshUsersFromSupabase(store)

  if (!refreshResult.success) {
    return
  }

  const updatedUser = refreshResult.data.find(u => u.id === result.data.id)
  finish(updatedUser)
}

export async function handleEmailContinuation({ mode, emailForm, phoneForm, setMode, setMessage, store, finish }) {
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