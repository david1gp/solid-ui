import { createSignalObject } from "#ui/utils/createSignalObject"
import { scheduleIdle } from "@solid-primitives/scheduled"


export const searchInputSignal = createSignalObject("")

export const searchInputDebouncedSignal = scheduleIdle(searchInputSignal.get)
// export const searchInputDebouncedSignal = createMemo(() => {
//   return scheduleIdle(searchInputSignal.get)
// })
