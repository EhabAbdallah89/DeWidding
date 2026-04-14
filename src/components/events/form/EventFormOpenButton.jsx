// هذا الزر يظهر فقط عندما يكون النموذج مخفياً.
function EventFormOpenButton({ onOpen }) {
  return (
    <section className="panel">
      <button className="primary-btn" onClick={onOpen}>
        إضافة عرس
      </button>
    </section>
  )
}

export default EventFormOpenButton
