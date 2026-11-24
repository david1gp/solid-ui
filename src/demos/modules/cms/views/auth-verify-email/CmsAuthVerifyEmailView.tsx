import { CmsAuthTemplate } from "../auth-login/CmsAuthTemplate.js"

export function CmsAuthVerifyEmailView(_props: { id?: string }) {
  return <CmsAuthTemplate mode="verify-email" />
}
