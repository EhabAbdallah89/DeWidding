import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { loadEvents, saveEvents } from './services/eventService'
import { loadUsers, saveUsers, registerUser, loginWithOtp, updateUserProfile, toggleMyEventForUser, updateUserRole, markPhoneVerified, isValidIsraeliMobile } from './services/userService'
import { loadValue, saveValue, STORAGE_KEYS } from './services/storageService'
import { loadAdminMeta, saveAdminMeta } from './services/adminMetaService'
import { createOtpSession, getOtpSession, verifyOtpCode } from './services/otpService'
import { Event } from './models/Event'
import { canAddEvent, canDeleteEvent, canEditEvent, canViewEvent, canApproveEvent, canRejectEvent, getNewEventStatus, isManagementUser, canManageUsers, canViewCreatedBy } from './utils/permissions'
import { sortEvents, filterEvents, validateEventForm, splitEventsByDate } from './utils/eventUtils'
import PublicLayout from './layouts/PublicLayout'
import UserLayout from './layouts/UserLayout'
import AdminLayout from './layouts/AdminLayout'
import PublicHomePage from './pages/PublicHomePage'
import UserHomePage from './pages/UserHomePage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import ProfilePage from './pages/ProfilePage'
import MyEventsPage from './pages/MyEventsPage'
import UserManagementPanel from './components/UserManagementPanel'

const DEFAULT_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
    <rect width="160" height="160" rx="80" fill="#d1d5db" />
    <circle cx="80" cy="58" r="28" fill="#9ca3af" />
    <path d="M34 132c7-24 27-38 46-38s39 14 46 38" fill="#9ca3af" />
  </svg>
`)}`

function App() {
  const [usersData, setUsersData] = useState(loadUsers())
  const [adminMeta, setAdminMeta] = useState(loadAdminMeta())
  const [currentUserId, setCurrentUserId] = useState(loadValue(STORAGE_KEYS.currentUserId, null))
  const currentUser = useMemo(() => usersData.find((user) => user.id === currentUserId) || null, [usersData, currentUserId])

  const [registerData, setRegisterData] = useState({ name:'', phone:'', village:'' })
  const [otpPhone, setOtpPhone] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [otpStep, setOtpStep] = useState('request')
  const [otpDebugCode, setOtpDebugCode] = useState(getOtpSession()?.code || '')

  const [registerError, setRegisterError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState('')
  const [otpError, setOtpError] = useState('')
  const [otpSuccess, setOtpSuccess] = useState('')

  const [profileData, setProfileData] = useState({ name:'', profileImage:'' })
  const [selectedVillage, setSelectedVillage] = useState(loadValue(STORAGE_KEYS.selectedVillage, ''))
  const [search, setSearch] = useState(loadValue(STORAGE_KEYS.searchText, ''))
  const [currentPage, setCurrentPage] = useState(loadValue(STORAGE_KEYS.currentPage, 'dashboard'))
  const [eventsData, setEventsData] = useState(loadEvents())
  const [editingEventId, setEditingEventId] = useState(null)
  const [formData, setFormData] = useState({ groom:'', bride:'', hall:'', date:'' })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => { saveUsers(usersData) }, [usersData])
  useEffect(() => { saveEvents(eventsData) }, [eventsData])
  useEffect(() => { saveAdminMeta(adminMeta) }, [adminMeta])
  useEffect(() => { saveValue(STORAGE_KEYS.currentUserId, currentUserId) }, [currentUserId])
  useEffect(() => { saveValue(STORAGE_KEYS.selectedVillage, selectedVillage) }, [selectedVillage])
  useEffect(() => { saveValue(STORAGE_KEYS.searchText, search) }, [search])
  useEffect(() => { saveValue(STORAGE_KEYS.currentPage, currentPage) }, [currentPage])

  useEffect(() => {
    if (!currentUser) {
      setProfileData({ name: '', profileImage: '' })
      return
    }

    setProfileData({
      name: currentUser.name || '',
      profileImage: currentUser.profileImage || '',
    })
  }, [currentUser])

  useEffect(() => {
    if (!currentUser?.village) return
    setSelectedVillage(currentUser.village)
  }, [currentUser])

  function resetForm() {
    setFormData({ groom:'', bride:'', hall:'', date:'' })
    setEditingEventId(null)
  }

  function clearMessages() {
    setErrorMessage('')
    setSuccessMessage('')
  }

  function clearAuthMessages() {
    setRegisterError('')
    setRegisterSuccess('')
    setOtpError('')
    setOtpSuccess('')
  }

  function handleRegisterChange(event) {
    const { name, value } = event.target
    setRegisterData((prev) => ({ ...prev, [name]: value }))
  }

  function handleRegisterSubmit() {
    setRegisterError('')
    setRegisterSuccess('')

    const result = registerUser(usersData, registerData)
    if (!result.success) {
      setRegisterError(result.message)
      return
    }

    setUsersData(result.users)
    setRegisterSuccess('تم إنشاء الحساب بنجاح — يمكنك الآن طلب OTP والدخول')
    setRegisterData({ name:'', phone:'', village:'' })
  }

  function handleOtpRequest() {
    setOtpError('')
    setOtpSuccess('')

    if (!isValidIsraeliMobile(otpPhone)) {
      setOtpError('أدخل رقم هاتف إسرائيلي صالح بصيغة 05XXXXXXXX')
      return
    }

    const result = loginWithOtp(usersData, otpPhone)
    if (!result.success) {
      setOtpError(result.message)
      return
    }

    const otpSession = createOtpSession(otpPhone)
    setOtpDebugCode(otpSession.code)
    setOtpStep('verify')
    setOtpSuccess('تم إنشاء رمز تحقق لهذا الجهاز. أدخل الرمز لإكمال الدخول.')
  }

  function handleOtpVerify() {
    setOtpError('')
    setOtpSuccess('')

    const verificationResult = verifyOtpCode(otpPhone, otpCode)
    if (!verificationResult.success) {
      setOtpError(verificationResult.message)
      return
    }

    const result = loginWithOtp(usersData, otpPhone)
    if (!result.success) {
      setOtpError(result.message)
      return
    }

    const updatedUsers = markPhoneVerified(usersData, result.user.id)
    setUsersData(updatedUsers)
    setCurrentUserId(result.user.id)
    setOtpSuccess('تم تسجيل الدخول بنجاح عبر OTP')
    setOtpCode('')
    setOtpPhone('')
    setOtpStep('request')
    setOtpDebugCode('')
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
      setProfileData((prev) => ({ ...prev, profileImage: reader.result }))
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
    setProfileData({ name: '', profileImage: '' })
    setSearch('')
    setCurrentPage('dashboard')
    setOtpPhone('')
    setOtpCode('')
    setOtpStep('request')
    setOtpDebugCode('')
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

    setFormData({ groom:eventItem.groom, bride:eventItem.bride, hall:eventItem.hall, date:eventItem.date })
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

    const confirmDelete = window.confirm('هل أنت متأكد من حذف هذا الحدث؟')
    if (!confirmDelete) return

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

    const updatedEvents = eventsData.map((item) => item.id === eventId ? { ...item, status:'approved' } : item)
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

    const updatedEvents = eventsData.map((item) => item.id === eventId ? { ...item, status:'rejected' } : item)
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
      type:'wedding',
      groom:formData.groom.trim(),
      bride:formData.bride.trim(),
      hall:formData.hall.trim(),
      date:formData.date,
      village:selectedVillage,
      title:`${formData.groom.trim()} / ${formData.bride.trim()}`,
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

      const updatedEvents = eventsData.map((item) => item.id === editingEventId ? { ...item, ...payload } : item)
      setEventsData(updatedEvents)
      setSuccessMessage('تم تحديث الحدث بنجاح')
      resetForm()
      return
    }

    const status = getNewEventStatus(currentUser, selectedVillage)
    const newEvent = Event.create({ ...payload, createdByUserId: currentUser.id, status }).toJSON()
    setEventsData((prev) => [...prev, newEvent])
    const updatedUsers = toggleMyEventForUser(usersData, currentUser.id, newEvent.id)
    setUsersData(updatedUsers)
    setSuccessMessage(status === 'pending' ? 'تم إرسال الحدث بانتظار الموافقة' : 'تمت إضافة الحدث بنجاح')
    resetForm()
  }

  function handleToggleMyEvent(eventId) {
    if (!currentUser) return
    const updatedUsers = toggleMyEventForUser(usersData, currentUser.id, eventId)
    setUsersData(updatedUsers)
  }

  function handleChangeUserRole(targetUserId, nextRole) {
    if (!canManageUsers(currentUser)) return

    const targetUser = usersData.find((user) => user.id === targetUserId)
    if (!targetUser || targetUser.role === nextRole) return

    const confirmed = window.confirm(`تغيير دور ${targetUser.name} إلى ${nextRole.toUpperCase()}؟`)
    if (!confirmed) return

    setUsersData((prev) => updateUserRole(prev, targetUserId, nextRole))
    setAdminMeta((prev) => ({
      ...prev,
      [targetUserId]: nextRole === 'admin'
        ? { canEditUsers: true, canViewCreatedBy: true, canApproveEvents: true }
        : nextRole === 'supervisor'
          ? { canEditUsers: false, canViewCreatedBy: false, canApproveEvents: true }
          : { canEditUsers: false, canViewCreatedBy: false, canApproveEvents: false },
    }))
  }

  const createdByNameMap = useMemo(() => Object.fromEntries(usersData.map((user) => [user.id, user.name])), [usersData])

  const allVisibleEvents = useMemo(() => {
    if (!selectedVillage) return []
    return eventsData.filter((eventItem) => eventItem.village === selectedVillage && canViewEvent(currentUser, eventItem))
  }, [eventsData, selectedVillage, currentUser])

  const filteredEvents = useMemo(() => filterEvents(allVisibleEvents, search), [allVisibleEvents, search])
  const sortedEvents = useMemo(() => sortEvents(filteredEvents), [filteredEvents])
  const splitVisibleEvents = useMemo(() => splitEventsByDate(sortedEvents), [sortedEvents])

  const pendingSource = useMemo(() => {
    if (!currentUser) return []
    return eventsData.filter((eventItem) => eventItem.status === 'pending' && canViewEvent(currentUser, eventItem))
  }, [eventsData, currentUser])

  const pendingEvents = useMemo(() => splitEventsByDate(sortEvents(filterEvents(pendingSource, search))), [pendingSource, search])

  const myEvents = useMemo(() => {
    if (!currentUser) return []
    return sortEvents(eventsData.filter((eventItem) => currentUser.myEvents.includes(eventItem.id) && canViewEvent(currentUser, eventItem)))
  }, [eventsData, currentUser])

  const myEventsSplit = useMemo(() => splitEventsByDate(myEvents), [myEvents])
  const userCanAddInSelectedVillage = canAddEvent(currentUser, selectedVillage)
  const showCreatedBy = canViewCreatedBy(currentUser)
  const currentUserMyEventIds = currentUser?.myEvents || []

  if (!currentUser) {
    return (
      <PublicLayout>
        <PublicHomePage
          registerData={registerData}
          onRegisterChange={handleRegisterChange}
          onRegisterSubmit={handleRegisterSubmit}
          registerError={registerError}
          registerSuccess={registerSuccess}
          otpPhone={otpPhone}
          otpCode={otpCode}
          otpStep={otpStep}
          onOtpPhoneChange={(e) => setOtpPhone(e.target.value)}
          onOtpCodeChange={(e) => setOtpCode(e.target.value)}
          onOtpRequest={handleOtpRequest}
          onOtpVerify={handleOtpVerify}
          otpError={otpError}
          otpSuccess={otpSuccess}
          otpDebugCode={otpDebugCode}
        />
      </PublicLayout>
    )
  }

  if (isManagementUser(currentUser)) {
    let adminContent = null

    if (currentPage === 'profile') {
      adminContent = <ProfilePage currentUser={currentUser} profileData={profileData} onProfileChange={handleProfileChange} onProfileImageChange={handleProfileImageChange} onProfileSave={handleProfileSave} defaultAvatar={DEFAULT_AVATAR} />
    } else if (currentPage === 'my-events') {
      adminContent = <MyEventsPage currentUser={currentUser} myEventsSplit={myEventsSplit} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} onApproveEvent={handleApproveEvent} onRejectEvent={handleRejectEvent} onToggleMyEvent={handleToggleMyEvent} myEventIds={currentUserMyEventIds} createdByNameMap={createdByNameMap} showCreatedBy={showCreatedBy} />
    } else if (currentPage === 'users') {
      adminContent = <UserManagementPanel users={usersData} currentUser={currentUser} onChangeUserRole={handleChangeUserRole} />
    } else {
      adminContent = <AdminDashboardPage selectedVillage={selectedVillage} onVillageChange={handleVillageChange} search={search} onSearchChange={handleSearchChange} onClearSearch={handleClearSearch} formData={formData} onFormChange={handleFormChange} onSubmitEvent={handleSubmitEvent} onCancelEdit={resetForm} errorMessage={errorMessage} successMessage={successMessage} editingEventId={editingEventId} canAddEvent={userCanAddInSelectedVillage} upcomingEvents={splitVisibleEvents.upcoming} pastEvents={splitVisibleEvents.past} allVisibleEvents={allVisibleEvents} pendingEvents={pendingEvents} currentUser={currentUser} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} onApproveEvent={handleApproveEvent} onRejectEvent={handleRejectEvent} currentPage={currentPage} onToggleMyEvent={handleToggleMyEvent} myEventIds={currentUserMyEventIds} createdByNameMap={createdByNameMap} showCreatedBy={showCreatedBy} />
    }

    return <AdminLayout currentUser={currentUser} currentPage={currentPage} onChangePage={setCurrentPage} onLogout={handleLogout}>{adminContent}</AdminLayout>
  }

  let userContent = null
  if (currentPage === 'profile') {
    userContent = <ProfilePage currentUser={currentUser} profileData={profileData} onProfileChange={handleProfileChange} onProfileImageChange={handleProfileImageChange} onProfileSave={handleProfileSave} defaultAvatar={DEFAULT_AVATAR} />
  } else if (currentPage === 'my-events') {
    userContent = <MyEventsPage currentUser={currentUser} myEventsSplit={myEventsSplit} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} onApproveEvent={handleApproveEvent} onRejectEvent={handleRejectEvent} onToggleMyEvent={handleToggleMyEvent} myEventIds={currentUserMyEventIds} createdByNameMap={createdByNameMap} showCreatedBy={showCreatedBy} />
  } else {
    userContent = <UserHomePage currentUser={currentUser} selectedVillage={selectedVillage} onVillageChange={handleVillageChange} search={search} onSearchChange={handleSearchChange} onClearSearch={handleClearSearch} formData={formData} onFormChange={handleFormChange} onSubmitEvent={handleSubmitEvent} onCancelEdit={resetForm} errorMessage={errorMessage} successMessage={successMessage} editingEventId={editingEventId} canAddEvent={userCanAddInSelectedVillage} upcomingEvents={splitVisibleEvents.upcoming} pastEvents={splitVisibleEvents.past} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} onApproveEvent={handleApproveEvent} onRejectEvent={handleRejectEvent} onToggleMyEvent={handleToggleMyEvent} myEventIds={currentUserMyEventIds} createdByNameMap={createdByNameMap} showCreatedBy={showCreatedBy} />
  }

  return <UserLayout currentUser={currentUser} onLogout={handleLogout} currentPage={currentPage} onChangePage={setCurrentPage}>{userContent}</UserLayout>
}

export default App
