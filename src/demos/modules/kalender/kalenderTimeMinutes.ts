/** `HH:MM` → minutes since midnight, or NaN for invalid input. */
export function kalenderTimeMinutes(time: string) {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time)
  return match ? Number(match[1]) * 60 + Number(match[2]) : Number.NaN
}
