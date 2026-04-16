import { getUsersFromSupabase } from './supabaseUserService'

// בדיקה מבודדת בלבד.
// לא מחובר עדיין למסכים ולא לזרימת ההרשמה.
export async function testGetUsersFromSupabase() {
  const result = await getUsersFromSupabase()

  console.log('SUPABASE USERS TEST:', result)

  return result
}