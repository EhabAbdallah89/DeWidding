import UserTableRow from './users/UserTableRow'
import UsersTableHead from './users/UsersTableHead'

// هذا الجدول يعرض المستخدمين للإدارة فقط.
function UsersTable({ store, events }) {
  return (
    <section className="panel">
      <div className="table-wrap">
        <table>
          <UsersTableHead />
          <tbody>
            {store.users.map((user) => (
              <UserTableRow key={user.id} user={user} events={events} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default UsersTable
