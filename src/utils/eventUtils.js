export function normalizeText(value) {
  return value.trim()
}

export function validateEventForm(formData, selectedVillage, user) {
  const groom = normalizeText(formData.groom)
  const bride = normalizeText(formData.bride)
  const hall = normalizeText(formData.hall)
  const date = formData.date

  if (!user) return 'يجب تسجيل الدخول أولاً'
  if (!selectedVillage) return 'يرجى اختيار قرية'
  if (!groom || !bride || !hall || !date) return 'يرجى تعبئة جميع الحقول'
  return ''
}

export function filterEvents(eventsList, searchText) {
  const search = searchText.trim().toLowerCase()
  if (!search) return eventsList

  return eventsList.filter((event) =>
    (event.groom || '').toLowerCase().includes(search) ||
    (event.bride || '').toLowerCase().includes(search) ||
    (event.title || '').toLowerCase().includes(search) ||
    (event.hall || '').toLowerCase().includes(search),
  )
}

export function sortEvents(eventsList) {
  return [...eventsList].sort((a, b) => new Date(a.date) - new Date(b.date))
}

export function splitEventsByDate(eventsList) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcoming = []
  const past = []

  eventsList.forEach((eventItem) => {
    const eventDate = new Date(eventItem.date)
    eventDate.setHours(0, 0, 0, 0)

    if (eventDate >= today) {
      upcoming.push(eventItem)
    } else {
      past.push(eventItem)
    }
  })

  return {
    upcoming: upcoming.sort((a, b) => new Date(a.date) - new Date(b.date)),
    past: past.sort((a, b) => new Date(b.date) - new Date(a.date)),
  }
}

export function isPastEvent(date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const eventDate = new Date(date)
  eventDate.setHours(0, 0, 0, 0)
  return eventDate < today
}

export function formatDisplayDate(date) {
  return new Date(date).toLocaleDateString('en-GB')
}

export function formatStatusLabel(status) {
  if (status === 'approved') return 'موافق عليه'
  if (status === 'pending') return 'بانتظار الموافقة'
  if (status === 'rejected') return 'مرفوض'
  return status
}

export function getRoleLabel(role) {
  if (role === 'admin') return 'ADMIN'
  if (role === 'supervisor') return 'SUPERVISOR'
  return 'USER'
}
