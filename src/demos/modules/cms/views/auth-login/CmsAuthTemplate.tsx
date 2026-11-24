import { For, Show } from "solid-js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsNavigate } from "../../shell/cmsNavigate.js"

type Mode = "login" | "register" | "forgot" | "reset" | "2fa" | "verify-email" | "invite" | "session-expired"

const texts = {
  de: {
    login: ["Willkommen zurück", "Melde dich an, um dein Admin-Dashboard zu öffnen.", "Anmelden"],
    register: ["Konto erstellen", "Erstelle ein Konto für deinen Arbeitsbereich.", "Konto erstellen"],
    forgot: [
      "Passwort vergessen?",
      "Gib deine E-Mail-Adresse ein, um dein Passwort zurückzusetzen.",
      "Link zum Zurücksetzen senden",
    ],
    reset: ["Neues Passwort", "Wähle ein neues Passwort für dein Konto.", "Passwort zurücksetzen"],
    "2fa": [
      "Zwei-Faktor-Authentifizierung",
      "Gib den sechsstelligen Code aus deiner Authenticator-App ein.",
      "Code bestätigen",
    ],
    "verify-email": [
      "E-Mail bestätigen",
      "Prüfe deinen Posteingang und bestätige deine E-Mail-Adresse. Dies ist eine Demo; es wird keine E-Mail gesendet.",
      "Weiter zur Anmeldung",
    ],
    invite: ["Einladung annehmen", "Erstelle dein Konto, um dem Arbeitsbereich beizutreten.", "Einladung annehmen"],
    "session-expired": [
      "Sitzung abgelaufen",
      "Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.",
      "Zur Anmeldung",
    ],
    email: "E-Mail-Adresse",
    password: "Passwort",
    newPassword: "Neues Passwort",
    name: "Name",
    code: "Bestätigungscode",
    forgotLink: "Passwort vergessen?",
    noAccount: "Noch kein Konto?",
    registerLink: "Registrieren",
    hasAccount: "Bereits ein Konto?",
    loginLink: "Anmelden",
    back: "Zurück zur Anmeldung",
    or: "oder",
    sso: "Mit SSO fortfahren",
    google: "Mit Google fortfahren",
    github: "Mit GitHub fortfahren",
    demo: "Demo-Vorlage – es findet keine Anmeldung statt.",
    required: "Bitte fülle dieses Feld aus.",
    invalidEmail: "Bitte gib eine gültige E-Mail-Adresse ein.",
    shortPassword: "Das Passwort muss mindestens 8 Zeichen haben.",
    invalidCode: "Bitte gib einen sechsstelligen Code ein.",
  },
  en: {
    login: ["Welcome back", "Sign in to open your admin dashboard.", "Sign in"],
    register: ["Create an account", "Create an account for your workspace.", "Create account"],
    forgot: ["Forgot your password?", "Enter your email address to reset your password.", "Send reset link"],
    reset: ["New password", "Choose a new password for your account.", "Reset password"],
    "2fa": ["Two-factor authentication", "Enter the six-digit code from your authenticator app.", "Verify code"],
    "verify-email": [
      "Verify your email",
      "Check your inbox and verify your email address. This is a demo; no email will be sent.",
      "Continue to sign in",
    ],
    invite: ["Accept invitation", "Create your account to join the workspace.", "Accept invitation"],
    "session-expired": ["Session expired", "Your session has expired. Please sign in again.", "Go to sign in"],
    email: "Email address",
    password: "Password",
    newPassword: "New password",
    name: "Name",
    code: "Verification code",
    forgotLink: "Forgot password?",
    noAccount: "Don't have an account?",
    registerLink: "Register",
    hasAccount: "Already have an account?",
    loginLink: "Sign in",
    back: "Back to sign in",
    or: "or",
    sso: "Continue with SSO",
    google: "Continue with Google",
    github: "Continue with GitHub",
    demo: "Demo template – no authentication takes place.",
    required: "Please fill out this field.",
    invalidEmail: "Please enter a valid email address.",
    shortPassword: "The password must be at least 8 characters.",
    invalidCode: "Please enter a six-digit code.",
  },
} as const

const inputClass =
  "mt-1.5 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-sm text-neutral-900 outline-none focus:border-neutral-500 dark:border-white/10 dark:bg-neutral-950 dark:text-white"
const linkClass = "font-medium text-blue-600 hover:underline dark:text-blue-400"

export function CmsAuthTemplate(p: { mode: Mode }) {
  const text = () => texts[cmsLocale.get()]
  const validateInput = (event: Event) => {
    const input = event.currentTarget as HTMLInputElement
    input.setCustomValidity("")
    if (input.validity.valueMissing) input.setCustomValidity(text().required)
    else if (input.validity.typeMismatch) input.setCustomValidity(text().invalidEmail)
    else if (input.validity.tooShort) input.setCustomValidity(text().shortPassword)
    else if (input.validity.patternMismatch) input.setCustomValidity(text().invalidCode)
  }
  const clearValidation = (event: Event) => (event.currentTarget as HTMLInputElement).setCustomValidity("")
  const next = () => {
    switch (p.mode) {
      case "login":
        return "auth-2fa"
      case "2fa":
        return "dashboard"
      case "register":
      case "invite":
        return "auth-verify-email"
      case "forgot":
        return "auth-reset"
      default:
        return "auth-login"
    }
  }
  return (
    <div class="space-y-6">
      <header class="space-y-2">
        <h1 class="text-2xl font-semibold text-neutral-900 dark:text-white">{text()[p.mode][0]}</h1>
        <p class="text-sm leading-6 text-neutral-500 dark:text-neutral-400">{text()[p.mode][1]}</p>
      </header>
      <form
        class="space-y-4"
        onSubmit={(event) => {
          event.preventDefault()
          cmsNavigate(next())
        }}
      >
        <Show when={p.mode === "register" || p.mode === "invite"}>
          <label class="block text-sm font-medium">
            {text().name}
            <input
              class={inputClass}
              name="name"
              autocomplete="name"
              required
              onInvalid={validateInput}
              onInput={clearValidation}
            />
          </label>
        </Show>
        <Show when={p.mode === "login" || p.mode === "register" || p.mode === "forgot" || p.mode === "invite"}>
          <label class="block text-sm font-medium">
            {text().email}
            <input
              class={inputClass}
              name="email"
              type="email"
              autocomplete="email"
              required
              onInvalid={validateInput}
              onInput={clearValidation}
            />
          </label>
        </Show>
        <Show when={p.mode === "login" || p.mode === "register" || p.mode === "reset" || p.mode === "invite"}>
          <label class="block text-sm font-medium">
            {p.mode === "reset" ? text().newPassword : text().password}
            <input
              class={inputClass}
              name="password"
              type="password"
              autocomplete={p.mode === "login" ? "current-password" : "new-password"}
              minlength={8}
              onInvalid={validateInput}
              onInput={clearValidation}
              required
            />
          </label>
        </Show>
        <Show when={p.mode === "2fa"}>
          <label class="block text-sm font-medium">
            {text().code}
            <input
              class={inputClass}
              name="code"
              inputmode="numeric"
              autocomplete="one-time-code"
              pattern="[0-9]{6}"
              maxlength={6}
              placeholder="000000"
              onInvalid={validateInput}
              onInput={clearValidation}
              required
            />
          </label>
        </Show>
        <Show when={p.mode === "login"}>
          <div class="text-right text-sm">
            <button class={linkClass} type="button" onClick={() => cmsNavigate("auth-forgot")}>
              {text().forgotLink}
            </button>
          </div>
        </Show>
        <button
          class="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          type="submit"
        >
          {text()[p.mode][2]}
        </button>
      </form>
      <Show when={p.mode === "login"}>
        <div class="space-y-3">
          <div class="flex items-center gap-3 text-xs text-neutral-400">
            <span class="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
            {text().or}
            <span class="h-px flex-1 bg-neutral-200 dark:bg-white/10" />
          </div>
          <For each={[text().sso, text().google, text().github]}>
            {(label) => (
              <button
                type="button"
                class="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium hover:bg-neutral-50 dark:border-white/10 dark:hover:bg-white/5"
                onClick={() => cmsNavigate("auth-2fa")}
              >
                {label}
              </button>
            )}
          </For>
        </div>
      </Show>
      <div class="space-y-3 text-center text-sm text-neutral-500 dark:text-neutral-400">
        <Show when={p.mode === "login"}>
          <p>
            {text().noAccount}{" "}
            <button type="button" class={linkClass} onClick={() => cmsNavigate("auth-register")}>
              {text().registerLink}
            </button>
          </p>
        </Show>
        <Show when={p.mode === "register"}>
          <p>
            {text().hasAccount}{" "}
            <button type="button" class={linkClass} onClick={() => cmsNavigate("auth-login")}>
              {text().loginLink}
            </button>
          </p>
        </Show>
        <Show
          when={
            p.mode !== "login" && p.mode !== "register" && p.mode !== "session-expired" && p.mode !== "verify-email"
          }
        >
          <button type="button" class={linkClass} onClick={() => cmsNavigate("auth-login")}>
            ← {text().back}
          </button>
        </Show>
        <p class="text-xs">{text().demo}</p>
      </div>
    </div>
  )
}
