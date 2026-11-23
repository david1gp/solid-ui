/** German validation message for a native form control, empty string when valid. */
export function registerCiInputValidityMessageGerman(el: HTMLInputElement): string {
  const v = el.validity
  if (v.valid) return ""
  if (v.valueMissing) {
    if (el.type === "checkbox") return "Bitte bestätige dieses Feld."
    return "Bitte fülle dieses Feld aus."
  }
  if (v.typeMismatch && el.type === "email") return "Bitte gib eine gültige E-Mail-Adresse ein."
  if (v.tooShort) return `Bitte mindestens ${el.minLength} Zeichen eingeben.`
  if (v.tooLong) return `Bitte höchstens ${el.maxLength} Zeichen eingeben.`
  if (v.patternMismatch) return "Bitte das geforderte Format verwenden."
  return "Bitte überprüfe deine Eingabe."
}
