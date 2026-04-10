import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { loadEvents, saveEvents } from './services/eventService'
import { loadUsers, saveUsers, registerUser, loginWithPassword, loginWithOtp, updateUserProfile } from './services/userService'
import { loadValue, saveValue, STORAGE_KEYS } from './services/storageService'
import { Event } from './models/Event'
import { canAddEvent, canDeleteEvent, canEditEvent, canViewEvent, canApproveEvent, canRejectEvent, getNewEventStatus, isManagementUser } from './utils/permissions'
import { sortEvents, filterEvents, validateEventForm } from './utils/eventUtils'
import PublicLayout from './layouts/PublicLayout'
import UserLayout from './layouts/UserLayout'
import AdminLayout from './layouts/AdminLayout'
import PublicHomePage from './pages/PublicHomePage'
import UserHomePage from './pages/UserHomePage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import ProfilePage from './pages/ProfilePage'
import MyEventsPage from './pages/MyEventsPage'

function App() {
  const [usersData, setUsersData] = useState(loadUsers())
  const [currentUserId, setCurrentUserId] = useState(loadValue(STORAGE_KEYS.currentUserId, null))
  const currentUser = useMemo(() => usersData.find((user) => user.id === currentUserId) || null, [usersData, currentUserId])

  const [registerData, setRegisterData] = useState({ name:'', phone:'', password:'', village:'', profileImage:'' })
  const [loginData, setLoginData] = useState({ phone:'', password:'' })
  const [otpPhone, setOtpPhone] = useState('')

  const [registerError, setRegisterError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginSuccess, setLoginSuccess] = useState('')
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
  useEffect(() => { saveValue(STORAGE_KEYS.currentUserId, currentUserId) }, [currentUserId])
  useEffect(() => { saveValue(STORAGE_KEYS.selectedVillage, selectedVillage) }, [selectedVillage])
  useEffect(() => { saveValue(STORAGE_KEYS.searchText, search) }, [search])
  useEffect(() => { saveValue(STORAGE_KEYS.currentPage, currentPage) }, [currentPage])

useEffect(() => {
  if (!currentUser) {
    setProfileData({
      name: '',
      profileImage: ''
    })
    return
  }

  setProfileData({
    name: currentUser.name || '',
    profileImage: currentUser.profileImage || ''
  })
}, [currentUser])

useEffect(() => {
  if (!currentUser?.village) return

  setSelectedVillage(currentUser.village)
}, [currentUser])

  function resetForm() { setFormData({ groom:'', bride:'', hall:'', date:'' }); setEditingEventId(null) }
  function clearMessages() { setErrorMessage(''); setSuccessMessage('') }
  function clearAuthMessages() { setRegisterError(''); setRegisterSuccess(''); setLoginError(''); setLoginSuccess(''); setOtpError(''); setOtpSuccess('') }

  function handleRegisterChange(event) { const { name, value } = event.target; setRegisterData((prev)=>({ ...prev, [name]: value })) }
  function handleRegisterImageChange(event) {
    const file = event.target.files?.[0]; if(!file) return
    setRegisterData((prev)=>({ ...prev, profileImage: file.name }))
  }
  function handleRegisterSubmit() {
    setRegisterError(''); setRegisterSuccess('')
    if(!registerData.name.trim() || !registerData.phone.trim() || !registerData.password.trim() || !registerData.village){ setRegisterError('يرجى تعبئة جميع حقول التسجيل المطلوبة'); return }
    if(!/^05\d{8}$/.test(registerData.phone)){ setRegisterError('رقم الهاتف غير صحيح'); return }
    if(registerData.password.length < 6){ setRegisterError('كلمة المرور ضعيفة (6 أحرف على الأقل)'); return }
    const result = registerUser(usersData, registerData)
    if(!result.success){ setRegisterError(result.message); return }
    setUsersData(result.users)
    setRegisterSuccess('تم إنشاء الحساب بنجاح — يمكنك تسجيل الدخول الآن')
    setRegisterData({ name:'', phone:'', password:'', village:'', profileImage:'' })
  }

  function handleLoginChange(event) { const { name, value } = event.target; setLoginData((prev)=>({ ...prev, [name]: value })) }
  function handleLoginSubmit() {
    setLoginError(''); setLoginSuccess('')
    const result = loginWithPassword(usersData, loginData.phone, loginData.password)
    if(!result.success){ setLoginError(result.message); return }
    setCurrentUserId(result.user.id)
    setLoginSuccess('تم تسجيل الدخول بنجاح')
    setLoginData({ phone:'', password:'' })
  }

  function handleOtpSubmit() {
    setOtpError(''); setOtpSuccess('')
    const result = loginWithOtp(usersData, otpPhone)
    if(!result.success){ setOtpError(result.message); return }
    setCurrentUserId(result.user.id)
    setOtpSuccess(result.message)
    setOtpPhone('')
  }

  function handleProfileChange(event) { const { name, value } = event.target; setProfileData((prev)=>({ ...prev, [name]: value })) }

  
  function handleProfileImageChange(event) {
  const file = event.target.files?.[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    setProfileData((prev) => ({
      ...prev,
      profileImage: reader.result
    }))
  }

  reader.readAsDataURL(file)
}

  function handleProfileSave() {
    if(!currentUser) return
    const updatedUsers = updateUserProfile(usersData, currentUser.id, profileData)
    setUsersData(updatedUsers)
    setSuccessMessage('تم حفظ بيانات الملف الشخصي')
    setErrorMessage('')
  }
  function handleLogout() {
    setCurrentUserId(null)
    setSelectedVillage('')
    setProfileData({name: '',profileImage: ''})
    setSearch('')
    setCurrentPage('dashboard')
    resetForm()
    clearMessages()
    clearAuthMessages()
  }

  function handleVillageChange(event) { const value = event.target.value; setSelectedVillage(value); setSearch(''); clearMessages(); resetForm() }
  function handleSearchChange(event) { setSearch(event.target.value); setSuccessMessage('') }
  function handleClearSearch() { setSearch('') }
  function handleFormChange(event) { const { name, value } = event.target; setFormData((prev)=>({ ...prev, [name]: value })); setSuccessMessage('') }

  function handleEditEvent(eventItem) {
    if(!canEditEvent(currentUser, eventItem)){ setErrorMessage('ليس لديك صلاحية تعديل هذا الحدث'); setSuccessMessage(''); return }
    setFormData({ groom:eventItem.groom, bride:eventItem.bride, hall:eventItem.hall, date:eventItem.date })
    setEditingEventId(eventItem.id)
    setErrorMessage(''); setSuccessMessage('')
  }

  function handleDeleteEvent(eventId) {
    const targetEvent = eventsData.find((item)=>item.id===eventId); if(!targetEvent) return
    if(!canDeleteEvent(currentUser, targetEvent)){ setErrorMessage('ليس لديك صلاحية حذف هذا الحدث'); setSuccessMessage(''); return }
    const confirmDelete = window.confirm('هل أنت متأكد من حذف هذا الحدث؟'); if(!confirmDelete) return
    const updatedEvents = eventsData.filter((item)=>item.id!==eventId)
    setEventsData(updatedEvents)
    const updatedUsers = usersData.map((user)=>({ ...user, myEvents: user.myEvents.filter((id)=>id!==eventId) }))
    setUsersData(updatedUsers)
    setSuccessMessage('تم حذف الحدث بنجاح'); setErrorMessage('')
    if(editingEventId===eventId) resetForm()
  }

  function handleApproveEvent(eventId) {
    const targetEvent = eventsData.find((item)=>item.id===eventId); if(!targetEvent) return
    if(!canApproveEvent(currentUser, targetEvent)){ setErrorMessage('ليس لديك صلاحية الموافقة على هذا الحدث'); setSuccessMessage(''); return }
    const updatedEvents = eventsData.map((item)=>item.id===eventId ? { ...item, status:'approved' } : item)
    setEventsData(updatedEvents); setSuccessMessage('تمت الموافقة على الحدث'); setErrorMessage('')
  }

  function handleRejectEvent(eventId) {
    const targetEvent = eventsData.find((item)=>item.id===eventId); if(!targetEvent) return
    if(!canRejectEvent(currentUser, targetEvent)){ setErrorMessage('ليس لديك صلاحية رفض هذا الحدث'); setSuccessMessage(''); return }
    const updatedEvents = eventsData.map((item)=>item.id===eventId ? { ...item, status:'rejected' } : item)
    setEventsData(updatedEvents); setSuccessMessage('تم رفض الحدث'); setErrorMessage('')
  }

  function handleSubmitEvent() {
    clearMessages()
    if(!canAddEvent(currentUser, selectedVillage)){ setErrorMessage('ليس لديك صلاحية إضافة حدث في هذه القرية'); return }
    const validationMessage = validateEventForm(formData, selectedVillage, currentUser)
    if(validationMessage){ setErrorMessage(validationMessage); return }
    const payload = { type:'wedding', groom:formData.groom.trim(), bride:formData.bride.trim(), hall:formData.hall.trim(), date:formData.date, village:selectedVillage, title:`${formData.groom.trim()} / ${formData.bride.trim()}` }
    if(editingEventId){
      const originalEvent = eventsData.find((item)=>item.id===editingEventId)
      if(!originalEvent){ setErrorMessage('لم يتم العثور على الحدث المطلوب تعديله'); return }
      if(!canEditEvent(currentUser, originalEvent)){ setErrorMessage('ليس لديك صلاحية تعديل هذا الحدث'); return }
      const updatedEvents = eventsData.map((item)=>item.id===editingEventId ? { ...item, ...payload } : item)
      setEventsData(updatedEvents); setSuccessMessage('تم تحديث الحدث بنجاح'); resetForm(); return
    }
    const status = getNewEventStatus(currentUser, selectedVillage)
    const newEvent = Event.create({ ...payload, createdByUserId: currentUser.id, status }).toJSON()
    setEventsData((prev)=>[...prev, newEvent])
    const updatedUsers = usersData.map((user)=>user.id===currentUser.id ? { ...user, myEvents:[...user.myEvents, newEvent.id] } : user)
    setUsersData(updatedUsers)
    setSuccessMessage(status==='pending' ? 'تم إرسال الحدث بانتظار الموافقة' : 'تمت إضافة الحدث بنجاح')
    resetForm()
  }

  const allVisibleEvents = useMemo(() => {
    if(!selectedVillage) return []
    return eventsData.filter((eventItem)=>eventItem.village===selectedVillage && canViewEvent(currentUser, eventItem))
  }, [eventsData, selectedVillage, currentUser])

  const filteredEvents = useMemo(()=>filterEvents(allVisibleEvents, search), [allVisibleEvents, search])
  const sortedEvents = useMemo(()=>sortEvents(filteredEvents), [filteredEvents])
  //const pendingEvents = useMemo(()=>sortedEvents.filter((item)=>item.status==='pending'), [sortedEvents])
  const pendingEvents = useMemo(() => {
  if (!currentUser) return []

  const pendingSource = isManagementUser(currentUser)
    ? eventsData.filter(
        (eventItem) =>
          eventItem.status === 'pending' && canViewEvent(currentUser, eventItem)
      )
    : eventsData.filter(
        (eventItem) =>
          eventItem.status === 'pending' &&
          eventItem.village === selectedVillage &&
          canViewEvent(currentUser, eventItem)
      )

  return sortEvents(filterEvents(pendingSource, search))
}, [eventsData, currentUser, selectedVillage, search])

  const myEvents = useMemo(() => {
    if(!currentUser) return []
    return sortEvents(eventsData.filter((eventItem)=>eventItem.createdByUserId===currentUser.id))
  }, [eventsData, currentUser])

  const userCanAddInSelectedVillage = canAddEvent(currentUser, selectedVillage)

  if(!currentUser){
    return (
      <PublicLayout>
        <PublicHomePage
          registerData={registerData}
          onRegisterChange={handleRegisterChange}
          onRegisterImageChange={handleRegisterImageChange}
          onRegisterSubmit={handleRegisterSubmit}
          registerError={registerError}
          registerSuccess={registerSuccess}
          loginData={loginData}
          onLoginChange={handleLoginChange}
          onLoginSubmit={handleLoginSubmit}
          loginError={loginError}
          loginSuccess={loginSuccess}
          otpPhone={otpPhone}
          onOtpPhoneChange={(e)=>setOtpPhone(e.target.value)}
          onOtpSubmit={handleOtpSubmit}
          otpError={otpError}
          otpSuccess={otpSuccess}
        />
      </PublicLayout>
    )
  }

  if(isManagementUser(currentUser)){
    let adminContent = null
    if(currentPage==='profile'){
      adminContent = <ProfilePage currentUser={currentUser} profileData={profileData} onProfileChange={handleProfileChange} onProfileImageChange={handleProfileImageChange} onProfileSave={handleProfileSave} />
    } else if(currentPage==='my-events'){
      adminContent = <MyEventsPage currentUser={currentUser} myEvents={myEvents} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} onApproveEvent={handleApproveEvent} onRejectEvent={handleRejectEvent} />
    } else {
      adminContent = <AdminDashboardPage selectedVillage={selectedVillage} onVillageChange={handleVillageChange} search={search} onSearchChange={handleSearchChange} onClearSearch={handleClearSearch} formData={formData} onFormChange={handleFormChange} onSubmitEvent={handleSubmitEvent} onCancelEdit={resetForm} errorMessage={errorMessage} successMessage={successMessage} editingEventId={editingEventId} canAddEvent={userCanAddInSelectedVillage} events={currentPage==='pending' ? pendingEvents : sortedEvents} allVisibleEvents={allVisibleEvents} pendingEvents={pendingEvents} currentUser={currentUser} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} onApproveEvent={handleApproveEvent} onRejectEvent={handleRejectEvent} currentPage={currentPage} />
    }
    return <AdminLayout currentUser={currentUser} currentPage={currentPage} onChangePage={setCurrentPage} onLogout={handleLogout}>{adminContent}</AdminLayout>
  }

  let userContent = null
  if(currentPage==='profile'){
    userContent = <ProfilePage currentUser={currentUser} profileData={profileData} onProfileChange={handleProfileChange} onProfileImageChange={handleProfileImageChange} onProfileSave={handleProfileSave} />
  } else if(currentPage==='my-events'){
    userContent = <MyEventsPage currentUser={currentUser} myEvents={myEvents} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} onApproveEvent={handleApproveEvent} onRejectEvent={handleRejectEvent} />
  } else {
    userContent = <UserHomePage currentUser={currentUser} selectedVillage={selectedVillage} onVillageChange={handleVillageChange} visibleEvents={allVisibleEvents} search={search} onSearchChange={handleSearchChange} onClearSearch={handleClearSearch} formData={formData} onFormChange={handleFormChange} onSubmitEvent={handleSubmitEvent} onCancelEdit={resetForm} errorMessage={errorMessage} successMessage={successMessage} editingEventId={editingEventId} canAddEvent={userCanAddInSelectedVillage} events={sortedEvents} onEditEvent={handleEditEvent} onDeleteEvent={handleDeleteEvent} onApproveEvent={handleApproveEvent} onRejectEvent={handleRejectEvent} />
  }

  return (
    <UserLayout currentUser={currentUser} onLogout={handleLogout}>
      <div className="card">
        <div className="button-row">
          <button className={currentPage==='dashboard' ? 'primary-btn' : 'ghost-btn'} onClick={()=>setCurrentPage('dashboard')}>الرئيسية</button>
          <button className={currentPage==='my-events' ? 'primary-btn' : 'ghost-btn'} onClick={()=>setCurrentPage('my-events')}>أعراسي</button>
          <button className={currentPage==='profile' ? 'primary-btn' : 'ghost-btn'} onClick={()=>setCurrentPage('profile')}>الإعدادات</button>
        </div>
      </div>
      {userContent}
    </UserLayout>
  )
}
export default App
