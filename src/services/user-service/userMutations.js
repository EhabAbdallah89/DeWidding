// هذه الدوال تعيد نسخاً جديدة من قوائم المستخدمين بعد التعديل.
export function applyProfileUpdate(users, userId, payload) {
  return users.map((user) =>
    user.id === userId
      ? {
          ...user,
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          profileImage: payload.profileImage,
          phoneChangeUsed: payload.phoneChanged ? true : (user.phoneChangeUsed ?? false),
        }
      : user
  )
}

export function applyVillageUpdate(users, targetUserId, village) {
  return users.map((user) => (user.id === targetUserId ? { ...user, village } : user))
}

export function applyRoleUpdate(users, targetUserId, newRole) {
  return users.map((user) => (user.id === targetUserId ? { ...user, role: newRole } : user))
}

export function applyPasswordReset(users, targetUserId, newPassword) {
  return users.map((user) => (user.id === targetUserId ? { ...user, password: newPassword } : user))
}

export function applyProfileImageUpdate(users, userId, profileImage) {
  return users.map((user) => (user.id === userId ? { ...user, profileImage } : user))
}

export function applyProfileImageRemoval(users, userId) {
  return users.map((user) => (user.id === userId ? { ...user, profileImage: '' } : user))
}
