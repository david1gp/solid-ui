import { demoRegisterLoginStateCreate } from "../../../demoRegisterLoginStateCreate.js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsNavigate } from "../../shell/cmsNavigate.js"

export function cmsSimpleAuthStateCreate(mode: "login" | "register" | "forgot") {
  return demoRegisterLoginStateCreate({
    locale: cmsLocale.get,
    initialMode: mode === "register" ? "register" : "login",
    onModeChange: (next) => cmsNavigate(next === "login" ? "auth-login" : "auth-register"),
    onForgot: () => cmsNavigate("auth-forgot"),
    onSuccess: () => cmsNavigate(mode === "register" ? "auth-verify-email" : "auth-2fa"),
    onResetSuccess: () => cmsNavigate("auth-reset"),
  })
}
