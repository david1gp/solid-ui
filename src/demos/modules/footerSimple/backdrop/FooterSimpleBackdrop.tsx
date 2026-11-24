import "./FooterSimpleBackdrop.css"

/** Placeholder backdrop: abstract color shapes behind the Footer-Simple demo. Parent needs `relative isolate`. */
export function FooterSimpleBackdrop() {
  return (
    <div aria-hidden="true" class={"footer-simple-backdrop"}>
      <span class={"footer-simple-backdrop-shape-violet"} />
      <span class={"footer-simple-backdrop-shape-amber"} />
      <span class={"footer-simple-backdrop-shape-teal"} />
      <span class={"footer-simple-backdrop-shape-magenta"} />
      <span class={"footer-simple-backdrop-shape-cyan"} />
    </div>
  )
}
