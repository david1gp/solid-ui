import { createSignal, onCleanup } from "solid-js"
import { formErrorsGerman } from "./formErrorsGerman.js"

export function demoRegisterLoginStateCreate() {
  const [mode, setMode] = createSignal<"login" | "register">("login")
  const [visible, setVisible] = createSignal(false)
  const [password, setPassword] = createSignal("")
  const [email, setEmail] = createSignal("")
  const [loading, setLoading] = createSignal(false)
  const [errors, setErrors] = createSignal<Record<string, string>>({})
  const [resetErrors, setResetErrors] = createSignal<Record<string, string>>({})
  let form: HTMLFormElement | undefined
  let dialog: HTMLDialogElement | undefined
  let resetEmail: HTMLInputElement | undefined
  let submitTimer: ReturnType<typeof setTimeout> | undefined
  let focusTimer: ReturnType<typeof setTimeout> | undefined
  const changeMode = (next: "login" | "register") => {
    setMode(next)
    form?.reset()
    setErrors({})
    setPassword("")
    setEmail("")
    setVisible(false)
  }
  const score = () =>
    Number(password().length >= 8) +
    Number(password().length >= 12) +
    Number(/[A-Z]/.test(password()) && /[a-z]/.test(password())) +
    Number(/\d/.test(password()) && /[^A-Za-z0-9]/.test(password()))
  const submit = (event: SubmitEvent) => {
    event.preventDefault()
    if (!form) return
    const next = formErrorsGerman(form)
    if (next.terms) next.terms = "Bitte akzeptiere die Nutzungsbedingungen."
    setErrors(next)
    if (Object.keys(next).length) return
    setLoading(true)
    submitTimer = setTimeout(() => setLoading(false), 900)
  }
  const openReset = () => {
    if (resetEmail) resetEmail.value = email()
    setResetErrors({})
    dialog?.showModal()
    focusTimer = setTimeout(() => resetEmail?.focus(), 50)
  }
  const closeReset = () => dialog?.close()
  const submitReset = (event: SubmitEvent) => {
    event.preventDefault()
    const next = formErrorsGerman(event.currentTarget as HTMLFormElement)
    setResetErrors(next)
    if (Object.keys(next).length) return
    closeReset()
  }
  /** Removes the error of the edited field once the user changes it. */
  const clearError = (set: typeof setErrors) => (event: Event) => {
    const name = (event.target as HTMLInputElement | null)?.name
    if (!name) return
    set((prev) => {
      if (!(name in prev)) return prev
      const { [name]: _, ...rest } = prev
      return rest
    })
  }
  onCleanup(() => {
    clearTimeout(submitTimer)
    clearTimeout(focusTimer)
  })
  return {
    mode,
    visible,
    password,
    email,
    loading,
    score,
    changeMode,
    toggleVisible: () => setVisible((prev) => !prev),
    passwordInput: setPassword,
    emailInput: setEmail,
    submit,
    openReset,
    closeReset,
    submitReset,
    errors,
    resetErrors,
    clearError: clearError(setErrors),
    clearResetError: clearError(setResetErrors),
    setForm: (el: HTMLFormElement) => {
      form = el
    },
    setDialog: (el: HTMLDialogElement) => {
      dialog = el
    },
    setResetEmail: (el: HTMLInputElement) => {
      resetEmail = el
    },
  }
}
