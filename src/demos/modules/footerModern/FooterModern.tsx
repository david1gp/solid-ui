import { FooterModernBackdrop } from "./FooterModernBackdrop.jsx"
import { FooterModernNewsletterPill } from "./FooterModernNewsletterPill.jsx"
import { FooterModernPanel } from "./FooterModernPanel.jsx"

/** Large footer: newsletter call-to-action above a solid link panel, on a CSS backdrop in theme colors. */
export function FooterModern() {
  return (
    <footer class={"relative isolate overflow-hidden px-4 pt-24 pb-4 text-foreground sm:px-8 sm:pt-28 sm:pb-8"}>
      <FooterModernBackdrop />
      <div class={"mx-auto flex w-full max-w-6xl flex-col gap-20 sm:gap-24"}>
        <div class={"flex flex-col items-center text-center"}>
          <p class={"mb-5 text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground"}>
            Ein bisschen mehr Weitblick
          </p>
          <h2 class={"text-balance text-[clamp(2.25rem,4vw,3.4rem)] leading-[1.08] font-medium tracking-[-0.04em]"}>
            Wöchentliche News. Ohne Schnickschnack.
          </h2>
          <p class={"mt-6 max-w-lg text-base leading-relaxed text-muted-foreground"}>
            Inspiration, Geschichten und neue Perspektiven – direkt in dein Postfach.
          </p>
          <FooterModernNewsletterPill />
        </div>
        <FooterModernPanel />
      </div>
    </footer>
  )
}
