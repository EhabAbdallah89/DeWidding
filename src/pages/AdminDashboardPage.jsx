import StatCards from '../components/StatCards'
import VillageSelector from '../components/VillageSelector'
import SearchBox from '../components/SearchBox'
import AddEventForm from '../components/AddEventForm'
import EventsSplitView from '../components/EventsSplitView'

function AdminDashboardPage({ selectedVillage, onVillageChange, search, onSearchChange, onClearSearch, formData, onFormChange, onSubmitEvent, onCancelEdit, errorMessage, successMessage, editingEventId, canAddEvent, upcomingEvents, pastEvents, allVisibleEvents, pendingEvents, currentUser, onEditEvent, onDeleteEvent, onApproveEvent, onRejectEvent, currentPage, onToggleMyEvent, myEventIds, createdByNameMap, showCreatedBy }) {
  const approvedCount = allVisibleEvents.filter((item)=>item.status==='approved').length
  const pendingCount = allVisibleEvents.filter((item)=>item.status==='pending').length
  const rejectedCount = allVisibleEvents.filter((item)=>item.status==='rejected').length
  const pendingUpcoming = pendingEvents.upcoming || []
  const pendingPast = pendingEvents.past || []

  return (
    <>
      <StatCards total={allVisibleEvents.length} approved={approvedCount} pending={pendingCount} rejected={rejectedCount} />
      <VillageSelector selectedVillage={selectedVillage} onVillageChange={onVillageChange} />
      <SearchBox search={search} onSearchChange={onSearchChange} onClearSearch={onClearSearch} />
      <AddEventForm formData={formData} onFormChange={onFormChange} onSubmit={onSubmitEvent} onCancelEdit={onCancelEdit} errorMessage={errorMessage} successMessage={successMessage} editingEventId={editingEventId} canAddEvent={canAddEvent} />
      <EventsSplitView title={currentPage==='pending' ? 'الأعراس بانتظار الموافقة' : 'إدارة الأحداث'} upcomingEvents={currentPage==='pending' ? pendingUpcoming : upcomingEvents} pastEvents={currentPage==='pending' ? pendingPast : pastEvents} currentUser={currentUser} onEditEvent={onEditEvent} onDeleteEvent={onDeleteEvent} onApproveEvent={onApproveEvent} onRejectEvent={onRejectEvent} onToggleMyEvent={onToggleMyEvent} myEventIds={myEventIds} createdByNameMap={createdByNameMap} showCreatedBy={showCreatedBy} />
    </>
  )
}

export default AdminDashboardPage
