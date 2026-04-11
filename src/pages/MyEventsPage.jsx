import EventTable from '../components/EventTable'
import { splitUpcomingAndPast } from '../utils/eventUtils'

function MyEventsPage({ currentUser, myEvents, usersById, onEditEvent, onDeleteEvent, onApproveEvent, onRejectEvent, onToggleSaveEvent, savedEventIds }) {
  const { upcoming, past } = splitUpcomingAndPast(myEvents)

  return (
    <>
      <div className="card">
        <h2 className="card-title">أعراسي</h2>
        <p className="card-subtitle">هذه قائمة الأحداث المحفوظة في حسابك</p>
      </div>

      <div className="card">
        <h3 className="section-title">الأعراس القادمة</h3>
        <p className="card-subtitle">من تاريخ اليوم وما بعده — مرتبة من الأقرب إلى الأبعد</p>
        <EventTable events={upcoming} currentUser={currentUser} usersById={usersById} onEditEvent={onEditEvent} onDeleteEvent={onDeleteEvent} onApproveEvent={onApproveEvent} onRejectEvent={onRejectEvent} onToggleSaveEvent={onToggleSaveEvent} savedEventIds={savedEventIds} showCreatedBy={currentUser?.role === 'admin'} />
      </div>

      <div className="card">
        <h3 className="section-title">الأعراس السابقة</h3>
        <p className="card-subtitle">الأحداث الماضية — مرتبة من الأحدث إلى الأقدم</p>
        <EventTable events={past} currentUser={currentUser} usersById={usersById} onEditEvent={onEditEvent} onDeleteEvent={onDeleteEvent} onApproveEvent={onApproveEvent} onRejectEvent={onRejectEvent} onToggleSaveEvent={onToggleSaveEvent} savedEventIds={savedEventIds} showCreatedBy={currentUser?.role === 'admin'} isPast />
      </div>
    </>
  )
}

export default MyEventsPage
