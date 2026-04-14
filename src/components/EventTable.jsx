import { useState } from 'react'
import EventTableRow from './events/EventTableRow'

// هذا المكون مسؤول عن الجدول فقط.
// تم نقل منطق الصف إلى مكون منفصل لتقليل الضغط على الملف الحالي.
function EventTable({ items, store, events }) {
  // ==============================
  // الحالات المحلية الخاصة بالتحرير
  // ==============================
  const [editingId, setEditingId] = useState(null)
  const [draft, setDraft] = useState({ groom: '', bride: '', hall: '', date: '' })

  // ==============================
  // حارس الحالة الفارغة
  // ==============================
  if (!items.length) {
    return <p className="empty-state">لا توجد أحداث مطابقة.</p>
  }

  // ==============================
  // Handlers للتحرير
  // ==============================
  const startEdit = (item) => {
    setEditingId(item.id)
    setDraft({
      groom: item.groom,
      bride: item.bride,
      hall: item.hall,
      date: item.date,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const saveEdit = async (eventId) => {
    const result = await events.updateEvent(eventId, draft)
    if (result.success) {
      setEditingId(null)
      return
    }

    events.setNotice({ error: result.message, success: '' })
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>التاريخ</th>
            <th>القاعة</th>
            <th>العريس</th>
            <th>العروس</th>
            <th>القرية</th>
            <th>الحالة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <EventTableRow
              key={item.id}
              item={item}
              store={store}
              events={events}
              editingId={editingId}
              draft={draft}
              setDraft={setDraft}
              onStartEdit={startEdit}
              onSaveEdit={saveEdit}
              onCancelEdit={cancelEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EventTable
