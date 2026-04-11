import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { loadEvents, saveEvents } from './services/eventService'
import {
  loadUsers,
  saveUsers,
  registerUser,
  loginWithPassword,
  loginWithOtp,
  updateUserProfile,
  updateUserVillage,
  sendOtpCode,
  verifyOtpCode,
  resetPasswordWithEmail,
  updateUserRole,
} from './services/userService'
import { loadValue, saveValue, STORAGE_KEYS } from './services/storageService'
import { Event } from './models/Event'
import {
  canAddEvent,
  canDeleteEvent,
  canEditEvent,
  canViewEvent,
  canApproveEvent,
  canRejectEvent,
  getNewEventStatus,
  isManagementUser,
  canManageUsers,
  getAllowedPages,
} from './utils/permissions'
import { sortEvents, filterEvents, validateEventForm } from './utils/eventUtils'
import { isStrongEnoughPassword, isValidEmail, isValidPhone, normalizePhone } from './utils/validation'
import PublicLayout from './layouts/PublicLayout'
import UserLayout from './layouts/UserLayout'
import AdminLayout from './layouts/AdminLayout'
import PublicHomePage from './pages/PublicHomePage'
import UserHomePage from './pages/UserHomePage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import ProfilePage from './pages/ProfilePage'
import MyEventsPage from './pages/MyEventsPage'
import UserManagementPage from './pages/UserManagementPage'

function App() {
  const [usersData, setUsersData] = useState(loadUsers())
  const [eventsData, setEventsData] = useState(loadEvents())
  const [currentUserId, setCurrentUserId] = useState(loadValue(STORAGE_KEYS.currentUserId, null))
  const [selectedVillage, setSelectedVillage] = useState(loadValue(STORAGE_KEYS.selectedVillage, ''))
  const [search, setSearch] = useState(loadValue(STORAGE_KEYS.searchText, ''))
  const [currentPage, setCurrentPage] = useState(loadValue(STORAGE_KEYS.currentPage, 'dashboard'))

  const currentUser = useMemo(() => usersData.find((user) => user.id === currentUserId) || null, [usersData, currentUserId])
  const usersById = useMemo(() => Object.fromEntries(usersData.map((user) => [user.id, user])), [usersData])

  const [registerData, setRegisterData] = useState({ name: '', phone: '', email: '', password: '', village: '', profileImage: '', otpCode: '' })
  const [loginData, setLoginData] = useState({ phone: '', password: '' })
  const [otpLoginData, setOtpLoginData] = useState({ phone: '', code: '' })
  const [forgotPasswordData, setForgotPasswordData] = useState({ email: '', phone: '', newPassword: '' })

  const [registerError, setRegisterError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginSuccess, setLoginSuccess] = useState('')
  const [otpError, setOtpError] = useState('')
  const [otpSuccess, setOtpSuccess] = useState('')
  const [forgotPasswordError, setForgotPasswordError] = useState('')
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState('')
  const [registerOtpSentCode, setRegisterOtpSentCode] = useState('')
  const [loginOtpSentCode, setLoginOtpSentCode] = useState('')
  const [registerPhoneVerified, setRegisterPhoneVerified] = useState(false)
  const [verifiedRegisterPhone, setVerifiedRegisterPhone] = useState('')

  const [profileData, setProfileData] = useState({ name: '', email: '', profileImage: '' })
  const [editingEventId, setEditingEventId] = useState(null)
  const [formData, setFormData] = useState({ groom: '', bride: '', hall: '', date: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [roleError, setRoleError] = useState('')
  const [roleSuccess, setRoleSuccess] = useState('')

  useEffect(() => { saveUsers(usersData) }, [usersData])
  useEffect(() => { saveEvents(eventsData) }, [eventsData])
  useEffect(() => { saveValue(STORAGE_KEYS.currentUserId, currentUserId) }, [currentUserId])
  useEffect(() => { saveValue(STORAGE_KEYS.selectedVillage, selectedVillage) }, [selectedVillage])
  useEffect(() => { saveValue(STORAGE_KEYS.searchText, search) }, [search])
  useEffect(() => { saveValue(STORAGE_KEYS.currentPage, currentPage) }, [currentPage])

  useEffect(() => {
    if (!currentUser) {
      setProfileData({ name: '', email: '', profileImage: '' })
      return
    }

    setProfileData({
      name: currentUser.name || '',
      email: currentUser.email || '',
      profileImage: currentUser.profileImage || '',
    })
  }, [currentUser])

  useEffect(() => {
    if (!currentUser?.village) return
    setSelectedVillage((previousVillage) => previousVillage || currentUser.village)
  }, [currentUserId])

  useEffect(() => {
    const allowedPages = getAllowedPages(currentUser)
    if (!allowedPages.includes(currentPage)) {
      setCurrentPage(currentUser?.role === 'admin' ? 'dashboard' : currentUser ? 'dashboard' : 'auth')
    }
  }, [currentPage, currentUser])

  function resetForm() {
    setFormData({ groom: '', bride: '', hall: '', date: '' })
    setEditingEventId(null)
  }

  function clearMessages() {
    setErrorMessage('')
    setSuccessMessage('')
  }

  function clearAuthMessages() {
    setRegisterError('')
    setRegisterSuccess('')
    setLoginError('')
    setLoginSuccess('')
    setOtpError('')
    setOtpSuccess('')
    setForgotPasswordError('')
    setForgotPasswordSuccess('')
  }

  function handleRegisterChange(event) {
    const { name, value } = event.target
    setRegisterData((prev) => ({ ...prev, [name]: value }))
    if (name === 'phone' && value !== verifiedRegisterPhone) {
      setRegisterPhoneVerified(false)
    }
  }

  function resizeImage(file, callback) {
    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()
      image.onload = () => {
        const canvas = document.createElement('canvas')
        const size = 160
        canvas.width = size
        canvas.height = size
        const context = canvas.getContext('2d')
        context.fillStyle = '#f3f4f6'
        context.fillRect(0, 0, size, size)

        const scale = Math.max(size / image.width, size / image.height)
        const width = image.width * scale
        const height = image.height * scale
        const x = (size - width) / 2
        const y = (size - height) / 2
        context.drawImage(image, x, y, width, height)
        callback(canvas.toDataURL('image/jpeg', 0.72))
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  }

  function handleRegisterImageChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    resizeImage(file, (dataUrl) => {
      setRegisterData((prev) => ({ ...prev, profileImage: dataUrl }))
    })
  }

  function handleSendRegisterOtp() {
    setRegisterError('')
    if (!isValidPhone(registerData.phone)) {
      setRegisterError('رقم الهاتف غير صحيح')
      return
    }
    const result = sendOtpCode(registerData.phone, 'register')
    setRegisterOtpSentCode(result.code)
    setRegisterSuccess('تم إرسال رمز التحقق')
  }

  function handleVerifyRegisterOtp() {
    setRegisterError('')
    const result = verifyOtpCode(registerData.phone, registerData.otpCode, 'register')
    if (!result.success) {
      setRegisterError(result.message)
      return
    }
    setRegisterPhoneVerified(true)
    setVerifiedRegisterPhone(normalizePhone(registerData.phone))
    setRegisterSuccess(result.message)
  }

  function handleRegisterSubmit() {
    setRegisterError('')
    setRegisterSuccess('')
    if (!registerData.name.trim() || !registerData.phone.trim() || !registerData.password.trim() || !registerData.email.trim() || !registerData.village) {
      setRegisterError('يرجى تعبئة جميع حقول التسجيل المطلوبة')
      return
    }
    if (!isValidPhone(registerData.phone)) {
      setRegisterError('رقم الهاتف غير صحيح')
      return
    }
    if (!isValidEmail(registerData.email)) {
      setRegisterError('البريد الإلكتروني غير صحيح')
      return
    }
    if (!isStrongEnoughPassword(registerData.password)) {
      setRegisterError('كلمة المرور ضعيفة (6 أحرف على الأقل)')
      return
    }
    const normalizedPhone = normalizePhone(registerData.phone)
    const result = registerUser(usersData, { ...registerData, phoneVerified: registerPhoneVerified && verifiedRegisterPhone === normalizedPhone })
    if (!result.success) {
      setRegisterError(result.message)
      return
    }
    saveUsers(result.users)
    setUsersData(result.users)
    setRegisterSuccess('تم إنشاء الحساب بنجاح ويمكنك الآن تسجيل الدخول')
    setRegisterData({ name: '', phone: '', email: '', password: '', village: '', profileImage: '', otpCode: '' })
    setRegisterPhoneVerified(false)
    setVerifiedRegisterPhone('')
    setRegisterOtpSentCode('')
  }

  function handleLoginChange(event) {
    const { name, value } = event.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  function handleLoginSubmit() {
    setLoginError('')
    setLoginSuccess('')
    const result = loginWithPassword(loadUsers(), loginData.phone, loginData.password)
    if (!result.success) {
      setLoginError(result.message)
      return
    }
    setCurrentUserId(result.user.id)
    setLoginSuccess('تم تسجيل الدخول بنجاح')
    setLoginData({ phone: '', password: '' })
  }

  function handleOtpLoginChange(event) {
    const { name, value } = event.target
    setOtpLoginData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSendLoginOtp() {
    setOtpError('')
    const phone = otpLoginData.phone.trim()
    if (!isValidPhone(phone)) {
      setOtpError('رقم الهاتف غير صحيح')
      return
    }
    const result = sendOtpCode(phone, 'login')
    setLoginOtpSentCode(result.code)
    setOtpSuccess('تم إرسال رمز OTP')
  }

  function handleOtpLoginSubmit() {
    setOtpError('')
    setOtpSuccess('')
    const verifyResult = verifyOtpCode(otpLoginData.phone, otpLoginData.code, 'login')
    if (!verifyResult.success) {
      setOtpError(verifyResult.message)
      return
    }
    const result = loginWithOtp(loadUsers(), otpLoginData.phone)
    if (!result.success) {
      setOtpError(result.message)
      return
    }
    setCurrentUserId(result.user.id)
    setOtpSuccess(result.message)
    setOtpLoginData({ phone: '', code: '' })
    setLoginOtpSentCode('')
  }

  function handleForgotPasswordChange(event) {
    const { name, value } = event.target
    setForgotPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  function handleForgotPasswordSubmit() {
    setForgotPasswordError('')
    setForgotPasswordSuccess('')
    const result = resetPasswordWithEmail(usersData, forgotPasswordData)
    if (!result.success) {
      setForgotPasswordError(result.message)
      return
    }
    setUsersData(result.users)
    setForgotPasswordSuccess(result.message)
    setForgotPasswordData({ email: '', phone: '', newPassword: '' })
  }

  function handleProfileChange(event) {
    const { name, value } = event.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  function handleProfileImageChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    resizeImage(file, (dataUrl) => {
      setProfileData((prev) => ({ ...prev, profileImage: dataUrl }))
    })
  }

  function handleProfileSave() {
    if (!currentUser) return
    const result = updateUserProfile(usersData, currentUser.id, profileData)
    if (!result.success) {
      setErrorMessage(result.message)
      setSuccessMessage('')
      return
    }
    setUsersData(result.users)
    setSuccessMessage('تم حفظ بيانات الملف الشخصي')
    setErrorMessage('')
  }

  function handleChangeUserVillage(userId, village) {
    setRoleError('')
    setRoleSuccess('')
    if (!canManageUsers(currentUser)) {
      setRoleError('ليس لديك صلاحية تعديل المستخدمين')
      return
    }
    const result = updateUserVillage(usersData, userId, village)
    if (!result.success) {
      setRoleError(result.message)
      return
    }
    setUsersData(result.users)
    setRoleSuccess('تم تحديث القرية بنجاح')
  }

  function handleLogout() {
    setCurrentUserId(null)
    setSelectedVillage('')
    setProfileData({ name: '', email: '', profileImage: '' })
    setSearch('')
    setCurrentPage('auth')
    resetForm()
    clearMessages()
    clearAuthMessages()
  }

  function handleVillageChange(event) {
    const value = event.target.value
    setSelectedVillage(value)
    setSearch('')
    clearMessages()
    resetForm()
  }

  function handleSearchChange(event) {
    setSearch(event.target.value)
    setSuccessMessage('')
  }

  function handleClearSearch() {
    setSearch('')
  }

  function handleFormChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSuccessMessage('')
  }

  function handleEditEvent(eventItem) {
    if (!canEditEvent(currentUser, eventItem)) {
      setErrorMessage('ليس لديك صلاحية تعديل هذا الحدث')
      setSuccessMessage('')
      return
    }
    setFormData({ groom: eventItem.groom, bride: eventItem.bride, hall: eventItem.hall, date: eventItem.date })
    setEditingEventId(eventItem.id)
    setErrorMessage('')
    setSuccessMessage('')
  }

  function handleDeleteEvent(eventId) {
    const targetEvent = eventsData.find((item) => item.id === eventId)
    if (!targetEvent) return
    if (!canDeleteEvent(currentUser, targetEvent)) {
      setErrorMessage('ليس لديك صلاحية حذف هذا الحدث')
      setSuccessMessage('')
      return
    }
    if (!window.confirm('هل أنت متأكد من حذف هذا الحدث؟')) return

    const updatedEvents = eventsData.filter((item) => item.id !== eventId)
    setEventsData(updatedEvents)
    const updatedUsers = usersData.map((user) => ({ ...user, myEvents: user.myEvents.filter((id) => id !== eventId) }))
    setUsersData(updatedUsers)
    setSuccessMessage('تم حذف الحدث بنجاح')
    setErrorMessage('')
    if (editingEventId === eventId) resetForm()
  }

  function handleApproveEvent(eventId) {
    const targetEvent = eventsData.find((item) => item.id === eventId)
    if (!targetEvent) return
    if (!canApproveEvent(currentUser, targetEvent)) {
      setErrorMessage('ليس لديك صلاحية الموافقة على هذا الحدث')
      setSuccessMessage('')
      return
    }
    const updatedEvents = eventsData.map((item) => (item.id === eventId ? { ...item, status: 'approved' } : item))
    setEventsData(updatedEvents)
    setSuccessMessage('تمت الموافقة على الحدث')
    setErrorMessage('')
  }

  function handleRejectEvent(eventId) {
    const targetEvent = eventsData.find((item) => item.id === eventId)
    if (!targetEvent) return
    if (!canRejectEvent(currentUser, targetEvent)) {
      setErrorMessage('ليس لديك صلاحية رفض هذا الحدث')
      setSuccessMessage('')
      return
    }
    const updatedEvents = eventsData.map((item) => (item.id === eventId ? { ...item, status: 'rejected' } : item))
    setEventsData(updatedEvents)
    setSuccessMessage('تم رفض الحدث')
    setErrorMessage('')
  }

  function handleSubmitEvent() {
    clearMessages()
    if (!canAddEvent(currentUser, selectedVillage)) {
      setErrorMessage('ليس لديك صلاحية إضافة حدث في هذه القرية')
      return
    }
    const validationMessage = validateEventForm(formData, selectedVillage, currentUser)
    if (validationMessage) {
      setErrorMessage(validationMessage)
      return
    }

    const payload = {
      type: 'wedding',
      groom: formData.groom.trim(),
      bride: formData.bride.trim(),
      hall: formData.hall.trim(),
      date: formData.date,
      village: selectedVillage,
      title: `${formData.groom.trim()} / ${formData.bride.trim()}`,
    }

    if (editingEventId) {
      const originalEvent = eventsData.find((item) => item.id === editingEventId)
      if (!originalEvent) {
        setErrorMessage('لم يتم العثور على الحدث المطلوب تعديله')
        return
      }
      if (!canEditEvent(currentUser, originalEvent)) {
        setErrorMessage('ليس لديك صلاحية تعديل هذا الحدث')
        return
      }
      const updatedEvents = eventsData.map((item) => (item.id === editingEventId ? { ...item, ...payload } : item))
      setEventsData(updatedEvents)
      setSuccessMessage('تم تحديث الحدث بنجاح')
      resetForm()
      return
    }

    const status = getNewEventStatus(currentUser, selectedVillage)
    const newEvent = Event.create({ ...payload, createdByUserId: currentUser.id, status }).toJSON()
    setEventsData((prev) => [...prev, newEvent])
    const updatedUsers = usersData.map((user) =>
      user.id === currentUser.id ? { ...user, myEvents: Array.from(new Set([...user.myEvents, newEvent.id])) } : user
    )
    setUsersData(updatedUsers)
    setSuccessMessage(status === 'pending' ? 'تم إرسال الحدث بانتظار الموافقة' : 'تمت إضافة الحدث بنجاح')
    resetForm()
  }

  function handleToggleSaveEvent(eventId) {
    if (!currentUser) return
    const updatedUsers = usersData.map((user) => {
      if (user.id !== currentUser.id) return user
      const exists = user.myEvents.includes(eventId)
      return {
        ...user,
        myEvents: exists ? user.myEvents.filter((id) => id !== eventId) : [...user.myEvents, eventId],
      }
    })
    setUsersData(updatedUsers)
  }

  function handleChangeUserRole(userId, newRole) {
    setRoleError('')
    setRoleSuccess('')
    if (!canManageUsers(currentUser)) {
      setRoleError('ليس لديك صلاحية تعديل المستخدمين')
      return
    }
    const result = updateUserRole(usersData, userId, newRole)
    if (!result.success) {
      setRoleError(result.message)
      return
    }
    setUsersData(result.users)
    setRoleSuccess('تم تحديث الدور بنجاح')
  }

  const relevantEventsByVillage = useMemo(() => {
    if (!selectedVillage) return []
    return eventsData.filter((eventItem) => eventItem.village === selectedVillage && canViewEvent(currentUser, eventItem))
  }, [eventsData, selectedVillage, currentUser])

  const filteredEvents = useMemo(() => filterEvents(relevantEventsByVillage, search), [relevantEventsByVillage, search])
  const sortedEvents = useMemo(() => sortEvents(filteredEvents), [filteredEvents])

  const pendingBase = useMemo(() => {
    let base = eventsData.filter((eventItem) => eventItem.status === 'pending' && canViewEvent(currentUser, eventItem))
    if (selectedVillage) {
      base = base.filter((eventItem) => eventItem.village === selectedVillage)
    }
    return base
  }, [eventsData, currentUser, selectedVillage])

  const pendingEvents = useMemo(() => sortEvents(filterEvents(pendingBase, search)), [pendingBase, search])

  const dashboardCountSource = useMemo(() => {
    let base = eventsData.filter((eventItem) => canViewEvent(currentUser, eventItem))
    if (selectedVillage) {
      base = base.filter((eventItem) => eventItem.village === selectedVillage)
    }
    return base
  }, [eventsData, currentUser, selectedVillage])

  const dashboardCounts = useMemo(() => ({
    total: dashboardCountSource.length,
    approved: dashboardCountSource.filter((item) => item.status === 'approved').length,
    pending: dashboardCountSource.filter((item) => item.status === 'pending').length,
    rejected: dashboardCountSource.filter((item) => item.status === 'rejected').length,
  }), [dashboardCountSource])

  const myEvents = useMemo(() => {
    if (!currentUser) return []
    return sortEvents(eventsData.filter((eventItem) => currentUser.myEvents.includes(eventItem.id)))
  }, [eventsData, currentUser])

  const savedEventIds = currentUser?.myEvents || []
  const userCanAddInSelectedVillage = canAddEvent(currentUser, selectedVillage)

  if (!currentUser) {
    return (
      <PublicLayout>
        <PublicHomePage
          registerData={registerData}
          onRegisterChange={handleRegisterChange}
          onRegisterImageChange={handleRegisterImageChange}
          onSendRegisterOtp={handleSendRegisterOtp}
          onVerifyRegisterOtp={handleVerifyRegisterOtp}
          onRegisterSubmit={handleRegisterSubmit}
          registerError={registerError}
          registerSuccess={registerSuccess}
          registerOtpSentCode={registerOtpSentCode}
          registerPhoneVerified={registerPhoneVerified}
          loginData={loginData}
          onLoginChange={handleLoginChange}
          onLoginSubmit={handleLoginSubmit}
          loginError={loginError}
          loginSuccess={loginSuccess}
          otpLoginData={otpLoginData}
          onOtpLoginChange={handleOtpLoginChange}
          onSendLoginOtp={handleSendLoginOtp}
          onOtpLoginSubmit={handleOtpLoginSubmit}
          otpError={otpError}
          otpSuccess={otpSuccess}
          loginOtpSentCode={loginOtpSentCode}
          forgotPasswordData={forgotPasswordData}
          onForgotPasswordChange={handleForgotPasswordChange}
          onForgotPasswordSubmit={handleForgotPasswordSubmit}
          forgotPasswordError={forgotPasswordError}
          forgotPasswordSuccess={forgotPasswordSuccess}
        />
      </PublicLayout>
    )
  }

  if (isManagementUser(currentUser)) {
    let adminContent = null
    if (currentPage === 'profile') {
      adminContent = <ProfilePage currentUser={currentUser} profileData={profileData} onProfileChange={handleProfileChange} onProfileImageChange={handleProfileImageChange} onProfileSave={handleProfileSave} />
    } else if (currentPage === 'my-events') {
      adminContent = <MyEventsPage currentUser={currentUser} myEvents={myEvents} usersById={usersById} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} onApproveEvent={handleApproveEvent} onRejectEvent={handleRejectEvent} onToggleSaveEvent={handleToggleSaveEvent} savedEventIds={savedEventIds} />
    } else if (currentPage === 'users' && canManageUsers(currentUser)) {
      adminContent = <UserManagementPage users={usersData} currentUser={currentUser} onChangeUserRole={handleChangeUserRole} onChangeUserVillage={handleChangeUserVillage} message={roleSuccess} errorMessage={roleError} />
    } else {
      adminContent = (
        <AdminDashboardPage
          selectedVillage={selectedVillage}
          onVillageChange={handleVillageChange}
          search={search}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
          formData={formData}
          onFormChange={handleFormChange}
          onSubmitEvent={handleSubmitEvent}
          onCancelEdit={resetForm}
          errorMessage={errorMessage}
          successMessage={successMessage}
          editingEventId={editingEventId}
          canAddEvent={userCanAddInSelectedVillage}
          dashboardCounts={dashboardCounts}
          events={sortedEvents}
          pendingEvents={pendingEvents}
          currentUser={currentUser}
          usersById={usersById}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          onApproveEvent={handleApproveEvent}
          onRejectEvent={handleRejectEvent}
          onToggleSaveEvent={handleToggleSaveEvent}
          savedEventIds={savedEventIds}
          currentPage={currentPage}
        />
      )
    }

    return (
      <AdminLayout currentUser={currentUser} currentPage={currentPage} onChangePage={setCurrentPage} onLogout={handleLogout}>
        {adminContent}
      </AdminLayout>
    )
  }

  let userContent = null
  if (currentPage === 'profile') {
    userContent = <ProfilePage currentUser={currentUser} profileData={profileData} onProfileChange={handleProfileChange} onProfileImageChange={handleProfileImageChange} onProfileSave={handleProfileSave} />
  } else if (currentPage === 'my-events') {
    userContent = <MyEventsPage currentUser={currentUser} myEvents={myEvents} usersById={usersById} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} onApproveEvent={handleApproveEvent} onRejectEvent={handleRejectEvent} onToggleSaveEvent={handleToggleSaveEvent} savedEventIds={savedEventIds} />
  } else {
    userContent = <UserHomePage currentUser={currentUser} selectedVillage={selectedVillage} onVillageChange={handleVillageChange} search={search} onSearchChange={handleSearchChange} onClearSearch={handleClearSearch} formData={formData} onFormChange={handleFormChange} onSubmitEvent={handleSubmitEvent} onCancelEdit={resetForm} errorMessage={errorMessage} successMessage={successMessage} editingEventId={editingEventId} canAddEvent={userCanAddInSelectedVillage} events={sortedEvents} usersById={usersById} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} onApproveEvent={handleApproveEvent} onRejectEvent={handleRejectEvent} onToggleSaveEvent={handleToggleSaveEvent} savedEventIds={savedEventIds} />
  }

  return (
    <UserLayout currentUser={currentUser} onLogout={handleLogout}>
      <div className="card">
        <div className="button-row">
          <button className={currentPage === 'dashboard' ? 'primary-btn' : 'ghost-btn'} onClick={() => setCurrentPage('dashboard')}>الرئيسية</button>
          <button className={currentPage === 'my-events' ? 'primary-btn' : 'ghost-btn'} onClick={() => setCurrentPage('my-events')}>أعراسي</button>
          <button className={currentPage === 'profile' ? 'primary-btn' : 'ghost-btn'} onClick={() => setCurrentPage('profile')}>الإعدادات</button>
        </div>
      </div>
      {userContent}
    </UserLayout>
  )
}

export default App
