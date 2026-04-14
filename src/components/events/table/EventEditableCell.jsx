// هذه الخلية تعرض نصاً عادياً أو حقلاً للتحرير.
function EventEditableCell({ isEditing, type = 'text', value, displayValue, onChange }) {
  if (!isEditing) return displayValue
  return <input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
}

export default EventEditableCell
