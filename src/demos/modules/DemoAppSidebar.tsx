import { mdiAccountGroup } from "@adaptive-ds/mdi/mdiAccountGroup.js"
import { mdiBrightnessAuto } from "@adaptive-ds/mdi/mdiBrightnessAuto.js"
import { mdiClipboardTextOutline } from "@adaptive-ds/mdi/mdiClipboardTextOutline.js"
import { mdiCogOutline } from "@adaptive-ds/mdi/mdiCogOutline.js"
import { mdiFileDocumentOutline } from "@adaptive-ds/mdi/mdiFileDocumentOutline.js"
import { mdiFolderMultipleOutline } from "@adaptive-ds/mdi/mdiFolderMultipleOutline.js"
import { mdiPaletteOutline } from "@adaptive-ds/mdi/mdiPaletteOutline.js"
import { mdiPaletteSwatchOutline } from "@adaptive-ds/mdi/mdiPaletteSwatchOutline.js"
import { mdiTextBoxOutline } from "@adaptive-ds/mdi/mdiTextBoxOutline.js"
import { mdiTranslate } from "@adaptive-ds/mdi/mdiTranslate.js"
import { mdiWeatherNight } from "@adaptive-ds/mdi/mdiWeatherNight.js"
import { mdiWhiteBalanceSunny } from "@adaptive-ds/mdi/mdiWhiteBalanceSunny.js"
import { createSignal } from "solid-js"
import { AppSettingsPanel } from "#ui/modules/app_sidebar/AppSettingsPanel.jsx"
import { AppSettingsSidebar } from "#ui/modules/app_sidebar/AppSettingsSidebar.jsx"
import { AppSidebar } from "#ui/modules/app_sidebar/AppSidebar.jsx"
import type { AppSidebarNavGroup } from "#ui/modules/app_sidebar/AppSidebarNavGroup.js"
import { AppSidebarUserMenu, type AppSidebarUserMenuSection } from "#ui/modules/app_sidebar/AppSidebarUserMenu.jsx"
import { createSignalObject } from "#ui/utils/createSignalObject.js"

const entries = [
  { icon: mdiFolderMultipleOutline, label: "Projekte" },
  { icon: mdiFileDocumentOutline, label: "ISO 27001" },
  { icon: mdiClipboardTextOutline, label: "Ablauf" },
  { icon: mdiTextBoxOutline, label: "Protokolle" },
  { icon: mdiAccountGroup, label: "Kunden" },
]

const settingsLabel = "Einstellungen"

const accentColors = [
  { label: "Blau", color: "#2563eb" },
  { label: "Pink", color: "#ec4899" },
  { label: "Gelb", color: "#eab308" },
  { label: "Grün", color: "#22c55e" },
  { label: "Lila", color: "#8b5cf6" },
]

const appearanceSection: AppSidebarUserMenuSection = {
  label: "Darstellung",
  icon: mdiPaletteOutline,
  options: [
    { icon: mdiWhiteBalanceSunny, label: "Hell", preview: "light", selected: true },
    { icon: mdiWeatherNight, label: "Dunkel", preview: "dark" },
    { icon: mdiBrightnessAuto, label: "System", preview: "system" },
  ],
}

const languageSection: AppSidebarUserMenuSection = {
  label: "Sprache",
  icon: mdiTranslate,
  options: [{ label: "DE", selected: true }, { label: "EN" }],
}

export function DemoAppSidebar() {
  const collapsed = createSignalObject(false)
  const accentColor = createSignalObject(accentColors[0]!.color)
  const sections: AppSidebarUserMenuSection[] = [
    appearanceSection,
    {
      label: "Akzentfarbe",
      icon: mdiPaletteSwatchOutline,
      options: accentColors.map((c, i) => ({ ...c, selected: i === 0, onClick: () => accentColor.set(c.color) })),
    },
    languageSection,
  ]
  const settingsOpen = createSignalObject(false)
  const [active, setActive] = createSignal("Projekte")
  const groups = (): AppSidebarNavGroup[] => [
    {
      label: "Navigation",
      items: [
        ...entries.map((e) => ({
          ...e,
          isActive: !settingsOpen.get() && active() === e.label,
          onClick: () => {
            setActive(e.label)
            settingsOpen.set(false)
          },
        })),
        {
          icon: mdiCogOutline,
          label: settingsLabel,
          isActive: settingsOpen.get(),
          onClick: () => settingsOpen.set(!settingsOpen.get()),
        },
      ],
    },
    { label: "Projekte", items: [] },
  ]
  return (
    <div class={"flex h-[640px] w-full border border-border rounded-lg overflow-hidden bg-background"}>
      <div class={"relative flex shrink-0 h-full"}>
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
          accentColor={accentColor.get()}
          userName={"Max Mustermann"}
          userInitials={"MM"}
          userMenu={
            <AppSidebarUserMenu name={"Max Mustermann"} email={"max.mustermann@example.com"} logoutLabel={"Abmelden"} />
          }
        />
        <AppSettingsSidebar open={settingsOpen} title={settingsLabel}>
          <AppSettingsPanel
            name={"Max Mustermann"}
            email={"max.mustermann@example.com"}
            sections={sections}
            logoutLabel={"Abmelden"}
          />
        </AppSettingsSidebar>
      </div>
      <main class={"flex-1 min-w-0 p-8 overflow-y-auto"}>
        <h1 class={"text-2xl font-semibold mb-6"}>{active()}</h1>
        <p class={"text-muted-foreground"}>Noch keine {active()} vorhanden.</p>
      </main>
    </div>
  )
}
