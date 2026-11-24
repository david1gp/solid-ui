import "./FooterModernBackdrop.css"

/** CSS-only background (horizon rings + soft glows from theme tokens). Parent needs `relative isolate`. */
export function FooterModernBackdrop() {
  return <div aria-hidden={"true"} class={"footer-modern-backdrop"} />
}
