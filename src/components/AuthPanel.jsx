import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import OtpLoginForm from './OtpLoginForm'
import ForgotPasswordForm from './ForgotPasswordForm'

function AuthPanel(props) {
  const {
    registerData,
    onRegisterChange,
    onRegisterImageChange,
    onSendRegisterOtp,
    onVerifyRegisterOtp,
    onRegisterSubmit,
    registerError,
    registerSuccess,
    registerOtpSentCode,
    registerPhoneVerified,
    loginData,
    onLoginChange,
    onLoginSubmit,
    loginError,
    loginSuccess,
    otpLoginData,
    onOtpLoginChange,
    onSendLoginOtp,
    onOtpLoginSubmit,
    otpError,
    otpSuccess,
    loginOtpSentCode,
    forgotPasswordData,
    onForgotPasswordChange,
    onForgotPasswordSubmit,
    forgotPasswordError,
    forgotPasswordSuccess,
  } = props

  return (
    <div className="hero">
      <div className="hero-box">
        <h2 className="card-title">منصة إدارة الأعراس والأحداث</h2>
        <p className="card-subtitle">تسجيل بحساب كامل، تحقق OTP محلي، وإدارة صلاحيات وأحداث.</p>
        <div>
          <span className="pill">OTP</span>
          <span className="pill">كلمة مرور</span>
          <span className="pill">صلاحيات</span>
          <span className="pill">أعراسي</span>
          <span className="pill">إعادة تعيين</span>
        </div>
      </div>
      <div>
        <LoginForm loginData={loginData} onChange={onLoginChange} onSubmit={onLoginSubmit} errorMessage={loginError} successMessage={loginSuccess} />
        <OtpLoginForm otpData={otpLoginData} onChange={onOtpLoginChange} onSendOtp={onSendLoginOtp} onSubmit={onOtpLoginSubmit} errorMessage={otpError} successMessage={otpSuccess} sentCode={loginOtpSentCode} />
      </div>
      <div style={{ gridColumn: '1 / -1' }}>
        <RegisterForm
          registerData={registerData}
          onChange={onRegisterChange}
          onImageChange={onRegisterImageChange}
          onSendOtp={onSendRegisterOtp}
          onVerifyOtp={onVerifyRegisterOtp}
          onSubmit={onRegisterSubmit}
          errorMessage={registerError}
          successMessage={registerSuccess}
          otpSentCode={registerOtpSentCode}
          otpVerified={registerPhoneVerified}
        />
        <ForgotPasswordForm
          formData={forgotPasswordData}
          onChange={onForgotPasswordChange}
          onSubmit={onForgotPasswordSubmit}
          errorMessage={forgotPasswordError}
          successMessage={forgotPasswordSuccess}
        />
      </div>
    </div>
  )
}

export default AuthPanel
