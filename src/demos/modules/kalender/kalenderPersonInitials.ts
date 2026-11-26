/** "Mia Fischer" → "MF", "jonas@firma.de" → "JO". */
export function kalenderPersonInitials(person: string) {
  const words = person
    .split("@")[0]!
    .split(/[\s._-]+/)
    .filter(Boolean)
  const initials = words.length > 1 ? words[0]![0]! + words[1]![0]! : (words[0] ?? "?").slice(0, 2)
  return initials.toUpperCase()
}
