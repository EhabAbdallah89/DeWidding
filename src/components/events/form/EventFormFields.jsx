// هذا المكون يعرض حقول نموذج الحدث فقط.
function EventFormFields({ form, onChange }) {
  return (
    <>
      <input value={form.groom} placeholder="اسم العريس" onChange={(e) => onChange('groom', e.target.value)} />
      <input value={form.bride} placeholder="اسم العروس" onChange={(e) => onChange('bride', e.target.value)} />
      <input value={form.hall} placeholder="اسم القاعة" onChange={(e) => onChange('hall', e.target.value)} />
      <input type="date" value={form.date} onChange={(e) => onChange('date', e.target.value)} />
    </>
  )
}

export default EventFormFields
