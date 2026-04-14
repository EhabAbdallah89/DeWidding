import { useAuthFlowState } from './auth-flow/useAuthFlowState'
import { useAuthFlowActions } from './auth-flow/useAuthFlowActions'

// هذا المسار مسؤول فقط عن شاشة الدخول والتسجيل.
// تم تقسيمه إلى: حالات منفصلة + عمليات منفصلة + ناتج نهائي خفيف.
export function useAuthFlow(store) {
  // ==============================
  // الحالات الأساسية (useState)
  // ==============================
  const state = useAuthFlowState()

  // ==============================
  // المعالجات / Handlers
  // ==============================
  const actions = useAuthFlowActions(store, state)

  return {
    mode: state.mode,
    emailForm: state.emailForm,
    phoneForm: state.phoneForm,
    message: state.message,
    setEmailForm: (patch) => state.setEmailForm((prev) => ({ ...prev, ...patch })),
    setPhoneForm: (patch) => state.setPhoneForm((prev) => ({ ...prev, ...patch })),
    ...actions,
  }
}
