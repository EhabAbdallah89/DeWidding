import { getUsersFromSupabase } from '../../../services/supabaseUserService'

export async function refreshUsersFromSupabase(store) {
  const result = await getUsersFromSupabase()

  if (!result.success) {
    return { success: false, message: result.message }
  }

  store.setUsers(result.data)
  return { success: true, data: result.data }
}