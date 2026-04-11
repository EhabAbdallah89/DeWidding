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
    (event.hall || '').toLowerCase().includes(search)
  )
}

export function sortEvents(eventsList, direction = 'asc') {
  const sorted = [...eventsList].sort((a, b) => new Date(a.date) - new Date(b.date))
  return direction === 'desc' ? sorted.reverse() : sorted
}

export function splitUpcomingAndPast(eventsList) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const upcoming = []
  const past = []

  for (const event of eventsList) {
    const eventDate = new Date(event.date)
    eventDate.setHours(0, 0, 0, 0)
    if (eventDate >= today) upcoming.push(event)
    else past.push(event)
  }

  return {
    upcoming: sortEvents(upcoming, 'asc'),
    past: sortEvents(past, 'desc'),
  }
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
