import { CmsAuthTemplate } from "../auth-login/CmsAuthTemplate.js"

export function CmsAuthSessionExpiredView(_props: { id?: string }) {
  return <CmsAuthTemplate mode="session-expired" />
}
