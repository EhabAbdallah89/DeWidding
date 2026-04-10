import EventTable from './EventTable'

function EventsSplitView(props) {
  const { title = 'الأحداث', upcomingEvents, pastEvents } = props

  return (
    <>
      <div className="card">
        <h3 className="section-title">{title} القادمة</h3>
        <p className="card-subtitle">من تاريخ اليوم وما بعده — مرتبة من الأقرب إلى الأبعد</p>
        <EventTable {...props} events={upcomingEvents} />
      </div>
      <div className="card">
        <h3 className="section-title">{title} السابقة</h3>
        <p className="card-subtitle">الأحداث الماضية — مرتبة من الأحدث إلى الأقدم</p>
        <EventTable {...props} events={pastEvents} />
      </div>
    </>
  )
}

export default EventsSplitView
