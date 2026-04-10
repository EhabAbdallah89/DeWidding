function StatCards({ total, approved, pending, rejected }) {
  return (
    <div className="kpi-grid">
      <div className="kpi-card"><div className="kpi-number">{total}</div><div className="kpi-label">إجمالي الأحداث</div></div>
      <div className="kpi-card"><div className="kpi-number">{approved}</div><div className="kpi-label">موافق عليها</div></div>
      <div className="kpi-card"><div className="kpi-number">{pending}</div><div className="kpi-label">بانتظار الموافقة</div></div>
      <div className="kpi-card"><div className="kpi-number">{rejected}</div><div className="kpi-label">مرفوضة</div></div>
    </div>
  )
}
export default StatCards
