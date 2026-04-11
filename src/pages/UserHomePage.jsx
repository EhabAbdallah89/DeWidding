import VillageSelector from '../components/VillageSelector'
import SearchBox from '../components/SearchBox'
import AddEventForm from '../components/AddEventForm'
import EventTable from '../components/EventTable'
import { splitUpcomingAndPast } from '../utils/eventUtils'

function UserHomePage({ currentUser, selectedVillage, onVillageChange, search, onSearchChange, onClearSearch, formData, onFormChange, onSubmitEvent, onCancelEdit, errorMessage, successMessage, editingEventId, canAddEvent, events, usersById, onEditEvent, onDeleteEvent, onApproveEvent, onRejectEvent, onToggleSaveEvent, savedEventIds }) {
  const { upcoming, past } = splitUpcomingAndPast(events)

  return (
    <>
      <div className="card"><h2 className="card-title">الواجهة الرئيسية</h2><p className="card-subtitle">القرية الافتراضية لك: <strong>{currentUser.village}</strong></p></div>
      <VillageSelector selectedVillage={selectedVillage} onVillageChange={onVillageChange} />
      {selectedVillage && <SearchBox search={search} onSearchChange={onSearchChange} onClearSearch={onClearSearch} />}
      {selectedVillage && <AddEventForm formData={formData} onFormChange={onFormChange} onSubmit={onSubmitEvent} onCancelEdit={onCancelEdit} errorMessage={errorMessage} successMessage={successMessage} editingEventId={editingEventId} canAddEvent={canAddEvent} />}

      <div className="card">
        <h3 className="section-title">أعراس القرية القادمة</h3>
        <p className="card-subtitle">من تاريخ اليوم وما بعده — مرتبة من الأقرب إلى الأبعد</p>
        <EventTable events={upcoming} currentUser={currentUser} usersById={usersById} onEditEvent={onEditEvent} onDeleteEvent={onDeleteEvent} onApproveEvent={onApproveEvent} onRejectEvent={onRejectEvent} onToggleSaveEvent={onToggleSaveEvent} savedEventIds={savedEventIds} />
      </div>

      <div className="card">
        <h3 className="section-title">أعراس القرية السابقة</h3>
        <p className="card-subtitle">الأحداث الماضية — مرتبة من الأحدث إلى الأقدم</p>
        <EventTable events={past} currentUser={currentUser} usersById={usersById} onEditEvent={onEditEvent} onDeleteEvent={onDeleteEvent} onApproveEvent={onApproveEvent} onRejectEvent={onRejectEvent} onToggleSaveEvent={onToggleSaveEvent} savedEventIds={savedEventIds} isPast />
      </div>
    </>
  )
}
export default UserHomePage
