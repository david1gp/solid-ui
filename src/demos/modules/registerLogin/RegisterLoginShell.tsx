import type { JSX } from "@solidjs/web"
import { LogoImageText } from "#ui/static/logo/LogoImageText.jsx"
import "../DemoRegisterLogin.css"

export function RegisterLoginShell(props: {
  children: JSX.Element
  overlay?: JSX.Element
  locale: "de" | "en"
  onLocaleChange: (locale: "de" | "en") => void
  languageLabel: string
  privacy: string
  legal: string
  help: string
  headerAction?: JSX.Element
}) {
  return (
    <div class="register-login">
      <div class="page">
        <header class={props.headerAction ? "site-header flex-wrap" : "site-header"}>
          <LogoImageText logoText="adaptive-solid-ui" logoTextClass="text-lg font-semibold" />
          {/* biome-ignore lint/a11y/useSemanticElements: The segmented toggle is specified as an ARIA group. */}
          <div class="language-toggle" role="group" aria-label={props.languageLabel}>
            <button
              type="button"
              lang="de"
              aria-pressed={props.locale === "de" ? "true" : "false"}
              onClick={() => props.onLocaleChange("de")}
            >
              DE
            </button>
            <button
              type="button"
              lang="en"
              aria-pressed={props.locale === "en" ? "true" : "false"}
              onClick={() => props.onLocaleChange("en")}
            >
              EN
            </button>
          </div>
          {props.headerAction}
        </header>
        <main>
          <section
            class={props.headerAction ? "auth-container !animate-none" : "auth-container"}
            aria-labelledby="authTitle"
          >
            {props.children}
          </section>
        </main>
        <footer class="site-footer">
          <span>© 2025 adaptive-solid-ui</span>
          <a href="#authTitle">{props.privacy}</a>
          <a href="#authTitle">{props.legal}</a>
          <a href="#authTitle">{props.help}</a>
        </footer>
      </div>
      {props.overlay}
    </div>
  )
}
