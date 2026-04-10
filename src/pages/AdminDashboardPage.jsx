import StatCards from '../components/StatCards'
import VillageSelector from '../components/VillageSelector'
import SearchBox from '../components/SearchBox'
import AddEventForm from '../components/AddEventForm'
import EventTable from '../components/EventTable'

function AdminDashboardPage({
  selectedVillage,
  onVillageChange,
  search,
  onSearchChange,
  onClearSearch,
  formData,
  onFormChange,
  onSubmitEvent,
  onCancelEdit,
  errorMessage,
  successMessage,
  editingEventId,
  canAddEvent,
  upcomingEvents,
  pastEvents,
  pendingEvents,
  currentUser,
  onEditEvent,
  onDeleteEvent,
  onApproveEvent,
  onRejectEvent,
  currentPage,
  stats,
}) {
  if (currentPage === 'pending') {
    return (
      <>
        <StatCards total={stats.total} approved={stats.approved} pending={stats.pending} rejected={stats.rejected} />
        <VillageSelector selectedVillage={selectedVillage} onVillageChange={onVillageChange} />
        <SearchBox search={search} onSearchChange={onSearchChange} onClearSearch={onClearSearch} />
        <AddEventForm formData={formData} onFormChange={onFormChange} onSubmit={onSubmitEvent} onCancelEdit={onCancelEdit} errorMessage={errorMessage} successMessage={successMessage} editingEventId={editingEventId} canAddEvent={canAddEvent} />
        <div className="card"><h3 className="section-title">الأعراس بانتظار الموافقة</h3><EventTable events={pendingEvents} currentUser={currentUser} onEditEvent={onEditEvent} onDeleteEvent={onDeleteEvent} onApproveEvent={onApproveEvent} onRejectEvent={onRejectEvent} /></div>
      </>
    )
  }

  return (
    <>
      <StatCards total={stats.total} approved={stats.approved} pending={stats.pending} rejected={stats.rejected} />
      <VillageSelector selectedVillage={selectedVillage} onVillageChange={onVillageChange} />
      <SearchBox search={search} onSearchChange={onSearchChange} onClearSearch={onClearSearch} />
      <AddEventForm formData={formData} onFormChange={onFormChange} onSubmit={onSubmitEvent} onCancelEdit={onCancelEdit} errorMessage={errorMessage} successMessage={successMessage} editingEventId={editingEventId} canAddEvent={canAddEvent} />
      <div className="card"><h3 className="section-title">الأحداث القادمة</h3><EventTable events={upcomingEvents} currentUser={currentUser} onEditEvent={onEditEvent} onDeleteEvent={onDeleteEvent} onApproveEvent={onApproveEvent} onRejectEvent={onRejectEvent} /></div>
      <div className="card"><h3 className="section-title">الأحداث السابقة</h3><EventTable events={pastEvents} currentUser={currentUser} onEditEvent={onEditEvent} onDeleteEvent={onDeleteEvent} onApproveEvent={onApproveEvent} onRejectEvent={onRejectEvent} /></div>
    </>
  )
}

export default AdminDashboardPage
