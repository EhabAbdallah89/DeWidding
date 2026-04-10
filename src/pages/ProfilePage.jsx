import ProfileSettings from '../components/ProfileSettings'
function ProfilePage({ currentUser, profileData, onProfileChange, onProfileImageChange, onProfileSave }) {
  return <ProfileSettings currentUser={currentUser} profileData={profileData} onChange={onProfileChange} onImageChange={onProfileImageChange} onSave={onProfileSave} />
}
export default ProfilePage
