import { inputValidityMessageEnglish } from "./inputValidityMessageEnglish.js"

export function formErrorsEnglish(form: HTMLFormElement): Record<string, string> {
  const errors: Record<string, string> = {}
  let first: HTMLInputElement | undefined
  for (const el of Array.from(form.elements)) {
    if (!(el instanceof HTMLInputElement) || !el.name) continue
    const message = inputValidityMessageEnglish(el)
    if (!message) continue
    errors[el.name] = message
    first ??= el
  }
  first?.focus()
  return errors
}
