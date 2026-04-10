function PublicLayout({ children }) {
  return <div className="layout"><div className="topbar"><div><div className="topbar-title">DEWEDDING</div><div className="topbar-subtitle">واجهة عامة قبل Firebase</div></div></div><div className="page-container">{children}</div></div>
}
export default PublicLayout
