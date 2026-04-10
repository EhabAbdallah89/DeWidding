import { STORAGE_KEYS, loadValue, saveValue } from './storageService'
import { mockUsers } from '../auth/mockUsers'
import { User } from '../models/User'
export function loadUsers(){ return loadValue(STORAGE_KEYS.usersData, mockUsers) }
export function saveUsers(users){ saveValue(STORAGE_KEYS.usersData, users) }
export function findUserByPhone(users, phone){ return users.find((user)=>user.phone===phone) }
export function registerUser(users, userData){
  const existingUser = findUserByPhone(users, userData.phone)
  if(existingUser){ return { success:false, message:'رقم الهاتف مسجل مسبقًا' } }
  const newUser = User.create({ ...userData, role:'regular', myEvents:[] }).toJSON()
  return { success:true, user:newUser, users:[...users, newUser] }
}
export function loginWithPassword(users, phone, password){
  const user = users.find((item)=>item.phone===phone && item.password===password)
  if(!user){ return { success:false, message:'رقم الهاتف أو كلمة المرور غير صحيحة' } }
  return { success:true, user }
}
export function loginWithOtp(users, phone){
  const user = users.find((item)=>item.phone===phone)
  if(!user){ return { success:false, message:'رقم الهاتف غير موجود' } }
  return { success:true, user, message:'تم تسجيل الدخول التجريبي عبر OTP' }
}
export function updateUserProfile(users, userId, payload){
  return users.map((user)=>user.id===userId ? { ...user, name:payload.name, profileImage:payload.profileImage } : user)
}
