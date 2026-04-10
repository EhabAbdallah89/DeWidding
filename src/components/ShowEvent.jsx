import {
    canDeleteEvent,
    canEditEvent,
    canApproveEvent,
    canRejectEvent
} from '../utils/permissions'
import { formatDisplayDate, formatStatusLabel } from '../utils/eventUtils'

function ShowEvent({
    selectedVillage,
    sortedEvents,
    currentUser,
    onEditEvent,
    onDeleteEvent,
    onApproveEvent,
    onRejectEvent
}) {
    if (!selectedVillage) {
        return <p className="empty-state">يرجى اختيار قرية لعرض الأعراس</p>
    }

    if (sortedEvents.length === 0) {
        return <p className="empty-state">لا توجد نتائج مطابقة للبحث أو العرض</p>
    }

    return (
        <div className="section">
            <h2>أعراس قرية {selectedVillage}</h2>
            <p>عدد الأعراس الظاهرة: {sortedEvents.length}</p>

            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>التاريخ</th>
                            <th>القاعة</th>
                            <th>العريس</th>
                            <th>العروس</th>
                            <th>الحالة</th>
                            <th>صاحب الإضافة</th>
                            <th>إجراء</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedEvents.map((event) => (
                            <tr key={event.id}>
                                <td>{formatDisplayDate(event.date)}</td>
                                <td>{event.hall}</td>
                                <td>{event.groom}</td>
                                <td>{event.bride}</td>
                                <td>
                                    <span className={`status-badge status-${event.status}`}>
                                        {formatStatusLabel(event.status)}
                                    </span>
                                </td>
                                <td>{event.createdByUserId}</td>
                                <td>
                                    {canEditEvent(currentUser, event) && (
                                        <button className="edit-btn" onClick={() => onEditEvent(event)}>
                                            تعديل
                                        </button>
                                    )}

                                    {canDeleteEvent(currentUser, event) && (
                                        <button className="delete-btn" onClick={() => onDeleteEvent(event.id)}>
                                            حذف
                                        </button>
                                    )}

                                    {event.status === 'pending' && canApproveEvent(currentUser, event) && (
                                        <button className="primary-btn" onClick={() => onApproveEvent(event.id)}>
                                            موافقة
                                        </button>
                                    )}

                                    {event.status === 'pending' && canRejectEvent(currentUser, event) && (
                                        <button className="secondary-btn" onClick={() => onRejectEvent(event.id)}>
                                            رفض
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ShowEvent