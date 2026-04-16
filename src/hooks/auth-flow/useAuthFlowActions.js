import {
  createSocialUser,
  finishAuth,
  handleEmailContinuation,
  handlePhoneOtpSend,
  handlePhoneOtpVerification,
  handlePhoneUserCreation,
} from './authHelpers'
import { emailDraft, emptyAuthMessage, phoneDraft } from './authDrafts'

// هذه الدالة تجمع كل العمليات الخاصة بمسار التحقق.
export function useAuthFlowActions(store, state) {
  const clear = (nextMode = 'main') => {
    state.setMode(nextMode)
    state.setMessage(emptyAuthMessage)
  }

  const finish = (user) => {
    finishAuth(store, clear, state.setEmailForm, state.setPhoneForm, user, emailDraft, phoneDraft)
  }

  const continueEmail = async () => {
    await handleEmailContinuation({
      mode: state.mode,
      emailForm: state.emailForm,
      phoneForm: state.phoneForm,
      setMode: state.setMode,
      setMessage: state.setMessage,
      store,
      finish,
    })
  }

  const sendPhoneOtp = () => {
    handlePhoneOtpSend({
      phoneForm: state.phoneForm,
      setPhoneForm: state.setPhoneForm,
      setMessage: state.setMessage,
    })
  }

  const verifyPhoneOtp = () => {
    handlePhoneOtpVerification({
      store,
      phoneForm: state.phoneForm,
      setMode: state.setMode,
      setMessage: state.setMessage,
      finish,
    })
  }

  const createPhoneUser = async () => {
    await handlePhoneUserCreation({
      store,
      phoneForm: state.phoneForm,
      setMessage: state.setMessage,
      finish,
    })
  }

  return {
    continueEmail,
    sendPhoneOtp,
    verifyPhoneOtp,
    createPhoneUser,
    openPhone: () => clear('phone'),
    back: () => clear('main'),
    google: () => createSocialUser(store, finish, 'Google', 'google.demo@dewedding.local'),
    apple: () => createSocialUser(store, finish, 'Apple', 'apple.demo@dewedding.local'),
  }
}