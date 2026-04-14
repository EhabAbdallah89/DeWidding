import { canApproveEvent, canDeleteEvent, canEditEvent, canRejectEvent } from '../../utils/permissions'
import { formatDisplayDate, formatStatusLabel } from '../../utils/eventUtils'

// هذا الصف مسؤول عن عرض حدث واحد داخل الجدول.
function EventTableRow({ item, store, events, editingId, draft, setDraft, onStartEdit, onSaveEdit, onCancelEdit }) {
  const isSaved = store.currentUser?.myEvents.includes(item.id)
  const isEditing = editingId === item.id
  const isEditable = canEditEvent(store.currentUser, item)

  const updateDraftField = (fieldName, fieldValue) => {
    setDraft({ ...draft, [fieldName]: fieldValue })
  }

  return (
    <tr>
      <td>
        {isEditing ? (
          <input type="date" value={draft.date} onChange={(e) => updateDraftField('date', e.target.value)} />
        ) : (
          formatDisplayDate(item.date)
        )}
      </td>

      <td>
        {isEditing ? (
          <input value={draft.hall} onChange={(e) => updateDraftField('hall', e.target.value)} />
        ) : (
          item.hall
        )}
      </td>

      <td>
        {isEditing ? (
          <input value={draft.groom} onChange={(e) => updateDraftField('groom', e.target.value)} />
        ) : (
          item.groom
        )}
      </td>

      <td>
        {isEditing ? (
          <input value={draft.bride} onChange={(e) => updateDraftField('bride', e.target.value)} />
        ) : (
          item.bride
        )}
      </td>

      <td>{item.village}</td>
      <td>
        <span className={`status ${item.status}`}>{formatStatusLabel(item.status)}</span>
      </td>

      <td className="action-cell">
        {item.status === 'approved' && (
          <button className="ghost-btn" onClick={() => events.toggleMyEvent(item.id)}>
            {isSaved ? 'إزالة من أعراسي' : 'إضافة إلى أعراسي'}
          </button>
        )}

        {isEditable && !isEditing && (
          <button className="ghost-btn" onClick={() => onStartEdit(item)}>تعديل</button>
        )}

        {isEditing && (
          <button className="primary-btn" onClick={() => onSaveEdit(item.id)}>حفظ</button>
        )}

        {isEditing && (
          <button className="ghost-btn" onClick={onCancelEdit}>إلغاء</button>
        )}

        {canDeleteEvent(store.currentUser, item) && !isEditing && (
          <button className="danger-btn" onClick={() => events.deleteEvent(item.id)}>حذف</button>
        )}

        {item.status === 'pending' && canApproveEvent(store.currentUser, item) && (
          <button className="primary-btn" onClick={() => events.approveEvent(item.id)}>موافقة</button>
        )}

        {item.status === 'pending' && canRejectEvent(store.currentUser, item) && (
          <button className="ghost-btn" onClick={() => events.rejectEvent(item.id)}>رفض</button>
        )}
      </td>
    </tr>
  )
}

export default EventTableRow
