import { supabase } from '../lib/supabaseClient'
import { prepareProfileImage } from '../utils/imageHelpers'

export async function uploadProfileImage(file, userId) {
  // 1. הקטנה אוטומטית
const resizedDataUrl = await prepareProfileImage(file)

// 2. המרה מ־base64 ל־Blob
const blob = await fetch(resizedDataUrl).then(res => res.blob())

// 3. יצירת קובץ חדש
const fileName = `${userId}.jpg`
const filePath = `avatars/${fileName}`

  // העלאה ל־Storage
  const { error: uploadError } = await supabase.storage
    .from('profile-images')
    .upload(filePath, blob, {
      upsert: true, // מחליף תמונה קיימת
    })

  if (uploadError) {
    return { success: false, message: uploadError.message }
  }

  // קבלת URL ציבורי
  const { data } = supabase.storage
    .from('profile-images')
    .getPublicUrl(filePath)

  return {
    success: true,
    url: data.publicUrl,
  }
}