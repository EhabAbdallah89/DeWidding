import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import OtpLoginForm from './OtpLoginForm'
function AuthPanel(props) {
  const { registerData, onRegisterChange, onRegisterImageChange, onRegisterSubmit, registerError, registerSuccess, loginData, onLoginChange, onLoginSubmit, loginError, loginSuccess, otpPhone, onOtpPhoneChange, onOtpSubmit, otpError, otpSuccess } = props
  return (
    <div className="hero">
      <div className="hero-box">
        <h2 className="card-title">منصة إدارة الأعراس والأحداث</h2>
        <p className="card-subtitle">بدون Firebase حاليًا: تسجيل محلي، صلاحيات، اعتماد أولي.</p>
        <div><span className="pill">تسجيل</span><span className="pill">دخول</span><span className="pill">صلاحيات</span><span className="pill">قرية افتراضية</span></div>
      </div>
      <div>
        <LoginForm loginData={loginData} onChange={onLoginChange} onSubmit={onLoginSubmit} errorMessage={loginError} successMessage={loginSuccess} />
        <OtpLoginForm otpPhone={otpPhone} onChange={onOtpPhoneChange} onSubmit={onOtpSubmit} errorMessage={otpError} successMessage={otpSuccess} />
      </div>
      <div style={{ gridColumn:'1 / -1' }}>
        <RegisterForm registerData={registerData} onChange={onRegisterChange} onImageChange={onRegisterImageChange} onSubmit={onRegisterSubmit} errorMessage={registerError} successMessage={registerSuccess} />
      </div>
    </div>
  )
}
export default AuthPanel
