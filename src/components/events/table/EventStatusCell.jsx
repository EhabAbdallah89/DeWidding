import { formatStatusLabel } from '../../../utils/eventUtils'

// هذه الخلية تعرض حالة الحدث فقط.
function EventStatusCell({ status }) {
  return <span className={`status ${status}`}>{formatStatusLabel(status)}</span>
}

export default EventStatusCell
