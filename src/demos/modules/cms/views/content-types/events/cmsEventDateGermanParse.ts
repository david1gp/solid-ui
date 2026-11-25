/** Parses German TT.MM.JJJJ (also T.M.JJJJ) into an ISO date, or undefined if it is not a real date. */
export function cmsEventDateGermanParse(text: string) {
  const match = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(text.trim())
  if (!match) return undefined
  const [day, month, year] = [Number(match[1]), Number(match[2]), Number(match[3])]
  const date = new Date(Date.UTC(year, month - 1, day))
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return undefined
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}
