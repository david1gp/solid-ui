import type { FooterModernLink } from "./FooterModernLink.js"

/** A titled group of footer links. */
export type FooterModernColumn = {
  title: string
  links: FooterModernLink[]
}
