/** Smoothly scrolls the window back to the top, instantly when the user prefers reduced motion. */
export function footerSimpleScrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
}
