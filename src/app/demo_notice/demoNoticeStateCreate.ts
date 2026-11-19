import { createSignal, onMount } from "solid-js"

const demoNoticeStorageKey = "demo-notice-dismissed"

/** Visibility of the demo notice: shown after mount until dismissed for the current browser session. */
export function demoNoticeStateCreate() {
  const [visible, setVisible] = createSignal(false)
  onMount(() => {
    try {
      if (sessionStorage.getItem(demoNoticeStorageKey)) return
    } catch {}
    setVisible(true)
  })
  const dismiss = () => {
    setVisible(false)
    try {
      sessionStorage.setItem(demoNoticeStorageKey, "1")
    } catch {}
  }
  return { visible, dismiss }
}
