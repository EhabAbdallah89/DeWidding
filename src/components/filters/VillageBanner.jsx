// هذا السطر يوضح قرية المستخدم المسجلة.
function VillageBanner({ village }) {
  return (
    <div className="village-banner">
      <strong>قريتك المسجلة هي: {village || '-'}</strong>
    </div>
  )
}

export default VillageBanner
