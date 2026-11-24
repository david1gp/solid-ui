import { expect, test } from "bun:test"
import { demoGroupsCreate } from "../src/app/demos/demoGroupsCreate.js"

test("modules retain registry order within groups and unassigned modules default to Seiten", () => {
  expect(
    demoGroupsCreate("modules", [
      "Bottom-Mobile-Navbar",
      "DemoRegisterLogin",
      "DemoRegisterCi",
      "DemoContact",
      "DemoAppSidebar",
      "DemoSidebarModern",
      "DemoCMS",
      "DemoNavHeader",
      "NavbarHeader-Modern",
      "Footer-Simple",
      "NewModule",
    ]),
  ).toEqual([
    { heading: "Seiten", names: ["DemoRegisterLogin", "DemoRegisterCi", "DemoContact", "DemoCMS", "NewModule"] },
    {
      heading: "Navigation UI",
      names: [
        "Bottom-Mobile-Navbar",
        "DemoAppSidebar",
        "DemoSidebarModern",
        "DemoNavHeader",
        "NavbarHeader-Modern",
        "Footer-Simple",
      ],
    },
  ])
})

test("empty groups are omitted and other categories are not grouped", () => {
  expect(demoGroupsCreate("modules", ["DemoNavHeader"])).toEqual([
    { heading: "Navigation UI", names: ["DemoNavHeader"] },
  ])
  expect(demoGroupsCreate("modules", [])).toEqual([])
  expect(demoGroupsCreate("input", ["DemoInput"])).toEqual([])
})
