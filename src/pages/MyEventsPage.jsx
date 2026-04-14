import EventSection from '../components/EventSection'
import NoticeBar from '../components/NoticeBar'

// هذه الصفحة تعرض الأحداث المحفوظة للمستخدم الحالي.
function MyEventsPage({ store, events }) {
  return (
    <>
      <NoticeBar notice={events.notice} />
      <EventSection title="أعراسي القادمة" items={events.myEvents.upcoming} store={store} events={events} />
      <EventSection title="أعراسي السابقة" items={events.myEvents.past} store={store} events={events} />
    </>
  )
}

export default MyEventsPage
