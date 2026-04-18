import {
  sendOtpCode,
  verifyOtpCode,
  updateUserProfile,
  updateUserRole,
  updateUserVillage,
  removeUserProfileImage,
  updateUserProfileImage,
} from '../../services/userService'
import { refreshUsersFromSupabase } from '../auth-flow/helpers/userSyncHelpers'
import { isValidPhone } from '../../utils/validation'
import { uploadProfileImage } from '../../services/supabaseStorageService'
import { supabase } from '../../lib/supabaseClient'


// هذه الدالة تجمع كل ما يخص الملف الشخصي والمستخدمين و OTP.
export function createEventProfileActions({
  store,
  profileForm,
  setProfileForm,
  patchUsers,
  writeNotice,
}) {

  const saveProfileFromForm = (profileForm) => {
  const currentPhone = (store.currentUser?.phone || '').trim()
  const pendingPhone = (profileForm.pendingPhone || '').trim()
  const phoneChanged = pendingPhone && pendingPhone !== currentPhone

  if (phoneChanged && !profileForm.phoneVerified) {
    writeNotice('يجب تأكيد رقم الهاتف عبر OTP قبل الحفظ')
    return
  }

  const payload = {
    ...profileForm,
    phone: phoneChanged ? pendingPhone : currentPhone,
  }

  const result = updateUserProfile(store.users, store.currentUser.id, payload)
  if (!result.success) {
    writeNotice(result.message)
    return
  }

  patchUsers(result.users)

  setProfileForm((prev) => ({
    ...prev,
    phone: phoneChanged ? pendingPhone : currentPhone,
    pendingPhone: phoneChanged ? pendingPhone : currentPhone,
    phoneOtp: '',
    phoneOtpSent: false,
    phoneVerified: false,
    phoneOtpCodePreview: '',
  }))

  writeNotice('', 'تم حفظ الملف الشخصي')
}

const updateRole = async (userId, role) => {
  return store.updateUserRole(userId, role)
}

const updateVillage = async (userId, village) => {
  return updateUserVillage(userId, village)
}

 const updateMyImage = async (file) => {
  try {
    const uploadResult = await uploadProfileImage(file, store.currentUser.id)

    if (!uploadResult.success) {
      writeNotice(uploadResult.message)
      return
    }

    const result = updateUserProfileImage(store.users, store.currentUser.id, uploadResult.url)

    if (!result.success) {
      writeNotice(result.message)
      return
    }

    patchUsers(result.users)
    setProfileForm((prev) => ({ ...prev, profileImage: uploadResult.url }))
    writeNotice('', 'تم تحديث الصورة الشخصية')
  } catch {
    writeNotice('فشل في رفع الصورة')
  }
}

  const adminRemoveUserImage = (userId) => {
    const result = removeUserProfileImage(store.users, userId)
    if (!result.success) {
      writeNotice(result.message)
      return
    }

    patchUsers(result.users)
    writeNotice('', 'تم حذف صورة المستخدم')
  }
const sendProfilePhoneOtp = () => {
  const currentPhone = (store.currentUser?.phone || '').trim()
  const phone = (profileForm?.pendingPhone || '').trim()

  if (!phone) {
    writeNotice('رقم الهاتف مطلوب')
    return
  }

  if (!isValidPhone(phone)) {
    writeNotice('رقم الهاتف غير صحيح')
    return
  }

  if (phone === currentPhone) {
    writeNotice('رقم الهاتف الجديد مطابق للرقم الحالي')
    return
  }

  const phoneTaken = store.users.some(
    (user) => user.id !== store.currentUser.id && (user.phone || '').trim() === phone
  )

  if (phoneTaken) {
    writeNotice('رقم الهاتف مستخدم من قبل مستخدم آخر')
    return
  }

  const result = sendOtpCode(phone, 'profile-phone-change')

  setProfileForm((prev) => ({
    ...prev,
    phoneOtpSent: true,
    phoneVerified: false,
    phoneOtpCodePreview: result.code,
  }))

  writeNotice('', 'تم إرسال رمز التحقق')
}

const verifyProfilePhoneOtp = () => {
  const currentPhone = (store.currentUser?.phone || '').trim()
  const pendingPhone = (profileForm?.pendingPhone || '').trim()
  const otp = (profileForm?.phoneOtp || '').trim()

  if (!pendingPhone || !otp) {
    writeNotice('يرجى إدخال رقم الهاتف ورمز التحقق')
    return
  }

  if (pendingPhone === currentPhone) {
    writeNotice('رقم الهاتف الجديد مطابق للرقم الحالي')
    return
  }

  const result = verifyOtpCode(pendingPhone, otp, 'profile-phone-change')

  if (!result.success) {
    writeNotice(result.message)
    return
  }

  const updatedUsers = store.users.map((user) =>
    user.id === store.currentUser.id
      ? {
          ...user,
          phone: pendingPhone,
          phoneChangeUsed: true,
        }
      : user
  )

  patchUsers(updatedUsers)

  setProfileForm((prev) => ({
    ...prev,
    phone: pendingPhone,
    pendingPhone: pendingPhone,
    phoneOtp: '',
    phoneOtpSent: false,
    phoneVerified: true,
    phoneOtpCodePreview: '',
  }))

  writeNotice('', 'تم تغيير رقم الهاتف بنجاح')
}

  return {
    saveProfileFromForm,
    updateRole,
    updateVillage,
    updateMyImage,
    adminRemoveUserImage,
    sendProfilePhoneOtp,
    verifyProfilePhoneOtp,
  }
}