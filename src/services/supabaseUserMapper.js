import { DEFAULT_USER_AVATAR } from '../config/profileImages'
// ממיר רשומת משתמש מ-Supabase למבנה שהאפליקציה כבר מכירה
export function mapSupabaseUserToAppUser(row) {
  if (!row) return null

  return {
    id: row.id,
    name: row.name || '',
    phone: row.phone || '',
    email: row.email || '',
    password: row.password || '',
    village: row.village || '',
    profileImage:!row.profile_image || row.profile_image.startsWith('/src/')
       ? DEFAULT_USER_AVATAR    : row.profile_image,

    role: row.role || 'regular',
    isActive: row.is_active ?? true,
    myEvents: row.my_events || [],
    phoneVerified: row.phone_verified ?? false,
    phoneChangeUsed: row.phone_change_used ?? false,
  }
}

// ממיר מערך של משתמשים מ-Supabase למבנה של האפליקציה
export function mapSupabaseUsersToAppUsers(rows = []) {
  return rows.map(mapSupabaseUserToAppUser)
}