import { DEFAULT_USER_AVATAR } from '../../config/profileImages'

// هذه البطاقة تعرض معاينة صورة المستخدم.
function ProfileImagePreview({ image }) {
  return (
    <div className="profile-preview-side">
      <img className="profile-avatar large" src={image || DEFAULT_USER_AVATAR} alt="الصورة الشخصية" />
    </div>
  )
}

export default ProfileImagePreview
