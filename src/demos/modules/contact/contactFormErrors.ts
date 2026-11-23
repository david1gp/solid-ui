import type { ContactTexts } from "./contactTexts.js"

type Control = HTMLInputElement | HTMLTextAreaElement

/** Localized validation messages keyed by control name; focuses the first invalid control. */
export function contactFormErrors(form: HTMLFormElement, texts: ContactTexts): Record<string, string> {
  const errors: Record<string, string> = {}
  let first: Control | undefined
  for (const el of Array.from(form.elements)) {
    if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) || !el.name) continue
    const v = el.validity
    // minlength is only enforced natively after user edits and counts whitespace, so check trimmed length too.
    const trimmedTooShort = el.minLength > 0 && el.value.trim().length > 0 && el.value.trim().length < el.minLength
    const blank = el.required && el.type !== "checkbox" && el.value.trim() === ""
    if (v.valid && !trimmedTooShort && !blank) continue
    let message = texts.invalid
    if (v.valueMissing || blank) message = el.type === "checkbox" ? texts.consentError : texts.required
    else if (v.typeMismatch && el.type === "email") message = texts.invalidEmail
    else if (v.patternMismatch && el.type === "tel") message = texts.invalidPhone
    else if (v.tooShort || trimmedTooShort) message = texts.tooShort(el.minLength)
    else if (v.tooLong) message = texts.tooLong(el.maxLength)
    errors[el.name] = message
    first ??= el
  }
  first?.focus()
  return errors
}
