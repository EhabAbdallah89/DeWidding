import { useEffect } from 'react'
import ProfileEmailImageRow from './profile/ProfileEmailImageRow'
import ProfileFooterRow from './profile/ProfileFooterRow'
import ProfileImagePreview from './profile/ProfileImagePreview'
import ProfileNameField from './profile/ProfileNameField'
import ProfilePhoneRow from './profile/ProfilePhoneRow'

// هذا المكون يعرض الملف الشخصي ويعزل منطق تعبئة النموذج عن العرض.
function ProfileCard({ store, events }) {
  // ==============================
  // مزامنة بيانات المستخدم الحالية مع نموذج الملف الشخصي
  // ==============================
  useEffect(() => {
    events.setProfileForm({
      name: store.currentUser?.name || '',
      phone: store.currentUser?.phone || '',
      email: store.currentUser?.email || '',
      profileImage: store.currentUser?.profileImage || '',
      pendingPhone: store.currentUser?.phone || '',
      phoneOtp: '',
      phoneOtpSent: false,
      phoneVerified: false,
    })
  }, [
    store.currentUser?.id,
    store.currentUser?.name,
    store.currentUser?.phone,
    store.currentUser?.email,
    store.currentUser?.profileImage,
  ])

  // ==============================
  // معالجات داخلية
  // ==============================
  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    events.updateMyImage(file)
  }

  const updateProfileName = (name) => {
    events.setProfileForm({ ...events.profileForm, name })
  }

  const updateProfileEmail = (email) => {
    events.setProfileForm({ ...events.profileForm, email })
  }

  const openPhoneChange = () => {
    const confirmed = window.confirm('يمكن تعديل رقم الهاتف مرة واحدة فقط، هل أنت متأكد؟')
    if (confirmed) {
      store.setCurrentPage('changePhone')
    }
  }

  const phoneChangeUsed = store.currentUser?.phoneChangeUsed ?? false

  return (
    <section className="panel profile-grid">
      <div className="profile-form-side">
        <ProfileNameField value={events.profileForm.name} onChange={updateProfileName} />
        <ProfilePhoneRow phone={store.currentUser?.phone} disabled={phoneChangeUsed} onChangePhone={openPhoneChange} />
        {phoneChangeUsed && <p className="msg error">تم استخدام فرصة تغيير رقم الهاتف</p>}
        <ProfileEmailImageRow email={events.profileForm.email} onEmailChange={updateProfileEmail} onImageChange={handleImageChange} />
        <ProfileFooterRow village={store.currentUser?.village} onSave={events.saveProfile} />
      </div>

      <ProfileImagePreview image={store.currentUser?.profileImage} />
    </section>
  )
}

export default ProfileCard
