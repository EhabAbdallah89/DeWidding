import EventFormActions from './events/form/EventFormActions'
import EventFormFields from './events/form/EventFormFields'
import EventFormOpenButton from './events/form/EventFormOpenButton'

// هذا المكون مسؤول فقط عن عرض نموذج إضافة حدث جديد.
function EventFormCard({ store, events }) {
  // ==============================
  // حارس الصلاحية
  // ==============================
  if (!events.canAdd) return null

  // ==============================
  // معالجات داخلية للنموذج
  // ==============================
  const setField = (fieldName, fieldValue) => {
    events.setEventForm({
      ...events.eventForm,
      [fieldName]: fieldValue,
    })
  }

  const resetForm = () => {
    events.setEventForm({
      groom: '',
      bride: '',
      hall: '',
      date: '',
    })
  }

  const closeForm = () => {
    resetForm()
    events.setShowEventForm(false)
  }

  if (!events.showEventForm) {
    return <EventFormOpenButton onOpen={() => events.setShowEventForm(true)} />
  }

  return (
    <section className="panel form-stack">
      <h3>إضافة عرس إلى قرية {store.selectedVillage}</h3>
      <EventFormFields form={events.eventForm} onChange={setField} />
      <EventFormActions onSubmit={events.addEvent} onReset={resetForm} onCancel={closeForm} />
    </section>
  )
}

export default EventFormCard
