import { canEditEvent } from '../../utils/permissions'
import { formatDisplayDate } from '../../utils/eventUtils'
import EventEditableCell from './table/EventEditableCell'
import EventRowActions from './table/EventRowActions'
import EventStatusCell from './table/EventStatusCell'

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
        <EventEditableCell
          isEditing={isEditing}
          type="date"
          value={draft.date}
          displayValue={formatDisplayDate(item.date)}
          onChange={(value) => updateDraftField('date', value)}
        />
      </td>

      <td>
        <EventEditableCell
          isEditing={isEditing}
          value={draft.hall}
          displayValue={item.hall}
          onChange={(value) => updateDraftField('hall', value)}
        />
      </td>

      <td>
        <EventEditableCell
          isEditing={isEditing}
          value={draft.groom}
          displayValue={item.groom}
          onChange={(value) => updateDraftField('groom', value)}
        />
      </td>

      <td>
        <EventEditableCell
          isEditing={isEditing}
          value={draft.bride}
          displayValue={item.bride}
          onChange={(value) => updateDraftField('bride', value)}
        />
      </td>

      <td>{item.village}</td>
      <td><EventStatusCell status={item.status} /></td>
      <EventRowActions
        item={item}
        currentUser={store.currentUser}
        isSaved={isSaved}
        isEditing={isEditing}
        isEditable={isEditable}
        events={events}
        onStartEdit={onStartEdit}
        onSaveEdit={onSaveEdit}
        onCancelEdit={onCancelEdit}
      />
    </tr>
  )
}

export default EventTableRow
