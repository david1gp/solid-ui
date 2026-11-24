import { Show } from "solid-js"
import { Input } from "#ui/input/input/Input.jsx"
import { RegisterLoginDemoForm } from "../../../registerLogin/RegisterLoginDemoForm.jsx"
import { RegisterLoginField } from "../../../registerLogin/RegisterLoginField.jsx"
import { RegisterLoginHeading } from "../../../registerLogin/RegisterLoginHeading.jsx"
import { RegisterLoginShell } from "../../../registerLogin/RegisterLoginShell.jsx"
import { RegisterLoginSocial } from "../../../registerLogin/RegisterLoginSocial.jsx"
import { RegisterLoginSubmit } from "../../../registerLogin/RegisterLoginSubmit.jsx"
import { RegisterLoginSwitch } from "../../../registerLogin/RegisterLoginSwitch.jsx"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsNavigate } from "../../shell/cmsNavigate.js"
import { cmsSimpleAuthStateCreate } from "./cmsSimpleAuthStateCreate.js"

export function CmsSimpleAuthView(props: { mode: "login" | "register" | "forgot" }) {
  const state = cmsSimpleAuthStateCreate(props.mode)
  return (
    <RegisterLoginShell
      locale={cmsLocale.get()}
      onLocaleChange={(locale) => cmsLocale.set(locale)}
      languageLabel={state.texts().language}
      privacy={state.texts().privacy}
      legal={state.texts().legal}
      help={state.texts().help}
      headerAction={
        <button type="button" class="text-button whitespace-nowrap" onClick={() => cmsNavigate("dashboard")}>
          ← Admin
        </button>
      }
    >
      <Show
        when={props.mode !== "forgot"}
        fallback={
          <>
            <RegisterLoginHeading title={state.texts().reset} description={state.texts().resetDescription} />
            <form class="form-stack" novalidate onSubmit={state.submitReset} onInput={state.clearResetError}>
              <RegisterLoginField id="resetEmail" label={state.texts().email} error={state.resetErrors().resetEmail}>
                <Input
                  id="resetEmail"
                  name="resetEmail"
                  type="email"
                  autocomplete="email"
                  placeholder={state.texts().emailPlaceholder}
                  required
                  aria-invalid={state.resetErrors().resetEmail ? "true" : undefined}
                  aria-describedby={state.resetErrors().resetEmail ? "resetEmailError" : undefined}
                />
              </RegisterLoginField>
              <RegisterLoginSubmit loading={false}>{state.texts().sendLink}</RegisterLoginSubmit>
            </form>
            <p class="!mt-6 text-center">
              <button class="text-button" type="button" onClick={() => cmsNavigate("auth-login")}>
                {cmsLocale.get() === "de" ? "Zurück zur Anmeldung" : "Back to sign in"}
              </button>
            </p>
          </>
        }
      >
        <RegisterLoginHeading
          title={props.mode === "register" ? state.texts().createAccount : state.texts().welcome}
          description={props.mode === "register" ? state.texts().registerDescription : state.texts().loginDescription}
        />
        <RegisterLoginDemoForm state={state} />
        <RegisterLoginSocial
          divider={props.mode === "register" ? state.texts().orSignUp : state.texts().orSignIn}
          continueWith={state.texts().continueWith}
        />
        <RegisterLoginSwitch
          prompt={props.mode === "register" ? state.texts().hasAccount : state.texts().noAccount}
          label={props.mode === "register" ? state.texts().signIn : state.texts().signUp}
          onClick={() => state.changeMode(props.mode === "login" ? "register" : "login")}
        />
      </Show>
    </RegisterLoginShell>
  )
}
