import { FooterModernGlassPanel } from "./FooterModernGlassPanel.jsx"
import { FooterModernNewsletterPill } from "./FooterModernNewsletterPill.jsx"
import { FooterModernScene } from "./FooterModernScene.jsx"

export function FooterModern() {
  return (
    <footer
      class={
        "relative isolate flex min-h-svh flex-col overflow-hidden bg-[#687d89] px-4 pt-16 pb-4 text-white sm:px-8 sm:pt-16 sm:pb-8"
      }
    >
      <FooterModernScene />
      <div class={"mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between gap-44 sm:gap-32"}>
        <div class={"mx-auto flex w-full max-w-6xl flex-col items-center text-center"}>
          <p class={"mb-5 text-xs font-semibold tracking-[0.25em] uppercase text-white/90"}>
            Ein bisschen mehr Weitblick
          </p>
          <h2
            class={
              "text-balance text-[clamp(2.5rem,4vw,3.6rem)] leading-[1.08] font-medium tracking-[-0.045em] text-shadow-lg"
            }
          >
            Wöchentliche News. Ohne Schnickschnack.
          </h2>
          <p class={"mt-6 max-w-lg text-base leading-relaxed text-white/90"}>
            Inspiration, Geschichten und neue Perspektiven – direkt in dein Postfach.
          </p>
          <FooterModernNewsletterPill />
        </div>
        <FooterModernGlassPanel />
      </div>
    </footer>
  )
}
