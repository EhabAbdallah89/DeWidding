import NoticeBar from '../components/NoticeBar'

// هذه الصفحة مخصصة فقط لتغيير رقم الهاتف عبر OTP.
function ChangePhonePage({ store, events }) {
  const phoneChangeUsed = store.currentUser?.phoneChangeUsed ?? false

  return (
    <>
      <NoticeBar notice={events.notice} />

      <section className="panel profile-grid">
        <div className="profile-form-side">
          <div className="profile-phone-section">
            <div className="profile-row">
              <div className="otp-field-group">
                <input
                  type="text"
                  value={events.profileForm.pendingPhone}
                  placeholder="رقم الهاتف الجديد"
                  disabled={phoneChangeUsed}
                  onChange={(e) =>
                    events.setProfileForm({
                      ...events.profileForm,
                      pendingPhone: e.target.value,
                      phoneVerified: false,
                      phoneOtpSent: false,
                      phoneOtp: '',
                      phoneOtpCodePreview: '',
                    })
                  }
                />

                {!phoneChangeUsed && (
                  <button
                    type="button"
                    className="ghost-btn"
                    onClick={events.sendProfilePhoneOtp}
                  >
                    إرسال OTP
                  </button>
                )}
              </div>
            </div>

            <div className="profile-row">
              <div className="otp-field-group">
                <input
                  type="text"
                  value={events.profileForm.phoneOtp}
                  placeholder="رمز التحقق OTP"
                  disabled={phoneChangeUsed || !events.profileForm.phoneOtpSent}
                  onChange={(e) =>
                    events.setProfileForm({
                      ...events.profileForm,
                      phoneOtp: e.target.value,
                    })
                  }
                />

                {!phoneChangeUsed && (
                  <button
                    type="button"
                    className="ghost-btn"
                    onClick={events.verifyProfilePhoneOtp}
                    disabled={!events.profileForm.phoneOtpSent}
                  >
                    تأكيد OTP
                  </button>
                )}
              </div>
            </div>

            {!phoneChangeUsed && (
              <p className="msg info">يمكن تعديل رقم الهاتف مرة واحدة فقط</p>
            )}

            {events.profileForm.phoneOtpCodePreview && (
              <p className="msg success">
                رمز التحقق للتجربة: {events.profileForm.phoneOtpCodePreview}
              </p>
            )}

            <div className="button-row">
              <button
                type="button"
                className="ghost-btn"
                onClick={() => store.setCurrentPage('profile')}
              >
                رجوع
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ChangePhonePage