import { createSignal } from "solid-js"
import { CookieBanner } from "#ui/composite/cookie/CookieBanner.jsx"
import { CookieSettingsButton } from "#ui/composite/cookie/CookieSettingsButton.jsx"
import { defaultConsentConfig, getStoredConsent, openCookiePreferences } from "#ui/composite/cookie/consent/index.js"
import { Button } from "#ui/interactive/button/Button.jsx"
import { buttonVariant } from "#ui/interactive/button/buttonCva.js"

export function DemoCookieBanner() {
  const [stored, setStored] = createSignal(getStoredConsent())

  const refresh = () => setStored(getStoredConsent())

  const reset = () => {
    localStorage.removeItem(defaultConsentConfig.storageKey)
    refresh()
    // Reload so the banner re-evaluates its initial visibility.
    location.reload()
  }

  window.addEventListener(defaultConsentConfig.changeEvent, refresh)

  return (
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-6">Cookie Banner</h1>

      <p class="max-w-prose text-slate-600 dark:text-slate-400 mb-6">
        A lean SolidJS cookie-consent banner. Consent is stored in <code>localStorage</code> and wired to Google Consent
        Mode v2 — pass <code>gaId</code> / <code>adsId</code> to enable Google Analytics / Ads after opt-in.
      </p>

      <div class="flex flex-wrap gap-3 mb-6">
        <Button variant={buttonVariant.filledBlue} onClick={() => openCookiePreferences()}>
          Open settings
        </Button>
        <Button variant={buttonVariant.outlineRed} onClick={reset}>
          Reset consent (reload)
        </Button>
        <CookieSettingsButton class="self-center" />
      </div>

      <pre class="rounded-md bg-slate-100 dark:bg-slate-800 p-4 text-sm overflow-auto">
        {JSON.stringify(stored(), null, 2) ?? "no consent stored yet"}
      </pre>

      {/* In a real app, mount <CookieBanner /> once at the app root. */}
      <CookieBanner gaId="G-XXXXXXXXXX" adsId="AW-XXXXXXXXXX" privacyHref="#datenschutz" imprintHref="#impressum" />
    </div>
  )
}
