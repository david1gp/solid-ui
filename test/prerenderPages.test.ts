import { expect, test } from "bun:test"
import { getPrerenderPages } from "../src/lib/prerenderPages.js"

test("prerender pages use the catalog route for the bottom mobile navbar", () => {
  const paths = getPrerenderPages().map((page) => page.path)
  expect(paths).toContain("/modules/Bottom-Mobile-Navbar")
  expect(paths).toContain("/modules/DemoAppSidebar")
  expect(paths).not.toContain("/modules/DemoBottomMobileNavbar")
})

test("prerender pages use the catalog route for NavbarHeader-Modern", () => {
  const paths = getPrerenderPages().map((page) => page.path)
  expect(paths).toContain("/modules/NavbarHeader-Modern")
  expect(paths).not.toContain("/modules/DemoNavbarHeaderModern")
})

test("prerender pages use the catalog routes for ContactModern and Footer-Simple", () => {
  const paths = getPrerenderPages().map((page) => page.path)
  expect(paths).toContain("/modules/ContactModern")
  expect(paths).toContain("/modules/Footer-Simple")
  expect(paths).not.toContain("/modules/DemoContactModern")
  expect(paths).not.toContain("/modules/DemoFooterSimple")
})
