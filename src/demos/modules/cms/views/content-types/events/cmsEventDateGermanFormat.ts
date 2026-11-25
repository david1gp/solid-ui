/** Formats an ISO date (YYYY-MM-DD) as German TT.MM.JJJJ. */
export function cmsEventDateGermanFormat(iso: string) {
  const [year, month, day] = iso.split("-")
  return year && month && day ? `${day}.${month}.${year}` : iso
}
