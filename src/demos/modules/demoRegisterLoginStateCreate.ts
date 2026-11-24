import { createSignal, onCleanup } from "solid-js"
import { demoRegisterLoginTexts } from "./demoRegisterLoginTexts.js"
import { formErrorsEnglish } from "./formErrorsEnglish.js"
import { formErrorsGerman } from "./formErrorsGerman.js"

export function demoRegisterLoginStateCreate(options?: {
  locale?: () => "de" | "en"
  initialMode?: "login" | "register"
  onModeChange?: (mode: "login" | "register") => void
  onForgot?: () => void
  onSuccess?: () => void
  onResetSuccess?: () => void
}) {
  const [localLocale, setLocale] = createSignal<"de" | "en">("de")
  const locale = () => options?.locale?.() ?? localLocale()
  const texts = () => demoRegisterLoginTexts[locale()]
  let previousLang: string | null = null
  if (typeof document !== "undefined") {
    previousLang = document.documentElement.getAttribute("lang")
    if (!options?.locale) document.documentElement.lang = "de"
  }
  const changeLocale = (next: "de" | "en") => {
    if (next === locale()) return
    setLocale(next)
    document.documentElement.lang = next
    setErrors({})
    setResetErrors({})
  }
  const formErrors = (form: HTMLFormElement) => (locale() === "de" ? formErrorsGerman(form) : formErrorsEnglish(form))
  const [mode, setMode] = createSignal<"login" | "register">(options?.initialMode ?? "login")
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
    if (options?.onModeChange) return options.onModeChange(next)
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
    const next = formErrors(form)
    if (next.terms) next.terms = texts().termsError
    setErrors(next)
    if (Object.keys(next).length) return
    setLoading(true)
    submitTimer = setTimeout(() => {
      setLoading(false)
      options?.onSuccess?.()
    }, 900)
  }
  const openReset = () => {
    if (options?.onForgot) return options.onForgot()
    if (resetEmail) resetEmail.value = email()
    setResetErrors({})
    dialog?.showModal()
    focusTimer = setTimeout(() => resetEmail?.focus(), 50)
  }
  const closeReset = () => dialog?.close()
  const submitReset = (event: SubmitEvent) => {
    event.preventDefault()
    const next = formErrors(event.currentTarget as HTMLFormElement)
    setResetErrors(next)
    if (Object.keys(next).length) return
    if (options?.onResetSuccess) options.onResetSuccess()
    else closeReset()
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
    if (!options?.locale) {
      if (previousLang === null) document.documentElement.removeAttribute("lang")
      else document.documentElement.lang = previousLang
    }
    clearTimeout(submitTimer)
    clearTimeout(focusTimer)
  })
  return {
    locale,
    texts,
    changeLocale,
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
