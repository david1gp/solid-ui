import { type Accessor, createSignal, onCleanup } from "solid-js"
import { classArr } from "#ui/utils/classArr.js"

/** Keep in sync with the duration-200 class in `flyoutState.contentClass`. */
const closeMs = 200

export interface FlyoutState {
  /** Popover open state; stays true while the close animation runs. */
  open: Accessor<boolean>
  setOpen: (open: boolean) => void
  /** Animation classes for Popover.Content: scale+fade in on mount, out before unmount. */
  contentClass: () => string
  /**
   * Pass as Popover.Trigger onClick: a click during the close animation re-opens instead of
   * toggling (open() is still true then, so the default toggle would close again).
   */
  onTriggerClick: (e: MouseEvent) => void
}

/**
 * Open state for a sidebar flyout with enter/exit animation that needs no global keyframes:
 * enter uses `@starting-style`, exit delays the real close until the transition finished.
 */
export function modernFlyoutStateCreate(): FlyoutState {
  const [open, setOpenRaw] = createSignal(false)
  const [closing, setClosing] = createSignal(false)
  let timer: ReturnType<typeof setTimeout> | undefined
  // Imperative state for the transition; a same-tick close cannot read the batched signal yet.
  let isOpen = false
  onCleanup(() => clearTimeout(timer))

  function setOpen(next: boolean) {
    clearTimeout(timer)
    if (next) {
      isOpen = true
      setClosing(false)
      setOpenRaw(true)
      return
    }
    if (!isOpen) return
    const finishClosing = () => {
      isOpen = false
      setOpenRaw(false)
      setClosing(false)
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finishClosing()
      return
    }
    setClosing(true)
    timer = setTimeout(finishClosing, closeMs)
  }

  const contentClass = () =>
    classArr(
      "transition-[opacity,scale] duration-200 ease-out motion-reduce:transition-none", // animation
      "data-[placement^=right]:origin-left data-[placement^=top]:origin-bottom", // grow out of the trigger
      "starting:opacity-0 starting:scale-95", // enter
      // pointer-events-none! beats corvu's inline pointer-events:auto
      closing() ? "opacity-0 scale-95 pointer-events-none!" : "opacity-100 scale-100", // exit
    )

  function onTriggerClick(e: MouseEvent) {
    if (!closing()) return
    e.preventDefault()
    setOpen(true)
  }

  return { open, setOpen, contentClass, onTriggerClick }
}
