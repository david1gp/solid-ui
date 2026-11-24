import "./FooterModernBackdrop.css"

/** CSS-only illustration (striped sun over layered waves, theme-token colors). Parent needs `relative isolate`. */
export function FooterModernBackdrop() {
  return (
    <div aria-hidden={"true"} class={"footer-modern-backdrop"}>
      <span class={"footer-modern-sun"} />
      <span class={"footer-modern-wave footer-modern-wave-1"} />
      <span class={"footer-modern-wave footer-modern-wave-2"} />
      <span class={"footer-modern-wave footer-modern-wave-3"} />
    </div>
  )
}
