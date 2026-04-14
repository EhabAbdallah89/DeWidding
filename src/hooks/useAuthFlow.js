import { useState } from 'react'
import { emailDraft, emptyAuthMessage, phoneDraft } from './auth-flow/authDrafts'
import {
  createSocialUser,
  finishAuth,
  handleEmailContinuation,
  handlePhoneOtpSend,
  handlePhoneOtpVerification,
  handlePhoneUserCreation,
} from './auth-flow/authHelpers'

// هذا المسار مسؤول فقط عن شاشة الدخول والتسجيل.
// تم تقسيمه إلى: حالات + أدوات مساعدة + معالجات منفصلة.
export function useAuthFlow(store) {
  // ==============================
  // الحالات الأساسية (useState)
  // ==============================
  const [mode, setMode] = useState('main')
  const [emailForm, setEmailForm] = useState(emailDraft)
  const [phoneForm, setPhoneForm] = useState(phoneDraft)
  const [message, setMessage] = useState(emptyAuthMessage)

  // ==============================
  // معالجات عامة
  // ==============================
  const clear = (nextMode = 'main') => {
    setMode(nextMode)
    setMessage(emptyAuthMessage)
  }

  const finish = (user) => {
    finishAuth(store, clear, setEmailForm, setPhoneForm, user, emailDraft, phoneDraft)
  }

  // ==============================
  // معالجات تسجيل الدخول الاجتماعي
  // ==============================
  const loginWithGoogle = () => createSocialUser(store, finish, 'Google', 'google.demo@dewedding.local')
  const loginWithApple = () => createSocialUser(store, finish, 'Apple', 'apple.demo@dewedding.local')

  // ==============================
  // معالجات البريد الإلكتروني
  // ==============================
  const continueEmail = () => {
    handleEmailContinuation({
      mode,
      emailForm,
      phoneForm,
      setMode,
      setMessage,
      store,
      finish,
    })
  }

  // ==============================
  // معالجات الهاتف و OTP
  // ==============================
  const sendPhoneOtp = () => {
    handlePhoneOtpSend({
      phoneForm,
      setPhoneForm,
      setMessage,
    })
  }

  const verifyPhoneOtp = () => {
    handlePhoneOtpVerification({
      store,
      phoneForm,
      setMode,
      setMessage,
      finish,
    })
  }

  const createPhoneUser = () => {
    handlePhoneUserCreation({
      store,
      phoneForm,
      setMessage,
      finish,
    })
  }

  return {
    mode,
    emailForm,
    phoneForm,
    message,
    setEmailForm: (patch) => setEmailForm((prev) => ({ ...prev, ...patch })),
    setPhoneForm: (patch) => setPhoneForm((prev) => ({ ...prev, ...patch })),
    continueEmail,
    sendPhoneOtp,
    verifyPhoneOtp,
    createPhoneUser,
    openPhone: () => clear('phone'),
    back: () => clear('main'),
    google: loginWithGoogle,
    apple: loginWithApple,
  }
}
