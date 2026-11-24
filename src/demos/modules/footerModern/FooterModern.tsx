import { FooterModernGlassPanel } from "./FooterModernGlassPanel.jsx"
import { FooterModernNewsletterPill } from "./FooterModernNewsletterPill.jsx"
import { FooterModernScene } from "./FooterModernScene.jsx"

export function FooterModern() {
  return (
    <footer
      class={
        "relative isolate flex min-h-svh flex-col overflow-hidden bg-[#687d89] px-4 pt-24 pb-4 text-white sm:px-8 sm:pt-28 sm:pb-8"
      }
    >
      <FooterModernScene />
      <div class={"mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between gap-24"}>
        <div class={"mx-auto flex w-full max-w-3xl flex-col items-center text-center"}>
          <p class={"mb-5 text-xs font-semibold tracking-[0.25em] uppercase text-white/90"}>
            Ein bisschen mehr Weitblick
          </p>
          <h2 class={"text-[clamp(2.7rem,6vw,5.5rem)] leading-[1.04] font-medium tracking-[-0.05em] text-shadow-lg"}>
            Wöchentliche News.
            <br />
            Ohne Schnickschnack.
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
