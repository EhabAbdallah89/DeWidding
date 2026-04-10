function ShowEvent({ selectedVillage, events, sortedEvents, onDeleteEvent }) {
    if (!selectedVillage) {
        return <p>يرجى اختيار قرية لعرض الأعراس</p>
    }

    if (!events[selectedVillage]) {
        return <p>حاليا لا توجد قائمة أعراس لهذه القرية</p>
    }

    if (sortedEvents.length === 0) {
        return <p>لا توجد نتائج مطابقة للبحث</p>
    }

    return (
        <div>
            <p>إخترت: {selectedVillage}</p>

            <h2>أعراس قرية {selectedVillage}</h2>
            <p>عدد الأعراس: {sortedEvents.length}</p>

            <table border="1">
                <thead>
                    <tr>
                        <th>التاريخ</th>
                        <th>القاعة</th>
                        <th>العريس</th>
                        <th>العروس</th>
                        <th>إجراء</th>
                    </tr>
                </thead>

                <tbody>
                    {sortedEvents.map((event) => (
                        <tr key={event.id}>
                            <td>{new Date(event.date).toLocaleDateString('en-GB')}</td>
                            <td>{event.hall}</td>
                            <td>{event.groom}</td>
                            <td>{event.bride}</td>
                            <td>
                                <button onClick={() => onDeleteEvent(event.id)}>
                                    حذف
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ShowEvent