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

  if (!events.showEventForm) {
    return (
      <section className="panel">
        <button className="primary-btn" onClick={() => events.setShowEventForm(true)}>
          إضافة عرس
        </button>
      </section>
    )
  }

  return (
    <section className="panel form-stack">
      <h3>إضافة عرس إلى قرية {store.selectedVillage}</h3>

      <input
        value={events.eventForm.groom}
        placeholder="اسم العريس"
        onChange={(e) => setField('groom', e.target.value)}
      />

      <input
        value={events.eventForm.bride}
        placeholder="اسم العروس"
        onChange={(e) => setField('bride', e.target.value)}
      />

      <input
        value={events.eventForm.hall}
        placeholder="اسم القاعة"
        onChange={(e) => setField('hall', e.target.value)}
      />

      <input
        type="date"
        value={events.eventForm.date}
        onChange={(e) => setField('date', e.target.value)}
      />

      <div className="button-row">
        <button className="primary-btn" onClick={events.addEvent}>إرسال</button>

        <button className="ghost-btn" onClick={resetForm}>إعادة تعيين</button>

        <button
          className="ghost-btn"
          onClick={() => {
            resetForm()
            events.setShowEventForm(false)
          }}
        >
          إلغاء
        </button>
      </div>
    </section>
  )
}

export default EventFormCard
