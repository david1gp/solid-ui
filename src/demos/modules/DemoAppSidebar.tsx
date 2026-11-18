import { mdiAccountGroup } from "@adaptive-ds/mdi/mdiAccountGroup.js"
import { mdiBrightnessAuto } from "@adaptive-ds/mdi/mdiBrightnessAuto.js"
import { mdiClipboardTextOutline } from "@adaptive-ds/mdi/mdiClipboardTextOutline.js"
import { mdiCogOutline } from "@adaptive-ds/mdi/mdiCogOutline.js"
import { mdiFileDocumentOutline } from "@adaptive-ds/mdi/mdiFileDocumentOutline.js"
import { mdiFolderMultipleOutline } from "@adaptive-ds/mdi/mdiFolderMultipleOutline.js"
import { mdiTextBoxOutline } from "@adaptive-ds/mdi/mdiTextBoxOutline.js"
import { mdiWeatherNight } from "@adaptive-ds/mdi/mdiWeatherNight.js"
import { mdiWhiteBalanceSunny } from "@adaptive-ds/mdi/mdiWhiteBalanceSunny.js"
import { createSignal } from "solid-js"
import { AppSidebar } from "#ui/modules/app_sidebar/AppSidebar.jsx"
import type { AppSidebarNavGroup } from "#ui/modules/app_sidebar/AppSidebarNavGroup.js"
import { AppSidebarUserMenu } from "#ui/modules/app_sidebar/AppSidebarUserMenu.jsx"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

const entries = [
  { icon: mdiFolderMultipleOutline, label: "Projekte" },
  { icon: mdiFileDocumentOutline, label: "ISO 27001" },
  { icon: mdiClipboardTextOutline, label: "Ablauf" },
  { icon: mdiTextBoxOutline, label: "Protokolle" },
  { icon: mdiAccountGroup, label: "Kunden" },
  { icon: mdiCogOutline, label: "Einstellungen" },
]

export function DemoAppSidebar() {
  const collapsed = createSignalObject(false)
  const [active, setActive] = createSignal("Projekte")
  const groups = (): AppSidebarNavGroup[] => [
    {
      label: "Navigation",
      items: entries.map((e) => ({ ...e, isActive: active() === e.label, onClick: () => setActive(e.label) })),
    },
    { label: "Projekte", items: [] },
  ]
  return (
    <div class={"flex h-[640px] w-full border border-border rounded-lg overflow-hidden bg-background"}>
      <AppSidebar
        collapsed={collapsed}
        logo={
          <span
            class={
              "flex items-center justify-center size-6 rounded-md bg-black text-white text-sm font-bold dark:bg-white dark:text-black"
            }
          >
            C
          </span>
        }
        brand={
          <>
            Atlas<span class={"text-blue-600"}>.</span>
          </>
        }
        groups={groups()}
        userName={"Max Mustermann"}
        userInitials={"MM"}
        userMenu={
          <AppSidebarUserMenu
            name={"Max Mustermann"}
            email={"max.mustermann@example.com"}
            sections={[
              {
                label: "Darstellung",
                options: [
                  { icon: mdiWhiteBalanceSunny, label: "Hell", selected: true },
                  { icon: mdiWeatherNight, label: "Dunkel" },
                  { icon: mdiBrightnessAuto, label: "System" },
                ],
              },
              { label: "Sprache", options: [{ label: "DE", selected: true }, { label: "EN" }] },
            ]}
            logoutLabel={"Abmelden"}
          />
        }
      />
      <main class={"flex-1 min-w-0 p-8"}>
        <h1 class={"text-2xl font-semibold mb-6"}>{active()}</h1>
        <p class={"text-muted-foreground"}>Noch keine {active()} vorhanden.</p>
      </main>
    </div>
  )
}
