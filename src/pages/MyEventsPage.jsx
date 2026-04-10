import EventsSplitView from '../components/EventsSplitView'

function MyEventsPage({ currentUser, myEventsSplit, onEditEvent, onDeleteEvent, onApproveEvent, onRejectEvent, onToggleMyEvent, myEventIds, createdByNameMap, showCreatedBy }) {
  return (
    <>
      <div className="card"><h2 className="card-title">أعراسي</h2><p className="card-subtitle">هذه قائمة الأحداث التي أضفتها إلى قائمتي.</p></div>
      <EventsSplitView title="أعراسي" upcomingEvents={myEventsSplit.upcoming} pastEvents={myEventsSplit.past} currentUser={currentUser} onEditEvent={onEditEvent} onDeleteEvent={onDeleteEvent} onApproveEvent={onApproveEvent} onRejectEvent={onRejectEvent} onToggleMyEvent={onToggleMyEvent} myEventIds={myEventIds} createdByNameMap={createdByNameMap} showCreatedBy={showCreatedBy} />
    </>
  )
}

export default MyEventsPage
