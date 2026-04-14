// هذا الشريط يعرض رسالة واحدة فقط: خطأ أو نجاح.
function NoticeBar({ notice }) {
  if (!notice.error && !notice.success) return null

  return (
    <div className={notice.error ? 'notice error' : 'notice success'}>
      {notice.error || notice.success}
    </div>
  )
}

export default NoticeBar
