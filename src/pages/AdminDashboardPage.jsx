import StatCards from '../components/StatCards'
import VillageSelector from '../components/VillageSelector'
import SearchBox from '../components/SearchBox'
import AddEventForm from '../components/AddEventForm'
import EventTable from '../components/EventTable'
import { splitUpcomingAndPast } from '../utils/eventUtils'

function AdminDashboardPage({ selectedVillage, onVillageChange, search, onSearchChange, onClearSearch, formData, onFormChange, onSubmitEvent, onCancelEdit, errorMessage, successMessage, editingEventId, canAddEvent, dashboardCounts, events, pendingEvents, currentUser, usersById, onEditEvent, onDeleteEvent, onApproveEvent, onRejectEvent, onToggleSaveEvent, savedEventIds, currentPage }) {
  const tableEvents = currentPage === 'pending' ? pendingEvents : events
  const { upcoming, past } = splitUpcomingAndPast(tableEvents)

  return (
    <>
      <StatCards total={dashboardCounts.total} approved={dashboardCounts.approved} pending={dashboardCounts.pending} rejected={dashboardCounts.rejected} />
      <VillageSelector selectedVillage={selectedVillage} onVillageChange={onVillageChange} />
      {selectedVillage && <SearchBox search={search} onSearchChange={onSearchChange} onClearSearch={onClearSearch} />}
      {selectedVillage && <AddEventForm formData={formData} onFormChange={onFormChange} onSubmit={onSubmitEvent} onCancelEdit={onCancelEdit} errorMessage={errorMessage} successMessage={successMessage} editingEventId={editingEventId} canAddEvent={canAddEvent} />}

      <div className="card">
        <h3 className="section-title">{currentPage === 'pending' ? 'الأعراس بانتظار الموافقة - القادمة' : 'إدارة الأحداث القادمة'}</h3>
        <p className="card-subtitle">من تاريخ اليوم وما بعده — مرتبة من الأقرب إلى الأبعد</p>
        <EventTable events={upcoming} currentUser={currentUser} usersById={usersById} onEditEvent={onEditEvent} onDeleteEvent={onDeleteEvent} onApproveEvent={onApproveEvent} onRejectEvent={onRejectEvent} onToggleSaveEvent={onToggleSaveEvent} savedEventIds={savedEventIds} showCreatedBy={currentUser?.role === 'admin'} />
      </div>

      <div className="card">
        <h3 className="section-title">{currentPage === 'pending' ? 'الأعراس بانتظار الموافقة - السابقة' : 'إدارة الأحداث السابقة'}</h3>
        <p className="card-subtitle">الأحداث الماضية — مرتبة من الأحدث إلى الأقدم</p>
        <EventTable events={past} currentUser={currentUser} usersById={usersById} onEditEvent={onEditEvent} onDeleteEvent={onDeleteEvent} onApproveEvent={onApproveEvent} onRejectEvent={onRejectEvent} onToggleSaveEvent={onToggleSaveEvent} savedEventIds={savedEventIds} showCreatedBy={currentUser?.role === 'admin'} isPast />
      </div>
    </>
  )
}
export default AdminDashboardPage
