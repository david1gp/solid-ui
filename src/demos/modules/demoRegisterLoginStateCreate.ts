import { createSignal, onCleanup } from "solid-js"

export function demoRegisterLoginStateCreate() {
  const [mode, setMode] = createSignal<"login" | "register">("login")
  const [visible, setVisible] = createSignal(false)
  const [password, setPassword] = createSignal("")
  const [email, setEmail] = createSignal("")
  const [loading, setLoading] = createSignal(false)
  let form: HTMLFormElement | undefined
  let dialog: HTMLDialogElement | undefined
  let resetEmail: HTMLInputElement | undefined
  let submitTimer: ReturnType<typeof setTimeout> | undefined
  let focusTimer: ReturnType<typeof setTimeout> | undefined
  const changeMode = (next: "login" | "register") => {
    setMode(next)
    form?.reset()
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
    if (!form?.reportValidity()) return
    setLoading(true)
    submitTimer = setTimeout(() => setLoading(false), 900)
  }
  const openReset = () => {
    if (resetEmail) resetEmail.value = email()
    dialog?.showModal()
    focusTimer = setTimeout(() => resetEmail?.focus(), 50)
  }
  const closeReset = () => dialog?.close()
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
    toggleVisible: () => setVisible(!visible()),
    passwordInput: setPassword,
    emailInput: setEmail,
    submit,
    openReset,
    closeReset,
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
