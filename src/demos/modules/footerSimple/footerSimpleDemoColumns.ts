import type { FooterSimpleColumn } from "./FooterSimpleColumn.js"

/** Placeholder link columns for the Footer-Simple demo. */
export const footerSimpleDemoColumns: FooterSimpleColumn[] = [
  {
    title: "Produkt",
    links: [
      { label: "Funktionen", href: "#funktionen" },
      { label: "Preise", href: "#preise" },
      { label: "Integrationen", href: "#integrationen" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Über uns", href: "#ueber-uns" },
      { label: "Karriere", href: "#karriere" },
      { label: "Blog", href: "#blog" },
      { label: "Kontakt", href: "#kontakt" },
    ],
  },
  {
    title: "Ressourcen",
    links: [
      { label: "Dokumentation", href: "#dokumentation" },
      { label: "Hilfe-Center", href: "#hilfe" },
      { label: "Status", href: "#status" },
    ],
  },
]
