import StatCards from '../components/StatCards'
import VillageSelector from '../components/VillageSelector'
import SearchBox from '../components/SearchBox'
import AddEventForm from '../components/AddEventForm'
import EventTable from '../components/EventTable'
function AdminDashboardPage({ selectedVillage, onVillageChange, search, onSearchChange, onClearSearch, formData, onFormChange, onSubmitEvent, onCancelEdit, errorMessage, successMessage, editingEventId, canAddEvent, events, allVisibleEvents, pendingEvents, currentUser, onEditEvent, onDeleteEvent, onApproveEvent, onRejectEvent, currentPage }) {
  const approvedCount = allVisibleEvents.filter((item)=>item.status==='approved').length
  const pendingCount = allVisibleEvents.filter((item)=>item.status==='pending').length
  const rejectedCount = allVisibleEvents.filter((item)=>item.status==='rejected').length
  const tableEvents = currentPage==='pending' ? pendingEvents : events
  return (
    <>
      <StatCards total={allVisibleEvents.length} approved={approvedCount} pending={pendingCount} rejected={rejectedCount} />
      <VillageSelector selectedVillage={selectedVillage} onVillageChange={onVillageChange} />
      <SearchBox search={search} onSearchChange={onSearchChange} onClearSearch={onClearSearch} />
      <AddEventForm formData={formData} onFormChange={onFormChange} onSubmit={onSubmitEvent} onCancelEdit={onCancelEdit} errorMessage={errorMessage} successMessage={successMessage} editingEventId={editingEventId} canAddEvent={canAddEvent} />
      <div className="card"><h3 className="section-title">{currentPage==='pending' ? 'الأعراس بانتظار الموافقة' : 'إدارة الأحداث'}</h3><EventTable events={tableEvents} currentUser={currentUser} onEditEvent={onEditEvent} onDeleteEvent={onDeleteEvent} onApproveEvent={onApproveEvent} onRejectEvent={onRejectEvent} /></div>
    </>
  )
}
export default AdminDashboardPage
