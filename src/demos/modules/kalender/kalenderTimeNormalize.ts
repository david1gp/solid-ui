/** Normalize a typed 24-hour time, accepting only quarter-hour values. */
export function kalenderTimeNormalize(value: string): string | undefined {
  const input = value.trim()
  let hours: string
  let minutes: string
  if (/^\d{1,2}$/.test(input)) {
    hours = input
    minutes = "00"
  } else if (/^\d{3,4}$/.test(input)) {
    hours = input.slice(0, -2)
    minutes = input.slice(-2)
  } else {
    const match = /^(\d{1,2}):(\d{2})$/.exec(input)
    if (!match) return undefined
    hours = match[1]!
    minutes = match[2]!
  }
  if (Number(hours) > 23 || Number(minutes) > 59 || Number(minutes) % 15 !== 0) return undefined
  return `${hours.padStart(2, "0")}:${minutes}`
}
