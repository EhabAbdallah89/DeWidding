// هذا المكون يعرض إحصاءات مختصرة أعلى لوحة التحكم.
function StatGrid({ counts }) {
  const items = [
    ['إجمالي الأحداث', counts.total],
    ['تمت الموافقة', counts.approved],
    ['بانتظار الموافقة', counts.pending],
    ['مرفوضة', counts.rejected],
  ]

  return (
    <section className="stat-grid">
      {items.map(([label, value]) => (
        <article key={label} className="panel stat-card">
          <strong>{value}</strong>
          <span>{label}</span>
        </article>
      ))}
    </section>
  )
}

export default StatGrid
