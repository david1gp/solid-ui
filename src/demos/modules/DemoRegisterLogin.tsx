import { demoRegisterLoginStateCreate } from "./demoRegisterLoginStateCreate.js"
import { RegisterLoginDemoForm } from "./registerLogin/RegisterLoginDemoForm.jsx"
import { RegisterLoginHeading } from "./registerLogin/RegisterLoginHeading.jsx"
import { RegisterLoginResetDialog } from "./registerLogin/RegisterLoginResetDialog.jsx"
import { RegisterLoginShell } from "./registerLogin/RegisterLoginShell.jsx"
import { RegisterLoginSocial } from "./registerLogin/RegisterLoginSocial.jsx"
import { RegisterLoginSwitch } from "./registerLogin/RegisterLoginSwitch.jsx"

export function DemoRegisterLogin() {
  const state = demoRegisterLoginStateCreate()
  return (
    <RegisterLoginShell
      locale={state.locale()}
      onLocaleChange={state.changeLocale}
      languageLabel={state.texts().language}
      privacy={state.texts().privacy}
      legal={state.texts().legal}
      help={state.texts().help}
      overlay={<RegisterLoginResetDialog state={state} />}
    >
      <RegisterLoginHeading
        title={state.mode() === "register" ? state.texts().createAccount : state.texts().welcome}
        description={state.mode() === "register" ? state.texts().registerDescription : state.texts().loginDescription}
      />
      <RegisterLoginDemoForm state={state} />
      <RegisterLoginSocial
        divider={state.mode() === "register" ? state.texts().orSignUp : state.texts().orSignIn}
        continueWith={state.texts().continueWith}
      />
      <RegisterLoginSwitch
        prompt={state.mode() === "register" ? state.texts().hasAccount : state.texts().noAccount}
        label={state.mode() === "register" ? state.texts().signIn : state.texts().signUp}
        onClick={() => state.changeMode(state.mode() === "login" ? "register" : "login")}
      />
    </RegisterLoginShell>
  )
}
