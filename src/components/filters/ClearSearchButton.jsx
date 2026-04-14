// هذا الزر يمسح نص البحث الحالي.
function ClearSearchButton({ onClear }) {
  return (
    <button className="ghost-btn" onClick={onClear}>مسح البحث</button>
  )
}

export default ClearSearchButton
