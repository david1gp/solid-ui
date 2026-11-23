import { createSignal, onCleanup } from "solid-js"
import { contactFormErrors } from "./contactFormErrors.js"
import { contactTexts } from "./contactTexts.js"

/** State of the contact form demo: locale, validation, simulated sending and the success view. */
export function contactStateCreate() {
  const [locale, setLocale] = createSignal<"de" | "en">("de")
  const texts = () => contactTexts[locale()]
  let previousLang: string | null = null
  if (typeof document !== "undefined") {
    previousLang = document.documentElement.getAttribute("lang")
    document.documentElement.lang = "de"
  }
  const [errors, setErrors] = createSignal<Record<string, string>>({})
  const [loading, setLoading] = createSignal(false)
  const [messageLength, setMessageLength] = createSignal(0)
  const [sent, setSent] = createSignal<{ name: string; email: string } | null>(null)
  let form: HTMLFormElement | undefined
  let successHeading: HTMLHeadingElement | undefined
  let submitTimer: ReturnType<typeof setTimeout> | undefined
  let focusTimer: ReturnType<typeof setTimeout> | undefined

  const changeLocale = (next: "de" | "en") => {
    if (next === locale()) return
    setLocale(next)
    document.documentElement.lang = next
    setErrors({})
  }

  const submit = (event: SubmitEvent) => {
    event.preventDefault()
    if (!form || loading()) return
    const data = new FormData(form)
    const name = String(data.get("name") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    // Honeypot filled in: most likely a bot, pretend success without sending anything.
    if (String(data.get("website") ?? "") !== "") {
      setSent({ name, email })
      return
    }
    const next = contactFormErrors(form, texts())
    setErrors(next)
    if (Object.keys(next).length) return
    setLoading(true)
    // Simulated request; replace with the real API call of your app.
    submitTimer = setTimeout(() => {
      setLoading(false)
      setSent({ name, email })
      focusTimer = setTimeout(() => successHeading?.focus(), 50)
    }, 900)
  }

  const sendAnother = () => {
    setSent(null)
    setErrors({})
    setMessageLength(0)
    focusTimer = setTimeout(() => form?.querySelector<HTMLInputElement>("#contactName")?.focus(), 50)
  }

  /** Removes the error of the edited field once the user changes it. */
  const clearError = (event: Event) => {
    const name = (event.target as HTMLInputElement | null)?.name
    if (!name) return
    setErrors((prev) => {
      if (!(name in prev)) return prev
      const { [name]: _, ...rest } = prev
      return rest
    })
  }

  onCleanup(() => {
    if (previousLang === null) document.documentElement.removeAttribute("lang")
    else document.documentElement.lang = previousLang
    clearTimeout(submitTimer)
    clearTimeout(focusTimer)
  })

  return {
    locale,
    texts,
    changeLocale,
    errors,
    loading,
    sent,
    messageLength,
    messageInput: (value: string) => setMessageLength(value.length),
    submit,
    sendAnother,
    clearError,
    setForm: (el: HTMLFormElement) => {
      form = el
    },
    setSuccessHeading: (el: HTMLHeadingElement) => {
      successHeading = el
    },
  }
}
