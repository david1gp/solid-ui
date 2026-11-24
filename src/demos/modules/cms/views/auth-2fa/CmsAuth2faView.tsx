import { CmsAuthTemplate } from "../auth-login/CmsAuthTemplate.js"

export function CmsAuth2faView(_props: { id?: string }) {
  return <CmsAuthTemplate mode="2fa" />
}
