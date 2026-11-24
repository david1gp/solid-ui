import { FooterModernBackdrop } from "./FooterModernBackdrop.jsx"
import { FooterModernNewsletterPill } from "./FooterModernNewsletterPill.jsx"
import { FooterModernPanel } from "./FooterModernPanel.jsx"

/** Large footer: newsletter call-to-action over a CSS illustration, then a link panel on the footer ground. */
export function FooterModern() {
  return (
    <footer class={"footer-modern relative isolate overflow-hidden text-foreground"}>
      <div class={"relative isolate px-4 pt-24 pb-40 sm:px-8 sm:pt-28 sm:pb-52"}>
        <FooterModernBackdrop />
        <div class={"mx-auto flex w-full max-w-6xl flex-col items-center text-center"}>
          <p class={"mb-5 text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground"}>Release-Notizen</p>
          <h2 class={"text-balance text-[clamp(2.25rem,4vw,3.4rem)] leading-[1.08] font-medium tracking-[-0.04em]"}>
            Neue Bausteine, direkt ins Postfach.
          </h2>
          <p class={"mt-6 max-w-lg text-base leading-relaxed text-muted-foreground"}>
            Einmal im Monat: neue Komponenten, Vorlagen und Tipps für Solid.js – kurz und kompakt.
          </p>
          <FooterModernNewsletterPill />
        </div>
      </div>
      <div class={"px-4 pb-4 sm:px-8 sm:pb-8"}>
        <div class={"mx-auto w-full max-w-6xl"}>
          <FooterModernPanel />
        </div>
      </div>
    </footer>
  )
}
