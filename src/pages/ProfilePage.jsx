import NoticeBar from '../components/NoticeBar'
import ProfileCard from '../components/ProfileCard'

// هذه الصفحة مسؤولة عن عرض الملف الشخصي وتعديله.
function ProfilePage({ store, events }) {
  return (
    <>
      <NoticeBar notice={events.notice} />
      <ProfileCard store={store} events={events} />
    </>
  )
}

export default ProfilePage
