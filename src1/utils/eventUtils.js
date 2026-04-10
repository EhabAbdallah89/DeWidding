export function normalizeText(value) {
  return value.trim()
}

export function validateEventForm(formData, selectedVillage) {
  const groom = normalizeText(formData.groom)
  const bride = normalizeText(formData.bride)
  const hall = normalizeText(formData.hall)
  const date = formData.date

  if (!selectedVillage) {
    return 'يرجى اختيار قرية'
  }

  if (!groom || !bride || !hall || !date) {
    return 'يرجى تعبئة جميع الحقول'
  }

  return ''
}

export function filterEvents(eventsList, searchText) {
  const search = searchText.trim().toLowerCase()

  if (!search) {
    return eventsList
  }

  return eventsList.filter((event) =>
    event.groom.toLowerCase().includes(search) ||
    event.bride.toLowerCase().includes(search)
  )
}

export function sortEvents(eventsList) {
  return [...eventsList].sort((a, b) => new Date(a.date) - new Date(b.date))
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
