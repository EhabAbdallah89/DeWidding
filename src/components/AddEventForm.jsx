function AddEventForm({ formData, onFormChange, onSubmit, onCancelEdit, errorMessage, successMessage, editingEventId, canAddEvent }) {
  if(!canAddEvent){ return <div className="card"><p className="empty-state">ليس لديك صلاحية إضافة أو تعديل الأعراس في هذه القرية</p></div> }
  return (
    <div className="card">
      <h3 className="section-title">{editingEventId ? 'تعديل العرس' : 'إضافة عرس جديد'}</h3>
      <div className="grid-4">
        <div className="field"><label>اسم العريس</label><input type="text" name="groom" value={formData.groom} onChange={onFormChange} /></div>
        <div className="field"><label>اسم العروس</label><input type="text" name="bride" value={formData.bride} onChange={onFormChange} /></div>
        <div className="field"><label>القاعة</label><input type="text" name="hall" value={formData.hall} onChange={onFormChange} /></div>
        <div className="field"><label>التاريخ</label><input type="date" name="date" value={formData.date} onChange={onFormChange} /></div>
      </div>
      <div className="button-row">
        <button className="primary-btn" onClick={onSubmit}>{editingEventId ? 'تحديث' : 'إضافة'}</button>
        {editingEventId && <button className="secondary-btn" onClick={onCancelEdit}>إلغاء التعديل</button>}
      </div>
      {errorMessage && <p className="message error">{errorMessage}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}
    </div>
  )
}
export default AddEventForm
