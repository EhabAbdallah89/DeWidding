import RegisterForm from './RegisterForm'
import OtpLoginForm from './OtpLoginForm'

function AuthPanel(props) {
  const {
    registerData,
    onRegisterChange,
    onRegisterSubmit,
    registerError,
    registerSuccess,
    otpPhone,
    otpCode,
    otpStep,
    onOtpPhoneChange,
    onOtpCodeChange,
    onOtpRequest,
    onOtpVerify,
    otpError,
    otpSuccess,
    otpDebugCode,
  } = props

  return (
    <div className="hero">
      <div className="hero-box">
        <h2 className="card-title">منصة إدارة الأعراس والأحداث</h2>
        <p className="card-subtitle">النسخة الحالية تشمل أعراسي، فصل الأحداث القادمة/السابقة، إدارة المستخدمين، وOTP محلي جاهز قبل ربط Firebase.</p>
        <div><span className="pill">OTP</span><span className="pill">My Events</span><span className="pill">Admin</span><span className="pill">Avatar</span></div>
      </div>
      <div>
        <OtpLoginForm
          otpPhone={otpPhone}
          otpCode={otpCode}
          otpStep={otpStep}
          onPhoneChange={onOtpPhoneChange}
          onCodeChange={onOtpCodeChange}
          onRequestCode={onOtpRequest}
          onVerifyCode={onOtpVerify}
          errorMessage={otpError}
          successMessage={otpSuccess}
          otpDebugCode={otpDebugCode}
        />
      </div>
      <div style={{ gridColumn:'1 / -1' }}>
        <RegisterForm registerData={registerData} onChange={onRegisterChange} onSubmit={onRegisterSubmit} errorMessage={registerError} successMessage={registerSuccess} />
      </div>
    </div>
  )
}

export default AuthPanel
