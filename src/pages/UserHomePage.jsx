import VillageSelector from '../components/VillageSelector'
import SearchBox from '../components/SearchBox'
import AddEventForm from '../components/AddEventForm'
import EventTable from '../components/EventTable'
function UserHomePage({ currentUser, selectedVillage, onVillageChange, visibleEvents, search, onSearchChange, onClearSearch, formData, onFormChange, onSubmitEvent, onCancelEdit, errorMessage, successMessage, editingEventId, canAddEvent, events, onEditEvent, onDeleteEvent, onApproveEvent, onRejectEvent }) {
  return (
    <>
      <div className="card"><h2 className="card-title">الواجهة الرئيسية للمستخدم</h2><p className="card-subtitle">القرية الافتراضية لك: <strong>{currentUser.village}</strong></p></div>
      <VillageSelector selectedVillage={selectedVillage} onVillageChange={onVillageChange} />
      {selectedVillage && visibleEvents.length>0 && <SearchBox search={search} onSearchChange={onSearchChange} onClearSearch={onClearSearch} />}
      {selectedVillage && <AddEventForm formData={formData} onFormChange={onFormChange} onSubmit={onSubmitEvent} onCancelEdit={onCancelEdit} errorMessage={errorMessage} successMessage={successMessage} editingEventId={editingEventId} canAddEvent={canAddEvent} />}
      <div className="card"><h3 className="section-title">أعراس القرية</h3><EventTable events={events} currentUser={currentUser} onEditEvent={onEditEvent} onDeleteEvent={onDeleteEvent} onApproveEvent={onApproveEvent} onRejectEvent={onRejectEvent} /></div>
    </>
  )
}
export default UserHomePage
