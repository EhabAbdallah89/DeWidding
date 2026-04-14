import UserTableRow from './users/UserTableRow'

// هذا الجدول يعرض المستخدمين للإدارة فقط.
function UsersTable({ store, events }) {
  return (
    <section className="panel">
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>الاسم</th>
              <th>الهاتف</th>
              <th>الصورة</th>
              <th>الإشراف على الصورة</th>
              <th>البريد الإلكتروني</th>
              <th>القرية</th>
              <th>الدور</th>
            </tr>
          </thead>

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
