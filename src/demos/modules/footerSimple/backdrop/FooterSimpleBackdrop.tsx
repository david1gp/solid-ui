import "./FooterSimpleBackdrop.css"

/** CSS-only page background (dot grid + muted glow from theme tokens). Parent needs `relative isolate`. */
export function FooterSimpleBackdrop() {
  return <div aria-hidden="true" class={"footer-simple-backdrop"} />
}
