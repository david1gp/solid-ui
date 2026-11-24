import { CmsExtraAuthView } from "../auth-login/CmsExtraAuthView.js"

export function CmsAuth2faView(_props: { id?: string }) {
  return <CmsExtraAuthView mode="2fa" />
}
