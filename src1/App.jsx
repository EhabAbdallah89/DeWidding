import { useState } from 'react'
import './App.css'
import { villages, events as initialEvents } from './data'
import ShowEvent from './ShowEvent'
import AddEventForm from './AddEventForm'
import VillageSelector from './VillageSelector'
import SearchBox from './SearchBox'

function App() {
    // ---------------- STATE ----------------

    const [selectedVillage, setSelectedVillage] = useState(
        localStorage.getItem('village') || ''
    )

    const [search, setSearch] = useState(
        localStorage.getItem('search') || ''
    )

    const [eventsData, setEventsData] = useState(() => {
        const savedEvents = localStorage.getItem('eventsData')
        return savedEvents ? JSON.parse(savedEvents) : initialEvents
    })

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const canAddEvent = true

    const [formData, setFormData] = useState({
        groom: '',
        bride: '',
        hall: '',
        date: ''
    })

    // ---------------- HANDLERS ----------------

    function handleVillageChange(e) {
        const value = e.target.value
        setSelectedVillage(value)
        localStorage.setItem('village', value)

        setSearch('')
        localStorage.setItem('search', '')

        setSuccessMessage('')
        setErrorMessage('')
    }

    function handleSearchChange(e) {
        const value = e.target.value
        setSearch(value)
        localStorage.setItem('search', value)
        setSuccessMessage('')
    }

    function handleFormChange(e) {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        setSuccessMessage('')
    }

    function clearSearch() {
        setSearch('')
        localStorage.setItem('search', '')
    }

    function handleAddEvent() {
        setErrorMessage('')
        setSuccessMessage('')

        const { groom, bride, hall, date } = formData

        if (!groom.trim || !bride.trim || !hall.trim || !date) {
            setErrorMessage('يرجى تعبئة جميع الحقول')
            return
        }

        if (!selectedVillage) {
            setErrorMessage('يرجى اختيار قرية')
            return
        }

        const newEvent = {
            id: Date.now(),
            groom,
            bride,
            hall,
            date
        }

        const updatedEvents = {
            ...eventsData,
            [selectedVillage]: [
                ...(eventsData[selectedVillage] || []),
                newEvent
            ]
        }

        setEventsData(updatedEvents)
        localStorage.setItem('eventsData', JSON.stringify(updatedEvents))

        setFormData({
            groom: '',
            bride: '',
            hall: '',
            date: ''
        })

        setSuccessMessage('تمت إضافة العرس بنجاح')
    }

    function handleDeleteEvent(eventId) {
        const confirmDelete = window.confirm('هل أنت متأكد من حذف هذا العرس؟')

        if (!confirmDelete) return

        if (!selectedVillage || !eventsData[selectedVillage]) return

        const updatedVillageEvents = eventsData[selectedVillage].filter(
            (event) => event.id !== eventId
        )

        const updatedEvents = {
            ...eventsData,
            [selectedVillage]: updatedVillageEvents
        }

        setEventsData(updatedEvents)
        localStorage.setItem('eventsData', JSON.stringify(updatedEvents))

        setSuccessMessage('تم حذف العرس بنجاح')
        setErrorMessage('')
    }

    // ---------------- LOGIC ----------------

    function filterEvents(eventsList) {
        return eventsList.filter((event) =>
            event.groom.includes(search) ||
            event.bride.includes(search)
        )
    }

    function sortEvents(eventsList) {
        return [...eventsList].sort((a, b) => new Date(a.date) - new Date(b.date))
    }

    const filteredEvents = eventsData[selectedVillage]
        ? filterEvents(eventsData[selectedVillage])
        : []

    const sortedEvents = sortEvents(filteredEvents)

    // ---------------- MAIN UI ----------------

    return (
        <div className="app-container">
            <h1>DEWEDDING</h1>
            <p>اختر القريه التي تريد رؤية اعراسها</p>

            <VillageSelector
                villages={villages}
                selectedVillage={selectedVillage}
                onVillageChange={handleVillageChange}
            />

            {selectedVillage && eventsData[selectedVillage] && (
                <SearchBox
                    search={search}
                    onSearchChange={handleSearchChange}
                    onClearSearch={clearSearch}
                />
            )}

            {selectedVillage && canAddEvent && (
                <AddEventForm
                    formData={formData}
                    onFormChange={handleFormChange}
                    onAddEvent={handleAddEvent}
                    errorMessage={errorMessage}
                    successMessage={successMessage}
                />
            )}

            <ShowEvent
                selectedVillage={selectedVillage}
                events={eventsData}
                sortedEvents={sortedEvents}
                onDeleteEvent={handleDeleteEvent}
            />
        </div>
    )
}

export default App