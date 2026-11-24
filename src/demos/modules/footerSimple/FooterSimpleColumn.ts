import type { FooterSimpleLink } from "./FooterSimpleLink.js"

/** A titled group of footer links. */
export type FooterSimpleColumn = {
  title: string
  links: FooterSimpleLink[]
}
