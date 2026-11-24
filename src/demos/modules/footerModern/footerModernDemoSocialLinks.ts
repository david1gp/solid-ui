import { mdiGithub } from "@adaptive-ds/mdi/mdiGithub.js"
import { footerModernNpmIcon } from "./footerModernNpmIcon.js"
import type { FooterModernSocialLink } from "./FooterModernSocialLink.js"

/** The project's own channels: source code on GitHub and the package on npm. */
export const footerModernDemoSocialLinks: FooterModernSocialLink[] = [
  { label: "GitHub", href: "https://github.com/david1gp/solid-ui", icon: mdiGithub },
  { label: "npm", href: "https://www.npmjs.com/package/@adaptive-ds/solid-ui", icon: footerModernNpmIcon },
]
