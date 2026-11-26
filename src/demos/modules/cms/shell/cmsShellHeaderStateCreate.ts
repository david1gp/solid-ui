import { createSignal, onSettled } from "solid-js"
import { cmsNavigate } from "./cmsNavigate.js"

export function cmsShellHeaderStateCreate(onNavigate: () => void) {
  const [open, setOpen] = createSignal(false)
  let container: HTMLElement | undefined
  const close = () => setOpen(false)
  onSettled(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!container?.contains(event.target as Node)) close()
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open()) close()
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  })
  return {
    open,
    setContainer: (element: HTMLElement) => {
      container = element
    },
    toggle: () => setOpen(!open()),
    openNotifications: () => {
      close()
      onNavigate()
      cmsNavigate("notifications")
    },
  }
}
