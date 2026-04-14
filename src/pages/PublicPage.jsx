import AuthCard from '../components/AuthCard'

// هذه الصفحة هي نقطة الدخول العامة قبل تسجيل الدخول.
function PublicPage({ auth }) {
  return <AuthCard auth={auth} />
}

export default PublicPage
