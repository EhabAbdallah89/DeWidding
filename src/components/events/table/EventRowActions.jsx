import { canApproveEvent, canDeleteEvent, canRejectEvent } from '../../../utils/permissions'

// هذا المكون يجمع أزرار الإجراءات داخل الصف.
function EventRowActions({ item, currentUser, isSaved, isEditing, isEditable, events, onStartEdit, onSaveEdit, onCancelEdit }) {
  return (
    <td className="action-cell">
      {item.status === 'approved' && (
        <button className="ghost-btn" onClick={() => events.toggleMyEvent(item.id)}>
          {isSaved ? 'إزالة من أعراسي' : 'إضافة إلى أعراسي'}
        </button>
      )}

      {isEditable && !isEditing && <button className="ghost-btn" onClick={() => onStartEdit(item)}>تعديل</button>}
      {isEditing && <button className="primary-btn" onClick={() => onSaveEdit(item.id)}>حفظ</button>}
      {isEditing && <button className="ghost-btn" onClick={onCancelEdit}>إلغاء</button>}
      {canDeleteEvent(currentUser, item) && !isEditing && <button className="danger-btn" onClick={() => events.deleteEvent(item.id)}>حذف</button>}
      {item.status === 'pending' && canApproveEvent(currentUser, item) && <button className="primary-btn" onClick={() => events.approveEvent(item.id)}>موافقة</button>}
      {item.status === 'pending' && canRejectEvent(currentUser, item) && <button className="ghost-btn" onClick={() => events.rejectEvent(item.id)}>رفض</button>}
    </td>
  )
}

export default EventRowActions
