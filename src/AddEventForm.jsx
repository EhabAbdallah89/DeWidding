function AddEventForm({
    formData,
    onFormChange,
    onAddEvent,
    errorMessage,
    successMessage
}) {
    return (
        <div>
            <h3>إضافة عرس جديد</h3>

            <div className="form-row">
                <input
                    type="text"
                    name="groom"
                    placeholder="العريس"
                    value={formData.groom}
                    onChange={onFormChange}
                />

                <input
                    type="text"
                    name="bride"
                    placeholder="العروس"
                    value={formData.bride}
                    onChange={onFormChange}
                />

                <input
                    type="text"
                    name="hall"
                    placeholder="القاعة"
                    value={formData.hall}
                    onChange={onFormChange}
                />

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={onFormChange}
                />

                <button onClick={onAddEvent}>
                    إضافة
                </button>
            </div>

            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
        </div>
    )
}

export default AddEventForm