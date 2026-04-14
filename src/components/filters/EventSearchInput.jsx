// هذا الحقل مخصص للبحث فقط.
function EventSearchInput({ value, onChange }) {
  return (
    <input
      value={value}
      placeholder="ابحث باسم العريس أو العروس أو القاعة"
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export default EventSearchInput
