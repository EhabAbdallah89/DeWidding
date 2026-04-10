import EventTable from '../components/EventTable'
function MyEventsPage({ currentUser, myEvents, onEditEvent, onDeleteEvent, onApproveEvent, onRejectEvent }) {
  return <div className="card"><h2 className="card-title">أعراسي / أحداثي</h2><p className="card-subtitle">هذه قائمة الأحداث المرتبطة بحسابك</p><EventTable events={myEvents} currentUser={currentUser} onEditEvent={onEditEvent} onDeleteEvent={onDeleteEvent} onApproveEvent={onApproveEvent} onRejectEvent={onRejectEvent} /></div>
}
export default MyEventsPage
