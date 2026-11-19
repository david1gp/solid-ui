import { mdiAccountCogOutline } from "@adaptive-ds/mdi/mdiAccountCogOutline.js"
import { mdiAccountGroup } from "@adaptive-ds/mdi/mdiAccountGroup.js"
import { mdiBrightnessAuto } from "@adaptive-ds/mdi/mdiBrightnessAuto.js"
import { mdiCardAccountDetailsOutline } from "@adaptive-ds/mdi/mdiCardAccountDetailsOutline.js"
import { mdiClipboardTextOutline } from "@adaptive-ds/mdi/mdiClipboardTextOutline.js"
import { mdiCogOutline } from "@adaptive-ds/mdi/mdiCogOutline.js"
import { mdiFileDocumentOutline } from "@adaptive-ds/mdi/mdiFileDocumentOutline.js"
import { mdiFolderMultipleOutline } from "@adaptive-ds/mdi/mdiFolderMultipleOutline.js"
import { mdiFolderOutline } from "@adaptive-ds/mdi/mdiFolderOutline.js"
import { mdiPaletteOutline } from "@adaptive-ds/mdi/mdiPaletteOutline.js"
import { mdiPaletteSwatchOutline } from "@adaptive-ds/mdi/mdiPaletteSwatchOutline.js"
import { mdiTextBoxOutline } from "@adaptive-ds/mdi/mdiTextBoxOutline.js"
import { mdiTranslate } from "@adaptive-ds/mdi/mdiTranslate.js"
import { mdiWeatherNight } from "@adaptive-ds/mdi/mdiWeatherNight.js"
import { mdiWhiteBalanceSunny } from "@adaptive-ds/mdi/mdiWhiteBalanceSunny.js"
import { createRoot, createSignal, type JSXElement, Match, onMount, Show, Switch } from "solid-js"
import { Input } from "#ui/input/input/Input.jsx"
import { themeInit, themeSet, themeSignal } from "#ui/interactive/theme/themeSignal.js"
import { themeVariant } from "#ui/interactive/theme/themeVariant.js"
import { toastAdd } from "#ui/interactive/toast/toastAdd.js"
import { toastDismiss } from "#ui/interactive/toast/toastDismiss.js"
import { AppSettingsNav } from "#ui/modules/app_sidebar/AppSettingsNav.jsx"
import { AppSettingsPanel } from "#ui/modules/app_sidebar/AppSettingsPanel.jsx"
import { AppSettingsSidebar } from "#ui/modules/app_sidebar/AppSettingsSidebar.jsx"
import { AppSidebar } from "#ui/modules/app_sidebar/AppSidebar.jsx"
import { AppSidebarCssAvatar } from "#ui/modules/app_sidebar/AppSidebarCssAvatar.jsx"
import { AppSidebarCssBanner } from "#ui/modules/app_sidebar/AppSidebarCssBanner.jsx"
import { AppSidebarFlag } from "#ui/modules/app_sidebar/AppSidebarFlag.jsx"
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
const settingsPageKey = "settings-page"

const settingsPages = [
  { id: "account", icon: mdiAccountCogOutline, label: "Account-Einstellungen" },
  { id: "personal", icon: mdiCardAccountDetailsOutline, label: "Persönliche Informationen" },
  { id: "appearance", icon: mdiPaletteOutline, label: "Erscheinungsbild" },
] as const
type SettingsPageId = (typeof settingsPages)[number]["id"]

const accentColors = [
  { label: "Blau", color: "#2563eb" },
  { label: "Pink", color: "#ec4899" },
  { label: "Gelb", color: "#eab308" },
  { label: "Grün", color: "#22c55e" },
  { label: "Lila", color: "#8b5cf6" },
]

export function DemoAppSidebar() {
  // Fullscreen demo has no nav ThemeButton, so load the stored theme here for the tiles' selection.
  onMount(themeInit)
  const collapsed = createSignalObject(false)
  const accentColor = createSignalObject(accentColors[0]!.color)
  const language = createSignalObject("DE")
  const firstName = createSignalObject("Max")
  const lastName = createSignalObject("Mustermann")
  const email = createSignalObject("max.mustermann@example.com")
  const fullName = () => [firstName.get(), lastName.get()].filter(Boolean).join(" ")
  const initials = () => `${firstName.get().charAt(0)}${lastName.get().charAt(0)}`.toUpperCase()
  const settingsPage = createSignalObject<SettingsPageId>("account")
  const settingsPageLabel = () => settingsPages.find((page) => page.id === settingsPage.get())?.label
  const projects = createSignalObject([1, 2, 3, 4, 5].map((n) => ({ id: `project-${n}`, label: `Projekt ${n}` })))
  let nextProject = 6
  const newProjectId = createSignalObject<string | undefined>(undefined)
  const projectById = (id: string) => projects.get().find((project) => project.id === id)
  const renameProject = (id: string, label: string) =>
    projects.set(projects.get().map((project) => (project.id === id ? { ...project, label } : project)))
  const sections: AppSidebarUserMenuSection[] = [
    {
      label: "Darstellung",
      icon: mdiPaletteOutline,
      options: (
        [
          { icon: mdiWhiteBalanceSunny, label: "Hell", preview: "light", theme: themeVariant.light },
          { icon: mdiWeatherNight, label: "Dunkel", preview: "dark", theme: themeVariant.dark },
          { icon: mdiBrightnessAuto, label: "System", preview: "system", theme: themeVariant.os },
        ] as const
      ).map(({ theme, ...option }) => ({
        ...option,
        get selected() {
          return themeSignal.get() === theme
        },
        onClick: () => themeSet(theme, true),
      })),
    },
    {
      label: "Akzentfarbe",
      icon: mdiPaletteSwatchOutline,
      options: accentColors.map((c) => ({
        ...c,
        get selected() {
          return accentColor.get() === c.color
        },
        onClick: () => accentColor.set(c.color),
      })),
    },
    {
      label: "Sprache",
      icon: mdiTranslate,
      options: (["DE", "EN"] as const).map((label) => ({
        label,
        get leading() {
          return <AppSidebarFlag language={label.toLowerCase() as "de" | "en"} />
        },
        get selected() {
          return language.get() === label
        },
        onClick: () => language.set(label),
      })),
    },
  ]
  const settingsOpen = createSignalObject(false)
  const [active, setActive] = createSignal("Projekte")
  const deleteProject = (id: string) => {
    const current = projects.get()
    const index = current.findIndex((project) => project.id === id)
    const project = current[index]
    if (!project) return
    const wasActive = !settingsOpen.get() && active() === id
    projects.set(current.filter((item) => item.id !== id))
    if (wasActive) setActive((current[index + 1] ?? current[index - 1])?.id ?? entries[0]!.label)
    // The toast content is created in an event handler, so give it an owner and dispose it with the toast.
    let disposeToast = () => {}
    const undoButton = createRoot((dispose) => {
      disposeToast = dispose
      return (
        <button
          type={"button"}
          class={"underline font-medium cursor-pointer"}
          onClick={() => {
            const restored = [...projects.get()]
            restored.splice(Math.min(index, restored.length), 0, project)
            projects.set(restored)
            if (wasActive) {
              setActive(id)
              settingsOpen.set(false)
            }
            toastDismiss(toastId)
          }}
        >
          Rückgängig
        </button>
      )
    })
    const toastId = toastAdd({ title: `Projekt „${project.label}“ gelöscht`, duration: 6000, children: undoButton })
    setTimeout(disposeToast, 7000)
  }
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
          label: `${settingsLabel} 1-3 (Mobil)`,
          isActive: settingsOpen.get(),
          onClick: () => settingsOpen.set(!settingsOpen.get()),
        },
        {
          icon: mdiCogOutline,
          label: `${settingsLabel} 4+`,
          isActive: !settingsOpen.get() && active() === settingsPageKey,
          onClick: () => {
            setActive(settingsPageKey)
            settingsOpen.set(false)
          },
        },
      ],
    },
    {
      label: "Projekte",
      collapsible: true,
      onReorder: (from, to) => {
        const reordered = [...projects.get()]
        const [item] = reordered.splice(from, 1)
        if (item === undefined) return
        reordered.splice(to, 0, item)
        projects.set(reordered)
      },
      addItem: {
        label: "Neues Projekt",
        onAdd: () => {
          const n = nextProject++
          const project = { id: `project-${n}`, label: `Projekt ${n}` }
          newProjectId.set(project.id)
          projects.set([...projects.get(), project])
          setActive(project.id)
          settingsOpen.set(false)
          // autoEdit only applies on first render; reset so reopening the drawer doesn't re-enter rename mode
          queueMicrotask(() => newProjectId.set(undefined))
        },
      },
      items: projects.get().map(({ id, label }) => ({
        id,
        icon: mdiFolderOutline,
        label,
        isActive: !settingsOpen.get() && active() === id,
        autoEdit: newProjectId.get() === id,
        onRename: (name: string) => renameProject(id, name),
        onDelete: () => deleteProject(id),
        onClick: () => {
          setActive(id)
          settingsOpen.set(false)
        },
      })),
    },
  ]
  return (
    <div class={"flex flex-1 h-0 min-h-[480px] w-full overflow-hidden bg-background"}>
      <div class={"relative flex shrink-0"}>
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
          userName={fullName()}
          userInitials={initials()}
          userAvatar={<AppSidebarCssAvatar />}
          userMenu={
            <AppSidebarUserMenu
              name={fullName()}
              email={email.get()}
              userAvatar={<AppSidebarCssAvatar />}
              logoutLabel={"Abmelden"}
            />
          }
        />
        <AppSettingsSidebar open={settingsOpen} title={settingsLabel}>
          <AppSettingsPanel
            name={fullName()}
            email={email.get()}
            userAvatar={<AppSidebarCssAvatar />}
            banner={<AppSidebarCssBanner accentColor={accentColor.get()} />}
            sections={sections}
            logoutLabel={"Abmelden"}
            logoutPlacement={"bottom"}
          />
        </AppSettingsSidebar>
      </div>
      <Show when={active() === settingsPageKey}>
        <AppSettingsNav
          title={settingsLabel}
          name={fullName()}
          email={email.get()}
          userAvatar={<AppSidebarCssAvatar />}
          accentColor={accentColor.get()}
          items={settingsPages.map((page) => ({
            icon: page.icon,
            label: page.label,
            get isActive() {
              return settingsPage.get() === page.id
            },
            onClick: () => settingsPage.set(page.id),
          }))}
          logoutLabel={"Abmelden"}
        />
      </Show>
      <main class={"flex-1 min-w-0 p-8 overflow-y-auto"}>
        <Show
          when={active() === settingsPageKey}
          fallback={
            <>
              <h1 class={"text-2xl font-semibold mb-6"}>{projectById(active())?.label ?? active()}</h1>
              <p class={"text-muted-foreground"}>
                {projectById(active())
                  ? `Platzhalter für ${projectById(active())?.label}. Doppelklick oder F2 in der Sidebar zum Umbenennen.`
                  : `Noch keine ${active()} vorhanden.`}
              </p>
            </>
          }
        >
          <h1 class={"text-2xl font-semibold mb-6"}>{settingsPageLabel()}</h1>
          <Switch>
            <Match when={settingsPage.get() === "account"}>
              <div class={"flex flex-col gap-3 max-w-2xl"}>
                <SettingsCard>
                  <InfoRow label={"E-Mail-Adresse"} value={email.get()} />
                  <InfoRow label={"Benutzername"} value={email.get().split("@")[0] ?? ""} />
                  <InfoRow label={"Mitglied seit"} value={"März 2024"} />
                </SettingsCard>
                <AppSettingsPanel sections={sections.filter((section) => section.label === "Sprache")} />
              </div>
            </Match>
            <Match when={settingsPage.get() === "personal"}>
              <div class={"flex flex-col gap-3 max-w-2xl"}>
                <SettingsCard>
                  <div class={"grid gap-4 sm:grid-cols-2"}>
                    <Field label={"Vorname"} for={"settings-first-name"}>
                      <Input
                        id={"settings-first-name"}
                        value={firstName.get()}
                        onInput={(e) => firstName.set(e.currentTarget.value)}
                      />
                    </Field>
                    <Field label={"Nachname"} for={"settings-last-name"}>
                      <Input
                        id={"settings-last-name"}
                        value={lastName.get()}
                        onInput={(e) => lastName.set(e.currentTarget.value)}
                      />
                    </Field>
                    <Field label={"E-Mail-Adresse"} for={"settings-email"} class={"sm:col-span-2"}>
                      <Input
                        id={"settings-email"}
                        type={"email"}
                        value={email.get()}
                        onInput={(e) => email.set(e.currentTarget.value)}
                      />
                    </Field>
                  </div>
                </SettingsCard>
              </div>
            </Match>
            <Match when={settingsPage.get() === "appearance"}>
              <AppSettingsPanel
                class={"max-w-2xl"}
                sections={sections.filter((section) => section.label !== "Sprache")}
              />
            </Match>
          </Switch>
        </Show>
      </main>
    </div>
  )
}

function SettingsCard(p: { children: JSXElement }) {
  return (
    <div class={"p-4 rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-white/5 dark:bg-neutral-800/60"}>
      {p.children}
    </div>
  )
}

function InfoRow(p: { label: string; value: string }) {
  return (
    <div class={"flex items-center justify-between gap-4 py-2 text-sm border-b border-border last:border-b-0"}>
      <span class={"text-neutral-500 dark:text-neutral-400"}>{p.label}</span>
      <span class={"font-medium truncate"}>{p.value}</span>
    </div>
  )
}

function Field(p: { label: string; for: string; class?: string; children: JSXElement }) {
  return (
    <div class={`flex flex-col gap-1.5 text-sm font-medium ${p.class ?? ""}`}>
      <label for={p.for}>{p.label}</label>
      {p.children}
    </div>
  )
}
