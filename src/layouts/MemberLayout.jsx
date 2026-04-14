import ShellHeader from '../components/ShellHeader'
import SideNav from '../components/SideNav'

// هذا التخطيط يلف كل الصفحات الداخلية بعد تسجيل الدخول.
function MemberLayout({ store, children }) {
  return (
    <div className="member-shell">
      <ShellHeader store={store} />

      <div className="member-body">
        <SideNav store={store} />
        <main className="content-stack">{children}</main>
      </div>
    </div>
  )
}

export default MemberLayout
