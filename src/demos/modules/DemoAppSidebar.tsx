import { mdiAccountCogOutline } from "@adaptive-ds/mdi/mdiAccountCogOutline.js"
import { mdiAccountGroup } from "@adaptive-ds/mdi/mdiAccountGroup.js"
import { mdiBrightnessAuto } from "@adaptive-ds/mdi/mdiBrightnessAuto.js"
import { mdiCameraOutline } from "@adaptive-ds/mdi/mdiCameraOutline.js"
import { mdiCardAccountDetailsOutline } from "@adaptive-ds/mdi/mdiCardAccountDetailsOutline.js"
import { mdiCellphone } from "@adaptive-ds/mdi/mdiCellphone.js"
import { mdiClipboardTextOutline } from "@adaptive-ds/mdi/mdiClipboardTextOutline.js"
import { mdiCogOutline } from "@adaptive-ds/mdi/mdiCogOutline.js"
import { mdiFileDocumentOutline } from "@adaptive-ds/mdi/mdiFileDocumentOutline.js"
import { mdiFolderMultipleOutline } from "@adaptive-ds/mdi/mdiFolderMultipleOutline.js"
import { mdiFolderOutline } from "@adaptive-ds/mdi/mdiFolderOutline.js"
import { mdiLaptop } from "@adaptive-ds/mdi/mdiLaptop.js"
import { mdiLockReset } from "@adaptive-ds/mdi/mdiLockReset.js"
import { mdiPaletteOutline } from "@adaptive-ds/mdi/mdiPaletteOutline.js"
import { mdiPaletteSwatchOutline } from "@adaptive-ds/mdi/mdiPaletteSwatchOutline.js"
import { mdiShieldAccountOutline } from "@adaptive-ds/mdi/mdiShieldAccountOutline.js"
import { mdiTextBoxOutline } from "@adaptive-ds/mdi/mdiTextBoxOutline.js"
import { mdiTranslate } from "@adaptive-ds/mdi/mdiTranslate.js"
import { mdiWeatherNight } from "@adaptive-ds/mdi/mdiWeatherNight.js"
import { mdiWhiteBalanceSunny } from "@adaptive-ds/mdi/mdiWhiteBalanceSunny.js"
import { createRoot, createSignal, For, type Element as JSXElement, Match, onSettled, Show, Switch } from "solid-js"
import { DemoShapesBackdrop } from "#src/app/demos/DemoShapesBackdrop.jsx"
import { Input } from "#ui/input/input/Input.jsx"
import { Button } from "#ui/interactive/button/Button.jsx"
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
import { AppSidebarUserMenu, type AppSidebarUserMenuSection } from "#ui/modules/app_sidebar/AppSidebarUserMenu.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { demoAppSidebarGroupsCreate } from "./demoAppSidebarGroupsCreate.js"
import { demoAppSidebarMobileCollapseCreate } from "./demoAppSidebarMobileCollapseCreate.js"
import "./DemoAppSidebar.css"

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
  { id: "profile", icon: mdiCardAccountDetailsOutline, label: "Profil" },
  { id: "account", icon: mdiAccountCogOutline, label: "Konto & Sicherheit" },
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
  onSettled(themeInit)
  const settingsOpen = createSignalObject(false)
  const { automaticMotion, collapsed } = demoAppSidebarMobileCollapseCreate(settingsOpen)
  const accentColor = createSignalObject(accentColors[0]!.color)
  const language = createSignalObject("DE")
  const initial = {
    firstName: "Max",
    lastName: "Mustermann",
    username: "maxmustermann",
    phone: "+49 170 1234567",
    email: "max.mustermann@example.com",
  }
  const firstName = createSignalObject(initial.firstName)
  const lastName = createSignalObject(initial.lastName)
  const username = createSignalObject(initial.username)
  const phone = createSignalObject(initial.phone)
  const email = createSignalObject(initial.email)
  // Settings forms edit drafts; nothing is applied until "Speichern".
  const firstNameDraft = createSignalObject(initial.firstName)
  const lastNameDraft = createSignalObject(initial.lastName)
  const phoneDraft = createSignalObject(initial.phone)
  const profileDirty = () =>
    firstNameDraft.get() !== firstName.get() ||
    lastNameDraft.get() !== lastName.get() ||
    phoneDraft.get() !== phone.get()
  const discardProfile = () => {
    firstNameDraft.set(firstName.get())
    lastNameDraft.set(lastName.get())
    phoneDraft.set(phone.get())
  }
  const saveProfile = () => {
    if (!profileDirty()) return
    const nextFirstName = firstNameDraft.get().trim()
    const nextLastName = lastNameDraft.get().trim()
    const nextPhone = phoneDraft.get().trim()
    firstName.set(nextFirstName)
    lastName.set(nextLastName)
    phone.set(nextPhone)
    firstNameDraft.set(nextFirstName)
    lastNameDraft.set(nextLastName)
    phoneDraft.set(nextPhone)
    toastAdd({ title: "Profil gespeichert", duration: 3000 })
  }
  const usernameDraft = createSignalObject(initial.username)
  const emailDraft = createSignalObject(initial.email)
  const pendingEmail = createSignalObject<string | undefined>(undefined)
  const accountDirty = () => usernameDraft.get() !== username.get() || emailDraft.get() !== email.get()
  const discardAccount = () => {
    usernameDraft.set(username.get())
    emailDraft.set(email.get())
  }
  const saveAccount = () => {
    if (!accountDirty()) return
    const nextEmail = emailDraft.get().trim()
    if (nextEmail !== email.get() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      toastAdd({ title: "Bitte eine gültige E-Mail-Adresse eingeben", duration: 4000 })
      return
    }
    const nextUsername = usernameDraft.get().trim()
    username.set(nextUsername)
    usernameDraft.set(nextUsername)
    // A new e-mail only takes effect once confirmed via the link sent to it.
    if (nextEmail !== email.get()) {
      pendingEmail.set(nextEmail)
      toastAdd({ title: `Bestätigungslink an ${nextEmail} gesendet`, duration: 4000 })
    } else {
      toastAdd({ title: "Konto gespeichert", duration: 3000 })
    }
    emailDraft.set(email.get())
  }
  const confirmEmail = () => {
    const pending = pendingEmail.get()
    if (!pending) return
    email.set(pending)
    emailDraft.set(pending)
    pendingEmail.set(undefined)
    toastAdd({ title: "E-Mail-Adresse bestätigt", duration: 3000 })
  }
  const passwordFormOpen = createSignalObject(false)
  const passwordCurrent = createSignalObject("")
  const passwordNew = createSignalObject("")
  const passwordConfirm = createSignalObject("")
  const passwordError = createSignalObject<string | undefined>(undefined)
  const passwordChangedAt = createSignalObject("vor 3 Monaten")
  const closePasswordForm = () => {
    passwordFormOpen.set(false)
    passwordCurrent.set("")
    passwordNew.set("")
    passwordConfirm.set("")
    passwordError.set(undefined)
  }
  const changePassword = () => {
    if (!passwordCurrent.get()) return passwordError.set("Bitte das aktuelle Passwort eingeben.")
    if (passwordNew.get().length < 8) return passwordError.set("Das neue Passwort muss mindestens 8 Zeichen haben.")
    if (passwordNew.get() !== passwordConfirm.get()) return passwordError.set("Die Passwörter stimmen nicht überein.")
    closePasswordForm()
    passwordChangedAt.set("gerade eben")
    toastAdd({ title: "Passwort geändert", duration: 3000 })
  }
  const twoFactor = createSignalObject(false)
  const sessions = createSignalObject([
    { id: "s1", icon: mdiLaptop, device: "Chrome auf Linux", location: "Berlin · Jetzt aktiv", current: true },
    { id: "s2", icon: mdiCellphone, device: "Safari auf iPhone", location: "Hamburg · vor 2 Tagen", current: false },
  ])
  const endSession = (id: string) => {
    sessions.set(sessions.get().filter((session) => session.id !== id))
    toastAdd({ title: "Sitzung abgemeldet", duration: 3000 })
  }
  const fullName = () => [firstName.get(), lastName.get()].filter(Boolean).join(" ")
  const initials = () => `${firstName.get().charAt(0)}${lastName.get().charAt(0)}`.toUpperCase()
  const settingsPage = createSignalObject<SettingsPageId>("profile")
  const settingsPageLabel = () => settingsPages.find((page) => page.id === settingsPage.get())?.label
  const projects = createSignalObject([1, 2, 3, 4, 5].map((n) => ({ id: `project-${n}`, label: `Projekt ${n}` })))
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
      hint: "Muss manuell aktiviert werden",
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
  const groups = demoAppSidebarGroupsCreate({
    entries,
    settingsIcon: mdiCogOutline,
    projectIcon: mdiFolderOutline,
    settingsLabel,
    settingsPageKey,
    settingsOpen,
    active,
    setActive,
    projects,
    newProjectId,
    renameProject,
    deleteProject,
  })
  return (
    <div class={"relative isolate flex h-dvh w-full shrink-0 overflow-clip bg-background dark:bg-[#222326]"}>
      <DemoShapesBackdrop />
      <div class={"demo-app-sidebar-dock relative flex shrink-0"}>
        <AppSidebar
          class={automaticMotion() ? "demo-app-sidebar-rail demo-app-sidebar-rail-auto" : "demo-app-sidebar-rail"}
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
          groups={groups}
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
        <AppSettingsSidebar open={settingsOpen} title={settingsLabel} class={"demo-app-sidebar-settings"}>
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
            <Match when={settingsPage.get() === "profile"}>
              <form
                class={"flex flex-col gap-3 max-w-2xl"}
                onSubmit={(e) => {
                  e.preventDefault()
                  saveProfile()
                }}
              >
                <SettingsCard>
                  <div class={"flex items-center gap-4 pb-4 mb-4 border-b border-neutral-200 dark:border-white/10"}>
                    <div class={"size-16 shrink-0 rounded-full overflow-hidden"}>
                      <AppSidebarCssAvatar />
                    </div>
                    <div class={"flex flex-col gap-1 min-w-0"}>
                      <span class={"text-sm font-medium"}>Profilbild</span>
                      <span class={"text-xs text-neutral-500 dark:text-neutral-400"}>JPG oder PNG, max. 2 MB</span>
                    </div>
                    <Button
                      variant={"outline"}
                      class={"ml-auto gap-2 text-sm"}
                      onClick={() => toastAdd({ title: "Bild-Upload ist in der Demo nicht verfügbar", duration: 3000 })}
                    >
                      <Icon path={mdiCameraOutline} class={"size-4"} />
                      Bild ändern
                    </Button>
                  </div>
                  <div class={"grid gap-4 sm:grid-cols-2"}>
                    <Field label={"Vorname"} for={"settings-first-name"}>
                      <Input
                        id={"settings-first-name"}
                        autocomplete={"given-name"}
                        value={firstNameDraft.get()}
                        onInput={(e) => firstNameDraft.set(e.currentTarget.value)}
                      />
                    </Field>
                    <Field label={"Nachname"} for={"settings-last-name"}>
                      <Input
                        id={"settings-last-name"}
                        autocomplete={"family-name"}
                        value={lastNameDraft.get()}
                        onInput={(e) => lastNameDraft.set(e.currentTarget.value)}
                      />
                    </Field>
                    <Field label={"Telefonnummer"} for={"settings-phone"} class={"sm:col-span-2"}>
                      <Input
                        id={"settings-phone"}
                        type={"tel"}
                        autocomplete={"tel"}
                        value={phoneDraft.get()}
                        onInput={(e) => phoneDraft.set(e.currentTarget.value)}
                      />
                    </Field>
                  </div>
                </SettingsCard>
                <SaveBar dirty={profileDirty()} onDiscard={discardProfile} />
              </form>
            </Match>
            <Match when={settingsPage.get() === "account"}>
              <div class={"flex flex-col gap-6 max-w-2xl"}>
                <form
                  class={"flex flex-col gap-3"}
                  // Own German validation message instead of the browser's (English) native popup.
                  novalidate
                  onSubmit={(e) => {
                    e.preventDefault()
                    saveAccount()
                  }}
                >
                  <SectionTitle>Konto</SectionTitle>
                  <SettingsCard>
                    <div class={"grid gap-4"}>
                      <Field label={"Benutzername"} for={"settings-username"}>
                        <Input
                          id={"settings-username"}
                          autocomplete={"username"}
                          value={usernameDraft.get()}
                          onInput={(e) => usernameDraft.set(e.currentTarget.value)}
                        />
                      </Field>
                      <Field label={"E-Mail-Adresse"} for={"settings-email"}>
                        <Input
                          id={"settings-email"}
                          type={"email"}
                          autocomplete={"email"}
                          value={emailDraft.get()}
                          onInput={(e) => emailDraft.set(e.currentTarget.value)}
                        />
                        <Show
                          when={pendingEmail.get()}
                          fallback={
                            <span class={"text-xs font-normal text-neutral-500 dark:text-neutral-400"}>
                              Änderungen werden erst nach Bestätigung per E-Mail wirksam.
                            </span>
                          }
                        >
                          {(pending) => (
                            <div
                              class={
                                "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-normal text-amber-700 dark:text-amber-400"
                              }
                            >
                              <span>
                                Bestätigung ausstehend: Wir haben einen Link an <strong>{pending()}</strong> gesendet.
                              </span>
                              <button
                                type={"button"}
                                class={"underline cursor-pointer"}
                                onClick={() =>
                                  toastAdd({ title: `Link erneut an ${pending()} gesendet`, duration: 3000 })
                                }
                              >
                                Erneut senden
                              </button>
                              <button type={"button"} class={"underline cursor-pointer"} onClick={confirmEmail}>
                                Bestätigen (Demo)
                              </button>
                              <button
                                type={"button"}
                                class={"underline cursor-pointer"}
                                onClick={() => pendingEmail.set(undefined)}
                              >
                                Abbrechen
                              </button>
                            </div>
                          )}
                        </Show>
                      </Field>
                    </div>
                  </SettingsCard>
                  <SaveBar dirty={accountDirty()} onDiscard={discardAccount} />
                </form>
                <div class={"flex flex-col gap-3"}>
                  <SectionTitle>Sicherheit</SectionTitle>
                  <SettingsCard>
                    <SettingsRow
                      icon={mdiLockReset}
                      title={"Passwort"}
                      description={`Zuletzt geändert: ${passwordChangedAt.get()}`}
                      action={
                        <Show when={!passwordFormOpen.get()}>
                          <Button variant={"outline"} class={"text-sm"} onClick={() => passwordFormOpen.set(true)}>
                            Passwort ändern
                          </Button>
                        </Show>
                      }
                    />
                    <Show when={passwordFormOpen.get()}>
                      <form
                        class={"grid gap-4 pt-2 pb-4 border-b border-neutral-200 dark:border-white/10"}
                        onSubmit={(e) => {
                          e.preventDefault()
                          changePassword()
                        }}
                      >
                        <Field label={"Aktuelles Passwort"} for={"settings-password-current"}>
                          <Input
                            id={"settings-password-current"}
                            type={"password"}
                            autocomplete={"current-password"}
                            value={passwordCurrent.get()}
                            onInput={(e) => passwordCurrent.set(e.currentTarget.value)}
                          />
                        </Field>
                        <div class={"grid gap-4 sm:grid-cols-2"}>
                          <Field label={"Neues Passwort"} for={"settings-password-new"}>
                            <Input
                              id={"settings-password-new"}
                              type={"password"}
                              autocomplete={"new-password"}
                              value={passwordNew.get()}
                              onInput={(e) => passwordNew.set(e.currentTarget.value)}
                            />
                          </Field>
                          <Field label={"Neues Passwort bestätigen"} for={"settings-password-confirm"}>
                            <Input
                              id={"settings-password-confirm"}
                              type={"password"}
                              autocomplete={"new-password"}
                              value={passwordConfirm.get()}
                              onInput={(e) => passwordConfirm.set(e.currentTarget.value)}
                            />
                          </Field>
                        </div>
                        <Show
                          when={passwordError.get()}
                          fallback={
                            <span class={"text-xs text-neutral-500 dark:text-neutral-400"}>Mindestens 8 Zeichen.</span>
                          }
                        >
                          <span role={"alert"} class={"text-xs text-red-600 dark:text-red-400"}>
                            {passwordError.get()}
                          </span>
                        </Show>
                        <div class={"flex justify-end gap-2"}>
                          <Button variant={"ghost"} class={"text-sm"} onClick={closePasswordForm}>
                            Abbrechen
                          </Button>
                          <Button type={"submit"} variant={"contrast"} class={"text-sm"}>
                            Passwort aktualisieren
                          </Button>
                        </div>
                      </form>
                    </Show>
                    <SettingsRow
                      icon={mdiShieldAccountOutline}
                      title={"Zwei-Faktor-Authentifizierung"}
                      description={
                        twoFactor.get()
                          ? "Aktiv – Code per Authenticator-App"
                          : "Nicht aktiv – empfohlen für mehr Sicherheit"
                      }
                      action={
                        <Button
                          variant={"outline"}
                          class={"text-sm"}
                          onClick={() => {
                            twoFactor.set(!twoFactor.get())
                            toastAdd({
                              title: twoFactor.get() ? "2FA aktiviert" : "2FA deaktiviert",
                              duration: 3000,
                            })
                          }}
                        >
                          {twoFactor.get() ? "Deaktivieren" : "Aktivieren"}
                        </Button>
                      }
                    />
                  </SettingsCard>
                </div>
                <div class={"flex flex-col gap-3"}>
                  <SectionTitle>Aktive Sitzungen</SectionTitle>
                  <SettingsCard>
                    <For each={sessions.get()}>
                      {(session) => (
                        <SettingsRow
                          icon={session.icon}
                          title={session.device}
                          description={session.current ? `${session.location} · Dieses Gerät` : session.location}
                          action={
                            <Show when={!session.current}>
                              <Button variant={"outlineRed"} class={"text-sm"} onClick={() => endSession(session.id)}>
                                Abmelden
                              </Button>
                            </Show>
                          }
                        />
                      )}
                    </For>
                  </SettingsCard>
                  <p class={"text-xs text-neutral-500 dark:text-neutral-400"}>Mitglied seit März 2024</p>
                </div>
              </div>
            </Match>
            <Match when={settingsPage.get() === "appearance"}>
              <AppSettingsPanel class={"max-w-2xl"} sections={sections} />
            </Match>
          </Switch>
        </Show>
      </main>
    </div>
  )
}

function SettingsCard(p: { children: JSXElement }) {
  return (
    <div class={"p-4 rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-white/5 dark:bg-[#292A2D]"}>
      {p.children}
    </div>
  )
}

/** Save/discard actions for a settings form; sticky so they stay reachable on long forms. */
function SaveBar(p: { dirty: boolean; onDiscard: () => void }) {
  return (
    <div
      class={
        "sticky bottom-0 -mx-1 px-1 py-3 flex items-center justify-end gap-3 bg-background/80 dark:bg-[#222326]/80 backdrop-blur-xl border-t border-transparent"
      }
    >
      <span class={"mr-auto text-xs text-neutral-500 dark:text-neutral-400"} aria-live={"polite"}>
        {p.dirty ? "Ungespeicherte Änderungen" : "Alle Änderungen gespeichert"}
      </span>
      <Button variant={"ghost"} class={"text-sm"} disabled={!p.dirty} onClick={() => p.onDiscard()}>
        Verwerfen
      </Button>
      <Button type={"submit"} variant={"contrast"} class={"text-sm"} disabled={!p.dirty}>
        Speichern
      </Button>
    </div>
  )
}

function SectionTitle(p: { children: JSXElement }) {
  return <h2 class={"text-sm font-semibold text-neutral-500 dark:text-neutral-400"}>{p.children}</h2>
}

function SettingsRow(p: { icon: string; title: string; description: string; action?: JSXElement }) {
  return (
    <div class={"flex items-center gap-3 py-3 border-b border-neutral-200 dark:border-white/10 last:border-b-0"}>
      <Icon path={p.icon} class={"size-5 text-neutral-500 dark:text-neutral-400"} />
      <div class={"flex flex-col min-w-0"}>
        <span class={"text-sm font-medium"}>{p.title}</span>
        <span class={"text-xs text-neutral-500 dark:text-neutral-400"}>{p.description}</span>
      </div>
      <div class={"ml-auto shrink-0"}>{p.action}</div>
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
