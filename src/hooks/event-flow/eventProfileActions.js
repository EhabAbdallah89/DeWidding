import {
  sendOtpCode,
  verifyOtpCode,
  updateUserProfile,
  updateUserRole,
  updateUserVillage,
  removeUserProfileImage,
  updateUserProfileImage,
} from '../../services/userService'
import { prepareProfileImage } from '../../utils/imageHelpers'

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

  const updateRole = (userId, role) => {
    const result = updateUserRole(store.users, userId, role)
    if (!result.success) {
      writeNotice(result.message)
      return
    }

    patchUsers(result.users)
    writeNotice('', 'تم تحديث الدور')
  }

  const updateVillage = (userId, village) => {
    const result = updateUserVillage(store.users, userId, village)
    if (!result.success) {
      writeNotice(result.message)
      return
    }

    patchUsers(result.users)
    writeNotice('', 'تم تحديث القرية')
  }

  const updateMyImage = async (file) => {
    try {
      const profileImage = await prepareProfileImage(file)
      const result = updateUserProfileImage(store.users, store.currentUser.id, profileImage)

      if (!result.success) {
        writeNotice(result.message)
        return
      }

      patchUsers(result.users)
      setProfileForm((prev) => ({ ...prev, profileImage }))
      writeNotice('', 'تم تحديث الصورة الشخصية')
    } catch {
      writeNotice('فشل في معالجة الصورة')
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
const phone = (profileForm?.pendingPhone || '').trim()

    if (!phone) {
      writeNotice('رقم الهاتف مطلوب')
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

  const updateResult = updateUserProfile(store.users, store.currentUser.id, {
    name: store.currentUser?.name || '',
    email: store.currentUser?.email || '',
    phone: pendingPhone,
    profileImage: store.currentUser?.profileImage || '',
  })

  if (!updateResult.success) {
    writeNotice(updateResult.message)
    return
  }

  patchUsers(updateResult.users)

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