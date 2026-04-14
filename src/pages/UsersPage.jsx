import NoticeBar from '../components/NoticeBar'
import UsersTable from '../components/UsersTable'

// هذه الصفحة مخصصة لإدارة المستخدمين.
function UsersPage({ store, events }) {
  return (
    <>
      <NoticeBar notice={events.notice} />
      <UsersTable store={store} events={events} />
    </>
  )
}

export default UsersPage
