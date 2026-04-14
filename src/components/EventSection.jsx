import EventTable from './EventTable'

// هذا المكون يلف كل مجموعة أحداث بعنوان وعدّاد.
function EventSection({ title, items, store, events }) {
  return (
    <section className="panel">
      <div className="section-head">
        <h2>{title}</h2>
        <span>{items.length}</span>
      </div>

      <EventTable items={items} store={store} events={events} />
    </section>
  )
}

export default EventSection
