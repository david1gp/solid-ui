import { mdiGithub } from "@adaptive-ds/mdi/mdiGithub.js"
import { mdiInstagram } from "@adaptive-ds/mdi/mdiInstagram.js"
import { mdiLinkedin } from "@adaptive-ds/mdi/mdiLinkedin.js"
import { mdiYoutube } from "@adaptive-ds/mdi/mdiYoutube.js"
import type { FooterSimpleSocialLink } from "./FooterSimpleSocialLink.js"

/** Placeholder social links for the Footer-Simple demo. */
export const footerSimpleDemoSocialLinks: FooterSimpleSocialLink[] = [
  { label: "GitHub", href: "https://github.com/david1gp/solid-ui", icon: mdiGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: mdiLinkedin },
  { label: "Instagram", href: "https://www.instagram.com", icon: mdiInstagram },
  { label: "YouTube", href: "https://www.youtube.com", icon: mdiYoutube },
]
