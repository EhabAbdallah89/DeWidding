function AddEventForm({
  formData,
  onFormChange,
  onSubmit,
  onCancelEdit,
  errorMessage,
  successMessage,
  editingEventId,
  canAddEvent
}) {
  if (!canAddEvent) {
    return (
      <div className="section">
        <p className="empty-state">ليس لديك صلاحية إضافة أو تعديل الأعراس</p>
      </div>
    )
  }

  return (
    <div className="section">
      <h3>{editingEventId ? 'تعديل العرس' : 'إضافة عرس جديد'}</h3>

      <div className="form-grid">
        <input
          type="text"
          name="groom"
          placeholder="اسم العريس"
          value={formData.groom}
          onChange={onFormChange}
        />

        <input
          type="text"
          name="bride"
          placeholder="اسم العروس"
          value={formData.bride}
          onChange={onFormChange}
        />

        <input
          type="text"
          name="hall"
          placeholder="القاعة"
          value={formData.hall}
          onChange={onFormChange}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={onFormChange}
        />
      </div>

      <div className="form-actions">
        <button className="primary-btn" onClick={onSubmit}>
          {editingEventId ? 'تحديث' : 'إضافة'}
        </button>

        {editingEventId && (
          <button className="secondary-btn" onClick={onCancelEdit}>
            إلغاء التعديل
          </button>
        )}
      </div>

      {errorMessage && <p className="message error">{errorMessage}</p>}
      {successMessage && <p className="message success">{successMessage}</p>}
    </div>
  )
}

export default AddEventForm
