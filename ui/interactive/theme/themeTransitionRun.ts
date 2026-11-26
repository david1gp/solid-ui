/** Run a theme update as a cross-fade, without requiring consumers to ship transition CSS. */
export function themeTransitionRun(update: () => void): void {
  if (
    typeof document === "undefined" ||
    typeof document.startViewTransition !== "function" ||
    (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
  ) {
    update()
    return
  }

  // The UA supplies the cross-fade keyframes; override their duration and easing
  // only while this transition is active, rather than requiring library CSS.
  const style = document.createElement("style")
  style.textContent = `::view-transition-group(root), ::view-transition-old(root), ::view-transition-new(root) {
    animation-duration: 300ms;
    animation-timing-function: linear;
  }`
  document.head.appendChild(style)

  let updated = false
  const apply = () => {
    updated = true
    update()
  }
  try {
    const transition = document.startViewTransition(apply)
    void transition.ready.catch(() => {})
    void transition.updateCallbackDone.catch(() => {})
    void transition.finished.catch(() => {}).finally(() => style.remove())
  } catch {
    style.remove()
    if (!updated) apply()
  }
}
