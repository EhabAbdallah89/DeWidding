import { supabase } from '../../lib/supabaseClient'
import { refreshUsersFromSupabase } from '../auth-flow/helpers/userSyncHelpers'

export function createAdminUserManagementActions({ store, writeNotice }) {

  const updateUserVillage = async (userId, village) => {
    const { error } = await supabase
      .from('users')
      .update({ village })
      .eq('id', userId)

    if (error) {
      writeNotice(error.message)
      return
    }

    await refreshUsersFromSupabase(store)
    writeNotice('', 'تم تحديث القرية')
  }

  const updateUserRole = async (userId, role) => {
    const { error } = await supabase
      .from('users')
      .update({ role })
      .eq('id', userId)

    if (error) {
      writeNotice(error.message)
      return
    }

    await refreshUsersFromSupabase(store)
    writeNotice('', 'تم تحديث الدور')
  }

  return {
    updateUserVillage,
    updateUserRole,
  }
}