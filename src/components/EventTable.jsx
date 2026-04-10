import { canApproveEvent, canDeleteEvent, canEditEvent, canRejectEvent } from '../utils/permissions'
import { formatDisplayDate, formatStatusLabel } from '../utils/eventUtils'
function EventTable({ events, currentUser, onEditEvent, onDeleteEvent, onApproveEvent, onRejectEvent }) {
  if(events.length===0){ return <p className="empty-state">لا توجد نتائج مطابقة</p> }
  return (
    <div className="table-wrapper">
      <table>
        <thead><tr><th>التاريخ</th><th>القاعة</th><th>العريس</th><th>العروس</th> <th>القرية</th><th>الحالة</th><th>صاحب الإضافة</th><th>إجراء</th></tr></thead>
        <tbody>
          {events.map((event)=>(
            <tr key={event.id}>
              <td>{formatDisplayDate(event.date)}</td>
              <td>{event.hall}</td>
              <td>{event.groom}</td>
              <td>{event.bride}</td>
              <td>{event.village || '-'}</td>
              <td><span className={`status-badge status-${event.status}`}>{formatStatusLabel(event.status)}</span></td>
              <td>{event.createdByUserId}</td>
              <td className="actions-cell">
                {canEditEvent(currentUser, event) && <button className="primary-btn" onClick={()=>onEditEvent(event)}>تعديل</button>}
                {canDeleteEvent(currentUser, event) && <button className="danger-btn" onClick={()=>onDeleteEvent(event.id)}>حذف</button>}
                {event.status==='pending' && canApproveEvent(currentUser, event) && <button className="success-btn" onClick={()=>onApproveEvent(event.id)}>موافقة</button>}
                {event.status==='pending' && canRejectEvent(currentUser, event) && <button className="warning-btn" onClick={()=>onRejectEvent(event.id)}>رفض</button>}
                {!canEditEvent(currentUser, event) && !canDeleteEvent(currentUser, event) && !canApproveEvent(currentUser, event) && !canRejectEvent(currentUser, event) && '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default EventTable
