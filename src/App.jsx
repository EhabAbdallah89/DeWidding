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
  updateUserRole,
  normalizePhone,
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
} from './utils/permissions'
import { filterEvents, splitEventsByDate, validateEventForm } from './utils/eventUtils'
import PublicLayout from './layouts/PublicLayout'
import UserLayout from './layouts/UserLayout'
import AdminLayout from './layouts/AdminLayout'
import PublicHomePage from './pages/PublicHomePage'
import UserHomePage from './pages/UserHomePage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import ProfilePage from './pages/ProfilePage'
import MyEventsPage from './pages/MyEventsPage'
import AdminUsersPanel from './components/AdminUsersPanel'

const EMPTY_REGISTER = { name: '', phone: '', password: '', email: '', village: '', profileImage: '', otpCode: '' }
const EMPTY_LOGIN = { phone: '', password: '' }
const EMPTY_PROFILE = { name: '', profileImage: '' }
const EMPTY_EVENT_FORM = { groom: '', bride: '', hall: '', date: '' }
const EMPTY_OTP_META = { sent: false, verified: false, code: '', debugCode: '' }

function App() {
  const [usersData, setUsersData] = useState(loadUsers())
  const [eventsData, setEventsData] = useState(loadEvents())
  const [currentUserId, setCurrentUserId] = useState(loadValue(STORAGE_KEYS.currentUserId, null))
  const [currentPage, setCurrentPage] = useState(loadValue(STORAGE_KEYS.currentPage, 'dashboard'))
  const [selectedVillage, setSelectedVillage] = useState(loadValue(STORAGE_KEYS.selectedVillage, ''))
  const [search, setSearch] = useState(loadValue(STORAGE_KEYS.searchText, ''))

  const [registerData, setRegisterData] = useState(EMPTY_REGISTER)
  const [loginData, setLoginData] = useState(EMPTY_LOGIN)
  const [otpPhone, setOtpPhone] = useState('')
  const [otpMeta, setOtpMeta] = useState(EMPTY_OTP_META)

  const [registerError, setRegisterError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginSuccess, setLoginSuccess] = useState('')
  const [otpError, setOtpError] = useState('')
  const [otpSuccess, setOtpSuccess] = useState('')

  const [profileData, setProfileData] = useState(EMPTY_PROFILE)
  const [editingEventId, setEditingEventId] = useState(null)
  const [formData, setFormData] = useState(EMPTY_EVENT_FORM)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const currentUser = useMemo(
    () => usersData.find((user) => String(user.id) === String(currentUserId)) || null,
    [usersData, currentUserId],
  )

  useEffect(() => { saveUsers(usersData) }, [usersData])
  useEffect(() => { saveEvents(eventsData) }, [eventsData])
  useEffect(() => { saveValue(STORAGE_KEYS.currentUserId, currentUserId) }, [currentUserId])
  useEffect(() => { saveValue(STORAGE_KEYS.selectedVillage, selectedVillage) }, [selectedVillage])
  useEffect(() => { saveValue(STORAGE_KEYS.searchText, search) }, [search])
  useEffect(() => { saveValue(STORAGE_KEYS.currentPage, currentPage) }, [currentPage])

  useEffect(() => {
    if (!currentUser) {
      setProfileData(EMPTY_PROFILE)
      return
    }

    setProfileData({
      name: currentUser.name || '',
      profileImage: currentUser.profileImage || '',
    })
  }, [currentUser])

  useEffect(() => {
    if (!currentUserId) return
    const loggedUser = usersData.find((user) => String(user.id) === String(currentUserId))
    if (loggedUser?.village) {
      setSelectedVillage(loggedUser.village)
    }
  }, [currentUserId])

  function resetEventForm() {
    setFormData(EMPTY_EVENT_FORM)
    setEditingEventId(null)
  }

  function clearDashboardMessages() {
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
  }

  function resetRegisterState() {
    setRegisterData(EMPTY_REGISTER)
    setOtpMeta(EMPTY_OTP_META)
  }

  function handleRegisterChange(event) {
    const { name, value } = event.target
    setRegisterData((prev) => {
      const next = { ...prev, [name]: value }
      if (name === 'phone') {
        return { ...next, otpCode: '' }
      }
      return next
    })

    if (event.target.name === 'phone' && otpMeta.verified) {
      setOtpMeta(EMPTY_OTP_META)
    }
  }

  function handleRegisterImageChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setRegisterData((prev) => ({ ...prev, profileImage: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  function handleSendRegisterOtp() {
    clearAuthMessages()
    const normalizedPhone = normalizePhone(registerData.phone)

    if (!/^05\d{8}$/.test(normalizedPhone)) {
      setRegisterError('رقم الهاتف غير صحيح')
      return
    }

    const generatedCode = '123456'
    setOtpMeta({ sent: true, verified: false, code: generatedCode, debugCode: generatedCode })
    setRegisterSuccess('تم إرسال OTP محليًا. أدخل الرمز ثم اضغط تأكيد OTP')
  }

  function handleVerifyRegisterOtp() {
    clearAuthMessages()
    if (!otpMeta.sent) {
      setRegisterError('يجب إرسال OTP أولًا')
      return
    }

    if (String(registerData.otpCode).trim() !== String(otpMeta.code)) {
      setRegisterError('رمز OTP غير صحيح')
      return
    }

    setOtpMeta((prev) => ({ ...prev, verified: true, debugCode: '' }))
    setRegisterSuccess('تم التحقق من رقم الهاتف بنجاح')
  }

  function handleRegisterSubmit() {
    setRegisterError('')
    setRegisterSuccess('')

    if (!registerData.name.trim() || !registerData.phone.trim() || !registerData.password.trim() || !registerData.village || !registerData.email.trim()) {
      setRegisterError('يرجى تعبئة جميع حقول التسجيل المطلوبة')
      return
    }

    if (!/^05\d{8}$/.test(normalizePhone(registerData.phone))) {
      setRegisterError('رقم الهاتف غير صحيح')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email.trim())) {
      setRegisterError('البريد الإلكتروني غير صحيح')
      return
    }

    if (registerData.password.trim().length < 6) {
      setRegisterError('كلمة المرور ضعيفة (6 أحرف على الأقل)')
      return
    }

    if (!otpMeta.verified) {
      setRegisterError('يجب تأكيد رقم الهاتف عبر OTP قبل التسجيل')
      return
    }

    const result = registerUser(usersData, registerData)
    if (!result.success) {
      setRegisterError(result.message)
      return
    }

    setUsersData(result.users)
    setRegisterSuccess('تم إنشاء الحساب بنجاح — يمكنك تسجيل الدخول الآن')
    resetRegisterState()
  }

  function handleLoginChange(event) {
    const { name, value } = event.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  function handleLoginSubmit() {
    setLoginError('')
    setLoginSuccess('')
    const result = loginWithPassword(usersData, loginData.phone, loginData.password)
    if (!result.success) {
      setLoginError(result.message)
      return
    }

    setCurrentUserId(result.user.id)
    setCurrentPage('dashboard')
    setLoginSuccess('تم تسجيل الدخول بنجاح')
    setLoginData(EMPTY_LOGIN)
  }

  function handleOtpSubmit() {
    setOtpError('')
    setOtpSuccess('')
    const result = loginWithOtp(usersData, otpPhone)
    if (!result.success) {
      setOtpError(result.message)
      return
    }

    setCurrentUserId(result.user.id)
    setCurrentPage('dashboard')
    setOtpSuccess(result.message)
    setOtpPhone('')
  }

  function handleProfileChange(event) {
    const { name, value } = event.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  function handleProfileImageChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setProfileData((prev) => ({
        ...prev,
        profileImage: reader.result,
      }))
    }

    reader.readAsDataURL(file)
  }

  function handleProfileSave() {
    if (!currentUser) return
    const updatedUsers = updateUserProfile(usersData, currentUser.id, profileData)
    setUsersData(updatedUsers)
    setSuccessMessage('تم حفظ بيانات الملف الشخصي')
    setErrorMessage('')
  }

  function handleLogout() {
    setCurrentUserId(null)
    setSelectedVillage('')
    setSearch('')
    setCurrentPage('dashboard')
    setProfileData(EMPTY_PROFILE)
    resetEventForm()
    clearDashboardMessages()
    clearAuthMessages()
  }

  function handleVillageChange(event) {
    const value = event.target.value
    setSelectedVillage(value)
    clearDashboardMessages()
    resetEventForm()
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

    setFormData({
      groom: eventItem.groom,
      bride: eventItem.bride,
      hall: eventItem.hall,
      date: eventItem.date,
    })
    setEditingEventId(eventItem.id)
    setSelectedVillage(eventItem.village)
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

    const confirmDelete = window.confirm('هل أنت متأكد من حذف هذا الحدث؟')
    if (!confirmDelete) return

    const updatedEvents = eventsData.filter((item) => item.id !== eventId)
    setEventsData(updatedEvents)
    setUsersData((prevUsers) => prevUsers.map((user) => ({ ...user, myEvents: user.myEvents.filter((id) => id !== eventId) })))
    setSuccessMessage('تم حذف الحدث بنجاح')
    setErrorMessage('')

    if (editingEventId === eventId) {
      resetEventForm()
    }
  }

  function handleApproveEvent(eventId) {
    const targetEvent = eventsData.find((item) => item.id === eventId)
    if (!targetEvent) return
    if (!canApproveEvent(currentUser, targetEvent)) {
      setErrorMessage('ليس لديك صلاحية الموافقة على هذا الحدث')
      setSuccessMessage('')
      return
    }

    setEventsData((prev) => prev.map((item) => (item.id === eventId ? { ...item, status: 'approved' } : item)))
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

    setEventsData((prev) => prev.map((item) => (item.id === eventId ? { ...item, status: 'rejected' } : item)))
    setSuccessMessage('تم رفض الحدث')
    setErrorMessage('')
  }

  function handleSubmitEvent() {
    clearDashboardMessages()

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

      setEventsData((prev) => prev.map((item) => (item.id === editingEventId ? { ...item, ...payload } : item)))
      setSuccessMessage('تم تحديث الحدث بنجاح')
      resetEventForm()
      return
    }

    const status = getNewEventStatus(currentUser, selectedVillage)
    const newEvent = Event.create({ ...payload, createdByUserId: currentUser.id, status }).toJSON()
    setEventsData((prev) => [...prev, newEvent])
    setUsersData((prevUsers) =>
      prevUsers.map((user) =>
        user.id === currentUser.id
          ? { ...user, myEvents: user.myEvents.includes(newEvent.id) ? user.myEvents : [...user.myEvents, newEvent.id] }
          : user,
      ),
    )
    setSuccessMessage(status === 'pending' ? 'تم إرسال الحدث بانتظار الموافقة' : 'تمت إضافة الحدث بنجاح')
    resetEventForm()
  }

  function handleRoleChange(userId, role) {
    if (currentUser?.role !== 'admin') return
    setUsersData((prevUsers) => updateUserRole(prevUsers, userId, role))
  }

  const managementVisibleEvents = useMemo(() => eventsData.filter((eventItem) => canViewEvent(currentUser, eventItem)), [eventsData, currentUser])

  const allVisibleEvents = useMemo(() => {
    if (!selectedVillage) return []
    return managementVisibleEvents.filter((eventItem) => eventItem.village === selectedVillage)
  }, [managementVisibleEvents, selectedVillage])

  const filteredVisibleEvents = useMemo(() => filterEvents(allVisibleEvents, search), [allVisibleEvents, search])
  const { upcoming: upcomingEvents, past: pastEvents } = useMemo(() => splitEventsByDate(filteredVisibleEvents), [filteredVisibleEvents])

  const pendingEvents = useMemo(() => {
    const pendingSource = managementVisibleEvents.filter((eventItem) => eventItem.status === 'pending')
    return splitEventsByDate(filterEvents(pendingSource, search)).upcoming.concat(splitEventsByDate(filterEvents(pendingSource, search)).past)
  }, [managementVisibleEvents, search])

  const myEvents = useMemo(() => {
    if (!currentUser) return []
    const source = eventsData.filter((eventItem) => currentUser.myEvents.includes(eventItem.id))
    return splitEventsByDate(source).upcoming.concat(splitEventsByDate(source).past)
  }, [eventsData, currentUser])

  const stats = useMemo(() => {
    const source = managementVisibleEvents
    return {
      total: source.length,
      approved: source.filter((item) => item.status === 'approved').length,
      pending: source.filter((item) => item.status === 'pending').length,
      rejected: source.filter((item) => item.status === 'rejected').length,
    }
  }, [managementVisibleEvents])

  const userCanAddInSelectedVillage = canAddEvent(currentUser, selectedVillage)

  if (!currentUser) {
    return (
      <PublicLayout>
        <PublicHomePage
          registerData={registerData}
          onRegisterChange={handleRegisterChange}
          onRegisterImageChange={handleRegisterImageChange}
          onRegisterSubmit={handleRegisterSubmit}
          onRegisterReset={resetRegisterState}
          onSendRegisterOtp={handleSendRegisterOtp}
          onVerifyRegisterOtp={handleVerifyRegisterOtp}
          onRegisterOtpCodeChange={handleRegisterChange}
          registerError={registerError}
          registerSuccess={registerSuccess}
          registerOtpMeta={otpMeta}
          loginData={loginData}
          onLoginChange={handleLoginChange}
          onLoginSubmit={handleLoginSubmit}
          loginError={loginError}
          loginSuccess={loginSuccess}
          otpPhone={otpPhone}
          onOtpPhoneChange={(e) => setOtpPhone(e.target.value)}
          onOtpSubmit={handleOtpSubmit}
          otpError={otpError}
          otpSuccess={otpSuccess}
        />
      </PublicLayout>
    )
  }

  if (isManagementUser(currentUser)) {
    let adminContent = null

    if (currentPage === 'profile') {
      adminContent = <ProfilePage currentUser={currentUser} profileData={profileData} onProfileChange={handleProfileChange} onProfileImageChange={handleProfileImageChange} onProfileSave={handleProfileSave} />
    } else if (currentPage === 'my-events') {
      adminContent = <MyEventsPage currentUser={currentUser} myEvents={myEvents} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} onApproveEvent={handleApproveEvent} onRejectEvent={handleRejectEvent} />
    } else if (currentPage === 'users' && currentUser.role === 'admin') {
      adminContent = <AdminUsersPanel users={usersData} currentUser={currentUser} onRoleChange={handleRoleChange} />
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
          onCancelEdit={resetEventForm}
          errorMessage={errorMessage}
          successMessage={successMessage}
          editingEventId={editingEventId}
          canAddEvent={userCanAddInSelectedVillage}
          upcomingEvents={upcomingEvents}
          pastEvents={pastEvents}
          pendingEvents={pendingEvents}
          currentUser={currentUser}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
          onApproveEvent={handleApproveEvent}
          onRejectEvent={handleRejectEvent}
          currentPage={currentPage}
          stats={stats}
        />
      )
    }

    return <AdminLayout currentUser={currentUser} currentPage={currentPage} onChangePage={setCurrentPage} onLogout={handleLogout}>{adminContent}</AdminLayout>
  }

  let userContent = null
  if (currentPage === 'profile') {
    userContent = <ProfilePage currentUser={currentUser} profileData={profileData} onProfileChange={handleProfileChange} onProfileImageChange={handleProfileImageChange} onProfileSave={handleProfileSave} />
  } else if (currentPage === 'my-events') {
    userContent = <MyEventsPage currentUser={currentUser} myEvents={myEvents} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} onApproveEvent={handleApproveEvent} onRejectEvent={handleRejectEvent} />
  } else {
    userContent = (
      <UserHomePage
        currentUser={currentUser}
        selectedVillage={selectedVillage}
        onVillageChange={handleVillageChange}
        search={search}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        formData={formData}
        onFormChange={handleFormChange}
        onSubmitEvent={handleSubmitEvent}
        onCancelEdit={resetEventForm}
        errorMessage={errorMessage}
        successMessage={successMessage}
        editingEventId={editingEventId}
        canAddEvent={userCanAddInSelectedVillage}
        upcomingEvents={upcomingEvents}
        pastEvents={pastEvents}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
        onApproveEvent={handleApproveEvent}
        onRejectEvent={handleRejectEvent}
      />
    )
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
