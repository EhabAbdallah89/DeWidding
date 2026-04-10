import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import OtpLoginForm from './OtpLoginForm'

function AuthPanel(props) {
  const {
    registerData,
    onRegisterChange,
    onRegisterImageChange,
    onRegisterSubmit,
    onRegisterReset,
    onSendRegisterOtp,
    onVerifyRegisterOtp,
    onRegisterOtpCodeChange,
    registerError,
    registerSuccess,
    registerOtpMeta,
    loginData,
    onLoginChange,
    onLoginSubmit,
    loginError,
    loginSuccess,
    otpPhone,
    onOtpPhoneChange,
    onOtpSubmit,
    otpError,
    otpSuccess,
  } = props

  return (
    <div className="hero">
      <div className="hero-box">
        <h2 className="card-title">منصة إدارة الأعراس والأحداث</h2>
        <p className="card-subtitle">تسجيل محلي، صلاحيات، اعتماد أولي، وواجهة قابلة للربط لاحقًا مع Firebase.</p>
        <div><span className="pill">تسجيل</span><span className="pill">OTP</span><span className="pill">صلاحيات</span><span className="pill">قرية افتراضية</span></div>
      </div>
      <div>
        <LoginForm loginData={loginData} onChange={onLoginChange} onSubmit={onLoginSubmit} errorMessage={loginError} successMessage={loginSuccess} />
        <OtpLoginForm otpPhone={otpPhone} onChange={onOtpPhoneChange} onSubmit={onOtpSubmit} errorMessage={otpError} successMessage={otpSuccess} />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <RegisterForm
          registerData={registerData}
          onChange={onRegisterChange}
          onImageChange={onRegisterImageChange}
          onSubmit={onRegisterSubmit}
          onReset={onRegisterReset}
          onSendOtp={onSendRegisterOtp}
          onVerifyOtp={onVerifyRegisterOtp}
          onOtpCodeChange={onRegisterOtpCodeChange}
          errorMessage={registerError}
          successMessage={registerSuccess}
          otpMeta={registerOtpMeta}
        />
      </div>
    </div>
  )
}

export default AuthPanel
