import { FooterModern } from "#src/demos/modules/footerModern/FooterModern.jsx"

export function DemoFooterModern() {
  return (
    <div class={"min-h-svh bg-background text-foreground"}>
      <main class={"min-h-[60dvh] p-8"}>
        <h1 class={"mb-6 text-2xl font-semibold"}>Footer-Modern</h1>
        <p class={"text-muted-foreground"}>Platzhalter für den Seiteninhalt. Der Footer befindet sich unten.</p>
      </main>
      <FooterModern />
    </div>
  )
}
