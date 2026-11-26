/** Pick today when visible, otherwise the first day in the displayed range. */
export function kalenderNewTaskDayPick(days: readonly { day: number | undefined; isToday: boolean }[]) {
  return days.find((cell) => cell.isToday)?.day ?? days.find((cell) => cell.day !== undefined)?.day
}
