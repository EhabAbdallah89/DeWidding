import EventFormCard from '../components/EventFormCard'
import EventSection from '../components/EventSection'
import FilterBar from '../components/FilterBar'
import NoticeBar from '../components/NoticeBar'
import StatGrid from '../components/StatGrid'

// هذه الصفحة هي لوحة التحكم الرئيسية بعد تسجيل الدخول.
function DashboardPage({ store, events }) {
  // ==============================
  // تحديد مصدر البيانات حسب الدور والصفحة الحالية
  // ==============================
  const isManagementRole =
    store.currentUser?.role === 'admin' ||
    store.currentUser?.role === 'generalSupervisor' ||
    store.currentUser?.role === 'villageSupervisor'

  const source = isManagementRole
    ? store.currentPage === 'dashboard'
      ? events.dashboard
      : events.pending
    : events.dashboard

  return (
    <>
      {store.currentUser?.role === 'admin' && <StatGrid counts={events.counts} />}
      <FilterBar store={store} />
      <EventFormCard store={store} events={events} />
      <NoticeBar notice={events.notice} />
      <EventSection title="الأحداث القادمة" items={source.upcoming} store={store} events={events} />
      <EventSection title="الأحداث السابقة" items={source.past} store={store} events={events} />
    </>
  )
}

export default DashboardPage
