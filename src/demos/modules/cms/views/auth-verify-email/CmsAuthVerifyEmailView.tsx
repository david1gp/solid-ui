import { CmsExtraAuthView } from "../auth-login/CmsExtraAuthView.js"

export function CmsAuthVerifyEmailView(_props: { id?: string }) {
  return <CmsExtraAuthView mode="verify-email" />
}
