export function inputValidityMessageEnglish(el: HTMLInputElement): string {
  const v = el.validity
  if (v.valid) return ""
  if (v.valueMissing) {
    if (el.type === "checkbox") return "Please check this field."
    return "Please fill out this field."
  }
  if (v.typeMismatch && el.type === "email") return "Please enter a valid email address."
  if (v.tooShort) return `Please enter at least ${el.minLength} characters.`
  if (v.tooLong) return `Please enter no more than ${el.maxLength} characters.`
  if (v.patternMismatch) return "Please match the requested format."
  return "Please check your input."
}
