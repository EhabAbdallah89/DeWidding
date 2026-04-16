import { supabase } from '../lib/supabaseClient'
import { normalizeRegistrationPayload } from './user-service/userNormalization'
import { mapSupabaseUsersToAppUsers, mapSupabaseUserToAppUser } from './supabaseUserMapper'
// שירות Supabase נפרד לחלוטין.
// לא נוגעים בשלב זה ב-userService.js הפעיל.

export async function createUserInSupabase(userData) {
  const normalizedUserData = normalizeRegistrationPayload(userData)

  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        id: Date.now(),
        name: normalizedUserData.name,
        phone: normalizedUserData.phone,
        email: normalizedUserData.email,
        password: normalizedUserData.password,
        village: normalizedUserData.village,
        profile_image: normalizedUserData.profileImage || '',
        role: 'regular',
        is_active: true,
        my_events: [],
        phone_verified: true,
        phone_change_used: false,
      },
    ])
    .select()

  if (error) {
    return { success: false, message: error.message, data: null }
  }

return {
  success: true,
  message: 'User created successfully',
  data: mapSupabaseUserToAppUser(data?.[0] || null),
}}

export async function getUsersFromSupabase() {
  const { data, error } = await supabase.from('users').select('*')

  if (error) {
    return { success: false, message: error.message, data: [] }
  }

return {
  success: true,
  message: 'Users fetched successfully',
  data: mapSupabaseUsersToAppUsers(data || []),
}}