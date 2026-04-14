import { useAuthFlow } from '../hooks/useAuthFlow'
import { useAppStore } from '../hooks/useAppStore'
import { useEventFlow } from '../hooks/useEventFlow'
import MemberLayout from '../layouts/MemberLayout'
import PublicLayout from '../layouts/PublicLayout'
import DashboardPage from '../pages/DashboardPage'
import MyEventsPage from '../pages/MyEventsPage'
import ProfilePage from '../pages/ProfilePage'
import PublicPage from '../pages/PublicPage'
import UsersPage from '../pages/UsersPage'
import ChangePhonePage from '../pages/ChangePhonePage'

// هذا المكون هو الموزّع الرئيسي بين الواجهة العامة والواجهة الداخلية.
function AppView() {
  // ==============================
  // ربط الطبقات الرئيسية
  // ==============================
  const store = useAppStore()
  const auth = useAuthFlow(store)
  const events = useEventFlow(store)

  // ==============================
  // حارس الدخول
  // ==============================
  if (!store.currentUser) {
    return (
      <PublicLayout>
        <PublicPage auth={auth} />
      </PublicLayout>
    )
  }

  // ==============================
  // خريطة الصفحات الداخلية
  // ==============================
 const pages = {
  dashboard: <DashboardPage store={store} events={events} />,
  myEvents: <MyEventsPage store={store} events={events} />,
  profile: <ProfilePage store={store} events={events} />,
  changePhone: <ChangePhonePage store={store} events={events} />,
  users: <UsersPage store={store} events={events} />,
  pending: <DashboardPage store={store} events={events} />,
}

  return (
    <MemberLayout store={store}>
      {pages[store.currentPage] || pages.dashboard}
    </MemberLayout>
  )
}

export default AppView
