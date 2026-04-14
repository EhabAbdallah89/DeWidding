import { getNavItems } from '../config/nav'

// هذا المكون مسؤول عن التنقل بين الصفحات الداخلية.
function SideNav({ store }) {
  return (
    <aside className="panel sidebar">
      {getNavItems(store.currentUser).map((item) => (
        <button
          key={item.key}
          className={store.currentPage === item.key ? 'nav-btn active' : 'nav-btn'}
          onClick={() => store.setCurrentPage(item.key)}
        >
          {item.label}
        </button>
      ))}

      {store.currentUser?.role !== 'regular' && (
        <button
          className={store.currentPage === 'pending' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => store.setCurrentPage('pending')}
        >
          بانتظار الموافقة
        </button>
      )}
    </aside>
  )
}

export default SideNav
