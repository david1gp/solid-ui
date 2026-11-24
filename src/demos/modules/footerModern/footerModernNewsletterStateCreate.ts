import { toastAdd } from "#ui/interactive/toast/toastAdd.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Newsletter form state: e-mail draft, German validation message and a demo-only subscribe toast. */
export function footerModernNewsletterStateCreate() {
  const email = createSignalObject("")
  const error = createSignalObject<string | undefined>(undefined)
  const subscribed = createSignalObject<string | undefined>(undefined)
  const input = (value: string) => {
    email.set(value)
    if (error.get()) error.set(undefined)
  }
  const submit = (e: SubmitEvent) => {
    e.preventDefault()
    const value = email.get().trim()
    if (!emailPattern.test(value)) {
      error.set("Bitte eine gültige E-Mail-Adresse eingeben.")
      return
    }
    error.set(undefined)
    email.set("")
    subscribed.set(value)
    toastAdd({ title: `Bestätigungslink an ${value} gesendet`, duration: 4000 })
  }
  return {
    email: email.get,
    error: error.get,
    subscribed: subscribed.get,
    input,
    submit,
  }
}
