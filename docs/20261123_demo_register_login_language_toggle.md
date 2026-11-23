# DemoRegisterLogin: DE/EN language toggle

## Goal

The demo page `/modules/DemoRegisterLogin` gets a DE/EN switch. All user-facing texts of the page (card, tabs, form, validation messages, password strength, reset dialog, OAuth buttons, footer, aria-labels) switch between German and English. Default stays German. Nothing else about layout/behaviour changes.

## Decisions

- **Placement:** top-right of the existing page header, vertically aligned with the logo (top-left). Same position on mobile (390px). Not inside the card, not next to the floating theme/home buttons.
- **Control:** small segmented toggle `DE | EN` (text codes, no flags, no dropdown). Active option visually highlighted, consistent with the existing tab styling of the card (reuse colors/radius tokens from `DemoRegisterLogin.css`, works in light + dark mode).
- **Semantics:** wrapper `role="group"` with `aria-label` ("Sprache" / "Language"); two `<button type="button">` with `aria-pressed`, each with its own `lang` attribute (`lang="de"` / `lang="en"`). Tap target height ≥ 40px. Visible focus style.
- **Document language:** on mount and on every switch set `document.documentElement.lang` to the active locale (`de` / `en`); restore the previous value in `onCleanup`.
- **State:** a `locale` signal (`"de" | "en"`, default `"de"`) inside the demo state (`demoRegisterLoginStateCreate.ts`). No persistence, no URL param.
- **Errors on switch:** when the locale changes, clear the currently displayed field errors (no re-translation of stale errors).
- **Texts:** one dictionary module for this demo (e.g. `demoRegisterLoginTexts.ts`, typed so both locales must have the same keys). The component reads texts from it via the current locale; no hardcoded user-facing strings remain in the TSX.
- **Validation messages:** add an English counterpart to `inputValidityMessageGerman.ts` (e.g. `inputValidityMessageEnglish.ts`) and let the form-error collection use the message function of the active locale. Keep the existing German helpers' behaviour unchanged. The terms override stays: DE "Bitte akzeptiere die Nutzungsbedingungen." / EN "Please accept the terms of service."
- **No new dependencies**, no i18n library. Follow `/home/tim/.agents/skills/code-style/SKILL.md` (one export per file, subject-first names).
- Brand `adaptive-solid-ui` and provider names (Google, Apple, Microsoft) are not translated.

## English copy (use exactly)

| German | English |
|---|---|
| Willkommen zurück | Welcome back |
| Melde dich an, um auf dein Konto zuzugreifen. | Sign in to access your account. |
| Konto erstellen (heading + submit) | Create account |
| Registriere dich in weniger als einer Minute. | Sign up in less than a minute. |
| Zugangsart auswählen | Choose access type |
| Einloggen (tab + submit) | Sign in |
| Registrieren | Sign up |
| Name | Name |
| Max Mustermann | Jane Doe |
| E-Mail-Adresse | Email address |
| name@beispiel.de | name@example.com |
| Passwort | Password |
| Dein Passwort | Your password |
| Passwort vergessen? | Forgot password? |
| Passwort anzeigen / ausblenden | Show password / Hide password |
| Mindestens 8 Zeichen verwenden. | Use at least 8 characters. |
| Passwortstärke: … (schwach/…/stark) | Password strength: … (weak/fair/good/strong — map each existing level) |
| Ich akzeptiere die Nutzungsbedingungen und Datenschutzerklärung. | I accept the Terms of Service and Privacy Policy. |
| Angemeldet bleiben | Remember me |
| oder einloggen mit / oder registrieren mit | or sign in with / or sign up with |
| Mit {Provider} fortfahren | Continue with {Provider} |
| Noch kein Konto? Registrieren | Don't have an account? Sign up |
| Du hast bereits ein Konto? Einloggen | Already have an account? Sign in |
| Passwort zurücksetzen | Reset password |
| Wir senden dir einen sicheren Link per E-Mail. | We'll email you a secure link. |
| Abbrechen | Cancel |
| Link senden | Send link |
| Dialog schließen | Close dialog |
| Datenschutz / Impressum / Hilfe | Privacy / Legal notice / Help |
| Bitte bestätige dieses Feld. | Please check this field. |
| Bitte fülle dieses Feld aus. | Please fill out this field. |
| Bitte gib eine gültige E-Mail-Adresse ein. | Please enter a valid email address. |
| Bitte mindestens N Zeichen eingeben. | Please enter at least N characters. |
| Bitte höchstens N Zeichen eingeben. | Please enter no more than N characters. |
| Bitte das geforderte Format verwenden. | Please match the requested format. |
| Bitte überprüfe deine Eingabe. | Please check your input. |
| Sprache | Language |

Any German string found in the files that is missing above: translate in the same tone (informal, short) and report it.

## Files

- `src/demos/modules/DemoRegisterLogin.tsx` — header toggle, texts from dictionary
- `src/demos/modules/DemoRegisterLogin.css` — toggle styles
- `src/demos/modules/demoRegisterLoginStateCreate.ts` — locale signal, error clearing, locale-aware validation
- `src/demos/modules/formErrorsGerman.ts`, `inputValidityMessageGerman.ts` — keep behaviour; new English/locale-aware siblings as needed

## Tasks

1. Implement everything above (single increment). Verify: typecheck + lint scripts only; browser check DE + EN, login + register + reset dialog + validation, mobile 390px, dark mode, `<html lang>` value. — status: done (branch `t3/register-login-language-toggle`, commit `8d356e5`)
2. Commit, merge to main, push, verify on https://adaptive-solid-ui.pages.dev/modules/DemoRegisterLogin. — status: open
