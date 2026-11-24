import { createSignal, onCleanup } from "solid-js"
import { contactFormErrors } from "../contact/contactFormErrors.js"
import { contactTexts } from "../contact/contactTexts.js"
import { contactModernTexts } from "./contactModernTexts.js"

export function contactModernStateCreate() {
  const [locale, setLocale] = createSignal<"de" | "en">("de")
  const [errors, setErrors] = createSignal<Record<string, string>>({})
  const [loading, setLoading] = createSignal(false)
  const [sent, setSent] = createSignal(false)
  let form: HTMLFormElement | undefined
  let timer: ReturnType<typeof setTimeout> | undefined
  const previousLang = typeof document === "undefined" ? null : document.documentElement.getAttribute("lang")
  if (typeof document !== "undefined") document.documentElement.lang = "de"
  onCleanup(() => {
    if (typeof document === "undefined") return
    if (previousLang === null) document.documentElement.removeAttribute("lang")
    else document.documentElement.lang = previousLang
    clearTimeout(timer)
  })
  const submit = (event: SubmitEvent) => {
    event.preventDefault()
    if (!form || loading()) return
    const next = contactFormErrors(form, contactTexts[locale()])
    setErrors(next)
    if (Object.keys(next).length) return
    setLoading(true)
    timer = setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 900)
  }
  const clearError = (event: Event) => {
    const name = (event.target as HTMLInputElement).name
    setErrors((previous) => {
      const next = { ...previous }
      delete next[name]
      return next
    })
  }
  const resizeMessage = (event: InputEvent) => {
    const input = event.currentTarget as HTMLTextAreaElement
    input.style.height = "auto"
    input.style.height = `${input.scrollHeight}px`
  }
  return {
    locale,
    texts: () => contactModernTexts[locale()],
    errors,
    loading,
    sent,
    submit,
    clearError,
    resizeMessage,
    setForm: (element: HTMLFormElement) => {
      form = element
    },
    changeLocale: (next: "de" | "en") => {
      setLocale(next)
      document.documentElement.lang = next
      setErrors({})
    },
    sendAnother: () => {
      setSent(false)
      setErrors({})
    },
  }
}
