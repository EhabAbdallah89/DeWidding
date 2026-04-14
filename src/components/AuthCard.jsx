import AuthEmailProfileStep from './auth/AuthEmailProfileStep'
import AuthMainStep from './auth/AuthMainStep'
import AuthMessages from './auth/AuthMessages'
import AuthPhoneProfileStep from './auth/AuthPhoneProfileStep'
import AuthPhoneStep from './auth/AuthPhoneStep'
import AuthVillagesList from './auth/AuthVillagesList'

// هذا المكون هو الغلاف العام لشاشة الدخول والتسجيل.
// يتم هنا فقط اختيار الخطوة المناسبة حسب الوضع الحالي.
function AuthCard({ auth }) {
  const isEmailProfileMode = auth.mode === 'emailProfile'
  const isPhoneMode = auth.mode === 'phone'
  const isPhoneProfileMode = auth.mode === 'phoneProfile'

  return (
    <section className="panel auth-panel">
      <h1 className="brand-title">DEWEDDING</h1>

      {!isEmailProfileMode && !isPhoneMode && !isPhoneProfileMode && <AuthMainStep auth={auth} />}
      {isEmailProfileMode && <AuthEmailProfileStep auth={auth} />}
      {isPhoneMode && <AuthPhoneStep auth={auth} />}
      {isPhoneProfileMode && <AuthPhoneProfileStep auth={auth} />}

      <AuthMessages message={auth.message} />
      <AuthVillagesList />
    </section>
  )
}

export default AuthCard
