import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { demoRegisterLoginTexts } from "../../../demoRegisterLoginTexts.js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsNavigate } from "../../shell/cmsNavigate.js"

export function cmsExtraAuthStateCreate(mode: "reset" | "2fa" | "verify-email" | "invite" | "session-expired") {
  const visible = createSignalObject(false)
  const resent = createSignalObject(false)
  const texts = () => demoRegisterLoginTexts[cmsLocale.get()]
  const text = () =>
    cmsLocale.get() === "de"
      ? ({
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
          invite: [
            "Einladung annehmen",
            "Erstelle dein Konto, um dem Arbeitsbereich beizutreten.",
            "Einladung annehmen",
          ],
          "session-expired": [
            "Sitzung abgelaufen",
            "Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.",
            "Zur Anmeldung",
          ],
          name: "Name",
          email: "E-Mail-Adresse",
          password: "Passwort",
          newPassword: "Neues Passwort",
          code: "Bestätigungscode",
          back: "Zurück zur Anmeldung",
          resend: "E-Mail erneut senden",
          resent: "Demo: Es wurde keine E-Mail gesendet.",
        } as const)
      : ({
          reset: ["New password", "Choose a new password for your account.", "Reset password"],
          "2fa": ["Two-factor authentication", "Enter the six-digit code from your authenticator app.", "Verify code"],
          "verify-email": [
            "Verify your email",
            "Check your inbox and verify your email address. This is a demo; no email will be sent.",
            "Continue to sign in",
          ],
          invite: ["Accept invitation", "Create your account to join the workspace.", "Accept invitation"],
          "session-expired": ["Session expired", "Your session has expired. Please sign in again.", "Go to sign in"],
          name: "Name",
          email: "Email address",
          password: "Password",
          newPassword: "New password",
          code: "Verification code",
          back: "Back to sign in",
          resend: "Resend email",
          resent: "Demo: No email was sent.",
        } as const)
  return {
    visible: visible.get,
    toggleVisible: () => visible.set(!visible.get()),
    resent: resent.get,
    resend: () => resent.set(true),
    texts,
    text,
    submit: (event: SubmitEvent) => {
      event.preventDefault()
      cmsNavigate(mode === "2fa" ? "dashboard" : mode === "invite" ? "auth-verify-email" : "auth-login")
    },
  }
}
