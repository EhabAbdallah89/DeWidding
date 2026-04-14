// هذا المكون يعرض أزرار نموذج الحدث فقط.
function EventFormActions({ onSubmit, onReset, onCancel }) {
  return (
    <div className="button-row">
      <button className="primary-btn" onClick={onSubmit}>إرسال</button>
      <button className="ghost-btn" onClick={onReset}>إعادة تعيين</button>
      <button className="ghost-btn" onClick={onCancel}>إلغاء</button>
    </div>
  )
}

export default EventFormActions
