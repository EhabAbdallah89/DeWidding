import { DEFAULT_USER_AVATAR } from '../../config/profileImages'

// هذه الخلية تعرض صورة المستخدم.
function UserAvatarCell({ image }) {
  return (
    <img src={image || DEFAULT_USER_AVATAR} width="40" height="40" style={{ borderRadius: '50%' }} />
  )
}

export default UserAvatarCell
