import ProfileSettings from '../components/ProfileSettings'

function ProfilePage({ currentUser, profileData, onProfileChange, onProfileImageChange, onProfileSave, defaultAvatar }) {
  return <ProfileSettings currentUser={currentUser} profileData={profileData} onChange={onProfileChange} onImageChange={onProfileImageChange} onSave={onProfileSave} defaultAvatar={defaultAvatar} />
}

export default ProfilePage
