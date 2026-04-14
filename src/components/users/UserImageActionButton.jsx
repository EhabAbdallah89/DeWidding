// هذا الزر يحذف صورة المستخدم من لوحة الإدارة.
function UserImageActionButton({ onRemove }) {
  return <button className="ghost-btn" onClick={onRemove}>حذف الصورة</button>
}

export default UserImageActionButton
