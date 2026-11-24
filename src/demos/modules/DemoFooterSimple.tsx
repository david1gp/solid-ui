import { FooterSimpleBackdrop } from "#src/demos/modules/footerSimple/backdrop/FooterSimpleBackdrop.jsx"
import { FooterSimple } from "#src/demos/modules/footerSimple/FooterSimple.jsx"
import { FooterSimpleNewsletter } from "#src/demos/modules/footerSimple/FooterSimpleNewsletter.jsx"
import { footerSimpleDemoColumns } from "#src/demos/modules/footerSimple/footerSimpleDemoColumns.js"
import { footerSimpleDemoLegalLinks } from "#src/demos/modules/footerSimple/footerSimpleDemoLegalLinks.js"
import { footerSimpleDemoSocialLinks } from "#src/demos/modules/footerSimple/footerSimpleDemoSocialLinks.js"

/** Footer template demo; its components live in ./footerSimple and evolve independently of the other modules. */
export function DemoFooterSimple() {
  return (
    <div class={"relative isolate flex min-h-dvh w-full flex-col bg-background text-foreground"}>
      <FooterSimpleBackdrop />
      <main class={"flex-1 min-h-[60dvh] p-8"}>
        <h1 class={"text-2xl font-semibold mb-6"}>Footer-Simple</h1>
        <p class={"text-muted-foreground"}>Platzhalter für den Seiteninhalt. Der Footer befindet sich unten.</p>
      </main>
      <FooterSimple
        logo={
          <span
            class={"flex items-center justify-center size-6 rounded-md bg-foreground text-background text-sm font-bold"}
          >
            C
          </span>
        }
        brand={
          <>
            Atlas<span class={"text-muted-foreground"}>.</span>
          </>
        }
        description={"Projekte, Abläufe und Protokolle an einem Ort – einfach und sicher organisiert."}
        columns={footerSimpleDemoColumns}
        socialLinks={footerSimpleDemoSocialLinks}
        aside={
          <FooterSimpleNewsletter
            title={"Newsletter"}
            description={"Neuigkeiten und Produkt-Updates einmal im Monat."}
          />
        }
        copyright={`© ${new Date().getFullYear()} Atlas GmbH. Alle Rechte vorbehalten.`}
        legalLinks={footerSimpleDemoLegalLinks}
      />
    </div>
  )
}
