import VillageSelector from '../components/VillageSelector'
import SearchBox from '../components/SearchBox'
import AddEventForm from '../components/AddEventForm'
import EventsSplitView from '../components/EventsSplitView'

function UserHomePage({ currentUser, selectedVillage, onVillageChange, search, onSearchChange, onClearSearch, formData, onFormChange, onSubmitEvent, onCancelEdit, errorMessage, successMessage, editingEventId, canAddEvent, upcomingEvents, pastEvents, onEditEvent, onDeleteEvent, onApproveEvent, onRejectEvent, onToggleMyEvent, myEventIds, createdByNameMap, showCreatedBy }) {
  return (
    <>
      <div className="card"><h2 className="card-title">الواجهة الرئيسية للمستخدم</h2><p className="card-subtitle">القرية الافتراضية لك: <strong>{currentUser.village}</strong></p></div>
      <VillageSelector selectedVillage={selectedVillage} onVillageChange={onVillageChange} />
      {selectedVillage && (upcomingEvents.length > 0 || pastEvents.length > 0) && <SearchBox search={search} onSearchChange={onSearchChange} onClearSearch={onClearSearch} />}
      {selectedVillage && <AddEventForm formData={formData} onFormChange={onFormChange} onSubmit={onSubmitEvent} onCancelEdit={onCancelEdit} errorMessage={errorMessage} successMessage={successMessage} editingEventId={editingEventId} canAddEvent={canAddEvent} />}
      <EventsSplitView title="أعراس القرية" upcomingEvents={upcomingEvents} pastEvents={pastEvents} currentUser={currentUser} onEditEvent={onEditEvent} onDeleteEvent={onDeleteEvent} onApproveEvent={onApproveEvent} onRejectEvent={onRejectEvent} onToggleMyEvent={onToggleMyEvent} myEventIds={myEventIds} createdByNameMap={createdByNameMap} showCreatedBy={showCreatedBy} />
    </>
  )
}

export default UserHomePage
