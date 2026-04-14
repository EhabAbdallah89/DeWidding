import { useEffect } from 'react'
import { DEFAULT_USER_AVATAR } from '../config/profileImages'

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
  // معالج اختيار الصورة
  // ==============================
  
const handleImageChange = (event) => {
  const file = event.target.files?.[0]

  if (!file) return

  events.updateMyImage(file)
}


const phoneChangeUsed = store.currentUser?.phoneChangeUsed ?? false

return (
  <section className="panel profile-grid">
    <div className="profile-form-side">
      {/* السطر الأول: الاسم */}
      <input
        type="text"
        value={events.profileForm.name}
        placeholder="الاسم الكامل"
        onChange={(e) =>
          events.setProfileForm({
            ...events.profileForm,
            name: e.target.value,
          })
        }
      />

      {/* السطر الثاني: الهاتف + OTP */}
    <div className="profile-row">
  <input value={store.currentUser?.phone || ''} disabled />

  <button
    type="button"
    className="ghost-btn"
    disabled={phoneChangeUsed}
    onClick={() => {
      const confirmed = window.confirm('يمكن تعديل رقم الهاتف مرة واحدة فقط، هل أنت متأكد؟')
      if (confirmed) {
        store.setCurrentPage('changePhone')
      }
    }}
  >
    تغيير رقم الهاتف
  </button>
</div>

{phoneChangeUsed && (
  <p className="msg error">تم استخدام فرصة تغيير رقم الهاتف</p>
)}

      {/* السطر الثالث: البريد الإلكتروني + رفع الصورة */}
      <div className="profile-row">
        <input
          type="text"
          value={events.profileForm.email}
          placeholder="البريد الإلكتروني"
          onChange={(e) =>
            events.setProfileForm({
              ...events.profileForm,
              email: e.target.value,
            })
          }
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      {/* السطر الأخير: القرية + الحفظ */}
      <div className="profile-row">
        <input value={store.currentUser?.village || ''} disabled />

        <button className="primary-btn" onClick={events.saveProfile}>
          حفظ الملف الشخصي
        </button>
      </div>

     
    </div>

    <div className="profile-image-side">
      <img
        src={store.currentUser?.profileImage || DEFAULT_USER_AVATAR}
        width="100"
        height="100"
        style={{ borderRadius: '50%', objectFit: 'cover' }}
      />
    </div>
  </section>
)
}

export default ProfileCard
