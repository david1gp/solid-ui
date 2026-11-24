import { CmsExtraAuthView } from "../auth-login/CmsExtraAuthView.js"

export function CmsAuthSessionExpiredView(_props: { id?: string }) {
  return <CmsExtraAuthView mode="session-expired" />
}
