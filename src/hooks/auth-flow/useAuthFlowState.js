import { useState } from 'react'
import { emailDraft, emptyAuthMessage, phoneDraft } from './authDrafts'

// هذه الدالة تجمع حالات شاشة الدخول في مكان واحد.
export function useAuthFlowState() {
  const [mode, setMode] = useState('main')
  const [emailForm, setEmailForm] = useState(emailDraft)
  const [phoneForm, setPhoneForm] = useState(phoneDraft)
  const [message, setMessage] = useState(emptyAuthMessage)

  return {
    mode,
    setMode,
    emailForm,
    setEmailForm,
    phoneForm,
    setPhoneForm,
    message,
    setMessage,
  }
}
