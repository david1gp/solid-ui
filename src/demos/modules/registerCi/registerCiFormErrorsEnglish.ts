import { registerCiInputValidityMessageEnglish } from "./registerCiInputValidityMessageEnglish.js"

/** Collects English validation messages keyed by input name and focuses the first invalid input. */
export function registerCiFormErrorsEnglish(form: HTMLFormElement): Record<string, string> {
  const errors: Record<string, string> = {}
  let first: HTMLInputElement | undefined
  for (const el of Array.from(form.elements)) {
    if (!(el instanceof HTMLInputElement) || !el.name) continue
    const message = registerCiInputValidityMessageEnglish(el)
    if (!message) continue
    errors[el.name] = message
    first ??= el
  }
  first?.focus()
  return errors
}
