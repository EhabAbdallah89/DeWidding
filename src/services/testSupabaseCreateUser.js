import { createUserInSupabase } from './supabaseUserService'

// בדיקת insert מבודדת בלבד.
// עדיין לא מחובר לשום מסך.
export async function testCreateUserInSupabase() {
  const testUser = {
    name: 'Test Supabase User',
    phone: `05${String(Date.now()).slice(-8)}`,
    email: `test.${Date.now()}@example.com`,
    password: '',
    village: 'كسرى',
    profileImage: '',
  }

  const result = await createUserInSupabase(testUser)

  console.log('SUPABASE CREATE USER TEST:', result)

  return result
}