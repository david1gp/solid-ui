/** Parses a 24-hour time (HH:MM, also H:MM or HH.MM) into HH:MM, or undefined if invalid. */
export function cmsEventTimeGermanParse(text: string) {
  const match = /^(\d{1,2})[:.](\d{2})$/.exec(text.trim())
  if (!match) return undefined
  const [hours, minutes] = [Number(match[1]), Number(match[2])]
  if (hours > 23 || minutes > 59) return undefined
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}
