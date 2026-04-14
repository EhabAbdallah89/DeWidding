import NoticeBar from '../components/NoticeBar'
import ChangePhoneBackButton from '../components/profile/change-phone/ChangePhoneBackButton'
import ChangePhoneInputRow from '../components/profile/change-phone/ChangePhoneInputRow'
import ChangePhoneOtpRow from '../components/profile/change-phone/ChangePhoneOtpRow'
import ChangePhonePreviewCode from '../components/profile/change-phone/ChangePhonePreviewCode'

// هذه الصفحة مخصصة فقط لتغيير رقم الهاتف عبر OTP.
function ChangePhonePage({ store, events }) {
  const phoneChangeUsed = store.currentUser?.phoneChangeUsed ?? false

  const updatePendingPhone = (pendingPhone) => {
    events.setProfileForm({
      ...events.profileForm,
      pendingPhone,
      phoneVerified: false,
      phoneOtpSent: false,
      phoneOtp: '',
      phoneOtpCodePreview: '',
    })
  }

  const updateOtp = (phoneOtp) => {
    events.setProfileForm({
      ...events.profileForm,
      phoneOtp,
    })
  }

  return (
    <>
      <NoticeBar notice={events.notice} />

      <section className="panel profile-grid">
        <div className="profile-form-side">
          <div className="profile-phone-section">
            <ChangePhoneInputRow
              value={events.profileForm.pendingPhone}
              disabled={phoneChangeUsed}
              onChange={updatePendingPhone}
              onSendOtp={events.sendProfilePhoneOtp}
            />

            <ChangePhoneOtpRow
              value={events.profileForm.phoneOtp}
              enabled={!phoneChangeUsed && events.profileForm.phoneOtpSent}
              onChange={updateOtp}
              onVerify={events.verifyProfilePhoneOtp}
            />

            <ChangePhonePreviewCode
              code={events.profileForm.phoneOtpCodePreview}
              disabled={phoneChangeUsed}
            />

            <ChangePhoneBackButton onBack={() => store.setCurrentPage('profile')} />
          </div>
        </div>
      </section>
    </>
  )
}

export default ChangePhonePage
