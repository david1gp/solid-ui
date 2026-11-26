import { CmsSaveBar } from "./cms/ui/CmsSaveBar.js"
import { mdiAccountCogOutline } from "@adaptive-ds/mdi/mdiAccountCogOutline.js"
import { mdiBrightnessAuto } from "@adaptive-ds/mdi/mdiBrightnessAuto.js"
import { mdiCameraOutline } from "@adaptive-ds/mdi/mdiCameraOutline.js"
import { mdiCardAccountDetailsOutline } from "@adaptive-ds/mdi/mdiCardAccountDetailsOutline.js"
import { mdiCellphone } from "@adaptive-ds/mdi/mdiCellphone.js"
import { mdiCogOutline } from "@adaptive-ds/mdi/mdiCogOutline.js"
import { mdiLaptop } from "@adaptive-ds/mdi/mdiLaptop.js"
import { mdiLockReset } from "@adaptive-ds/mdi/mdiLockReset.js"
import { mdiPaletteOutline } from "@adaptive-ds/mdi/mdiPaletteOutline.js"
import { mdiPaletteSwatchOutline } from "@adaptive-ds/mdi/mdiPaletteSwatchOutline.js"
import { mdiShieldAccountOutline } from "@adaptive-ds/mdi/mdiShieldAccountOutline.js"
import { mdiWeatherNight } from "@adaptive-ds/mdi/mdiWeatherNight.js"
import { mdiWeb } from "@adaptive-ds/mdi/mdiWeb.js"
import { mdiWhiteBalanceSunny } from "@adaptive-ds/mdi/mdiWhiteBalanceSunny.js"
import {
  createEffect,
  createSignal,
  For,
  type Element as JSXElement,
  Match,
  onCleanup,
  onSettled,
  Show,
  Switch,
  untrack,
} from "solid-js"
import { DemoShapesBackdrop } from "#src/app/demos/DemoShapesBackdrop.jsx"
import { CmsSettingsNav } from "#src/demos/modules/cms/CmsSettingsNav.jsx"
import { CmsSettingsPanel } from "#src/demos/modules/cms/CmsSettingsPanel.jsx"
import { CmsSidebar } from "#src/demos/modules/cms/CmsSidebar.jsx"
import { CmsSidebarCssAvatar } from "#src/demos/modules/cms/CmsSidebarCssAvatar.jsx"
import { CmsSidebarCssBanner } from "#src/demos/modules/cms/CmsSidebarCssBanner.jsx"
import { CmsSidebarFlag } from "#src/demos/modules/cms/CmsSidebarFlag.jsx"
import type { CmsSidebarNavGroup } from "#src/demos/modules/cms/CmsSidebarNavGroup.js"
import { CmsSidebarUserMenu, type CmsSidebarUserMenuSection } from "#src/demos/modules/cms/CmsSidebarUserMenu.jsx"
import { tttLanguage } from "#ui/i18n/tttLanguage.js"
import { Input } from "#ui/input/input/Input.jsx"
import { Button } from "#ui/interactive/button/Button.jsx"
import { themeInit, themeSet, themeSignal } from "#ui/interactive/theme/themeSignal.js"
import { themeVariant } from "#ui/interactive/theme/themeVariant.js"
import { toastAdd } from "#ui/interactive/toast/toastAdd.js"
import { AppSettingsPanel } from "#ui/modules/app_sidebar/AppSettingsPanel.jsx"
import { AppSettingsSidebar } from "#ui/modules/app_sidebar/AppSettingsSidebar.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { demoCmsMobileCollapseCreate } from "./cms/demoCmsMobileCollapseCreate.js"
import { cmsLocale } from "./cms/i18n/cmsLocale.js"
import { cmsShellText } from "./cms/i18n/cmsShellText.js"
import { CmsFullscreenLayout } from "./cms/shell/CmsFullscreenLayout.jsx"
import { CmsViewEnter } from "./cms/shell/CmsViewEnter.js"
import { CmsShellHeader } from "./cms/shell/CmsShellHeader.jsx"
import type { CmsViewKey } from "./cms/shell/CmsViewKey.js"
import { cmsNavigate } from "./cms/shell/cmsNavigate.js"
import { cmsNavigation } from "./cms/shell/cmsNavigation.js"
import { cmsNavigationSync } from "./cms/shell/cmsNavigationSync.js"
import { cmsViewRegistry } from "./cms/shell/cmsViewRegistry.js"

const t = (de: string, en: string) => (cmsLocale.get() === "de" ? de : en)
const settingsLabel = () => t("Einstellungen", "Settings")
const settingsPageKey = "settings-page"

const settingsPages = [
  { id: "profile", icon: mdiCardAccountDetailsOutline, label: { de: "Profil", en: "Profile" } },
  { id: "account", icon: mdiAccountCogOutline, label: { de: "Konto & Sicherheit", en: "Account & security" } },
  { id: "appearance", icon: mdiPaletteOutline, label: { de: "Erscheinungsbild", en: "Appearance" } },
] as const
type SettingsPageId = (typeof settingsPages)[number]["id"]

const accentColors = [
  { label: { de: "Blau", en: "Blue" }, color: "#2563eb" },
  { label: { de: "Pink", en: "Pink" }, color: "#ec4899" },
  { label: { de: "Gelb", en: "Yellow" }, color: "#eab308" },
  { label: { de: "Grün", en: "Green" }, color: "#22c55e" },
  { label: { de: "Lila", en: "Purple" }, color: "#8b5cf6" },
]

export function DemoCMS() {
  // Fullscreen demo has no nav ThemeButton, so load the stored theme here for the tiles' selection.
  onSettled(themeInit)
  const previousLanguage = untrack(tttLanguage.get)
  createEffect(cmsLocale.get, (locale) => {
    tttLanguage.set(locale)
  })
  onCleanup(() => tttLanguage.set(previousLanguage))
  const settingsOpen = createSignalObject(false)
  onSettled(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && settingsOpen.get()) settingsOpen.set(false)
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  })
  const { collapsed, motionReady } = demoCmsMobileCollapseCreate(settingsOpen)
  const accentColor = createSignalObject(accentColors[0]!.color)
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
  // Settings forms edit drafts; nothing is applied until saved.
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
    toastAdd({ title: t("Profil gespeichert", "Profile saved"), duration: 3000 })
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
      toastAdd({
        title: t("Bitte eine gültige E-Mail-Adresse eingeben", "Please enter a valid email address"),
        duration: 4000,
      })
      return
    }
    const nextUsername = usernameDraft.get().trim()
    username.set(nextUsername)
    usernameDraft.set(nextUsername)
    // A new e-mail only takes effect once confirmed via the link sent to it.
    if (nextEmail !== email.get()) {
      pendingEmail.set(nextEmail)
      toastAdd({
        title: t(`Bestätigungslink an ${nextEmail} gesendet`, `Confirmation link sent to ${nextEmail}`),
        duration: 4000,
      })
    } else {
      toastAdd({ title: t("Konto gespeichert", "Account saved"), duration: 3000 })
    }
    emailDraft.set(email.get())
  }
  const confirmEmail = () => {
    const pending = pendingEmail.get()
    if (!pending) return
    email.set(pending)
    emailDraft.set(pending)
    pendingEmail.set(undefined)
    toastAdd({ title: t("E-Mail-Adresse bestätigt", "Email address confirmed"), duration: 3000 })
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
    if (!passwordCurrent.get())
      return passwordError.set(t("Bitte das aktuelle Passwort eingeben.", "Enter your current password."))
    if (passwordNew.get().length < 8)
      return passwordError.set(
        t("Das neue Passwort muss mindestens 8 Zeichen haben.", "The new password must have at least 8 characters."),
      )
    if (passwordNew.get() !== passwordConfirm.get())
      return passwordError.set(t("Die Passwörter stimmen nicht überein.", "Passwords do not match."))
    closePasswordForm()
    passwordChangedAt.set("gerade eben")
    toastAdd({ title: t("Passwort geändert", "Password changed"), duration: 3000 })
  }
  const twoFactor = createSignalObject(false)
  const twoFactorSetup = createSignalObject(false)
  const twoFactorCode = createSignalObject("")
  const tokens = createSignalObject<string[]>(["Demo token"])
  const tokenName = createSignalObject("")
  const sessions = createSignalObject([
    { id: "s1", icon: mdiLaptop, device: "Chrome auf Linux", location: "Berlin · Jetzt aktiv", current: true },
    { id: "s2", icon: mdiCellphone, device: "Safari auf iPhone", location: "Hamburg · vor 2 Tagen", current: false },
  ])
  const endSession = (id: string) => {
    sessions.set(sessions.get().filter((session) => session.id !== id))
    toastAdd({ title: t("Sitzung abgemeldet", "Session revoked"), duration: 3000 })
  }
  const fullName = () => [firstName.get(), lastName.get()].filter(Boolean).join(" ")
  const initials = () => `${firstName.get().charAt(0)}${lastName.get().charAt(0)}`.toUpperCase()
  const settingsPage = createSignalObject<SettingsPageId>("profile")
  const settingsPageLabel = () => settingsPages.find((page) => page.id === settingsPage.get())?.label[cmsLocale.get()]
  const sections = (): CmsSidebarUserMenuSection[] => [
    {
      label: t("Darstellung", "Display"),
      icon: mdiPaletteOutline,
      options: (
        [
          { icon: mdiWhiteBalanceSunny, label: t("Hell", "Light"), preview: "light", theme: themeVariant.light },
          { icon: mdiWeatherNight, label: t("Dunkel", "Dark"), preview: "dark", theme: themeVariant.dark },
          { icon: mdiBrightnessAuto, label: t("System", "System"), preview: "system", theme: themeVariant.os },
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
      label: t("Akzentfarbe", "Accent color"),
      icon: mdiPaletteSwatchOutline,
      options: accentColors.map((c) => ({
        ...c,
        label: c.label[cmsLocale.get()],
        get selected() {
          return accentColor.get() === c.color
        },
        onClick: () => accentColor.set(c.color),
      })),
    },
    {
      label: t("Sprache", "Language"),
      icon: mdiWeb,
      hint: t("Muss manuell aktiviert werden", "Must be activated manually"),
      options: (["DE", "EN"] as const).map((label) => ({
        label,
        get leading() {
          return <CmsSidebarFlag language={label.toLowerCase() as "de" | "en"} />
        },
        get selected() {
          return cmsLocale.get() === label.toLowerCase()
        },
        onClick: () => cmsLocale.set(label.toLowerCase() as "de" | "en"),
      })),
    },
  ]
  const [active, setActive] = createSignal("")
  const [mobile, setMobile] = createSignal(false)
  onSettled(() => {
    const query = window.matchMedia("(max-width: 767px)")
    const update = () => setMobile(query.matches)
    update()
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  })
  onSettled(() => {
    const cleanup = cmsNavigationSync()
    const syncSettings = () => {
      const params = new URLSearchParams(window.location.search)
      const id = params.get("id")
      if (params.get("view") === "settings") {
        settingsPage.set(settingsPages.some((page) => page.id === id) ? (id as SettingsPageId) : "profile")
        setActive(settingsPageKey)
      } else setActive("")
    }
    syncSettings()
    window.addEventListener("popstate", syncSettings)
    return () => {
      cleanup()
      window.removeEventListener("popstate", syncSettings)
    }
  })
  const view = () => cmsViewRegistry[cmsNavigation.get().view]
  const groupKeys = ["overview", "content", "management", "system", "auth"] as const
  const navigateSettings = (id: SettingsPageId) => {
    settingsPage.set(id)
    setActive(settingsPageKey)
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      url.searchParams.set("view", "settings")
      url.searchParams.set("id", id)
      window.history.pushState(window.history.state, "", url)
    }
  }
  const openSettings = () => {
    navigateSettings("profile")
    settingsOpen.set(false)
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) collapsed.set(true)
  }
  const groups = (): CmsSidebarNavGroup[] =>
    groupKeys
      .map((group) => ({
        label: cmsShellText[cmsLocale.get()][group],
        items: (Object.entries(cmsViewRegistry) as [CmsViewKey, (typeof cmsViewRegistry)[CmsViewKey]][])
          .filter(([, item]) => item.group === group)
          .map<CmsSidebarNavGroup["items"][number]>(([key, item]) => ({
            icon: item.icon,
            label: item.label[cmsLocale.get()],
            isActive: active() !== settingsPageKey && cmsNavigation.get().view === key,
            onClick: () => {
              setActive("")
              settingsOpen.set(false)
              if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) collapsed.set(true)
              cmsNavigate(key)
            },
          }))
          .concat(
            group === "system"
              ? [
                  {
                    icon: mdiCogOutline,
                    label: settingsLabel(),
                    isActive: settingsOpen.get(),
                    onClick: () => settingsOpen.set(!settingsOpen.get()),
                  },
                ]
              : [],
          ),
      }))
      .filter((group) => group.items.length > 0)
  const viewContent = () => {
    const Component = view().component
    return <Component id={cmsNavigation.get().id} />
  }
  return (
    <Show
      when={active() === settingsPageKey || view().layout === "app"}
      fallback={
        <Show
          when={view().layout === "auth"}
          fallback={
            <CmsFullscreenLayout>
              <CmsViewEnter view={cmsNavigation.get().view}>{viewContent()}</CmsViewEnter>
            </CmsFullscreenLayout>
          }
        >
          {viewContent()}
        </Show>
      }
    >
      <div
        class={"relative isolate flex h-dvh w-full shrink-0 overflow-clip bg-background dark:bg-[#222326]"}
        data-viewport-shell
      >
        <DemoShapesBackdrop />
        <Show when={!(active() === settingsPageKey && mobile())}>
          <div class={`relative flex shrink-0 ${motionReady() ? "" : "[&_*]:!transition-none"}`}>
            <CmsSidebar
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
              searchPlaceholder={cmsShellText[cmsLocale.get()].search}
              accentColor={accentColor.get()}
              userName={fullName()}
              userInitials={initials()}
              userAvatar={<CmsSidebarCssAvatar />}
              userMenu={
                <div>
                  <CmsSidebarUserMenu
                    name={fullName()}
                    email={email.get()}
                    userAvatar={<CmsSidebarCssAvatar />}
                    logoutLabel={t("Abmelden", "Sign out")}
                  />
                  <button
                    type="button"
                    class="mt-2 w-full rounded-md px-2 py-2 text-left text-sm hover:bg-black/5 dark:hover:bg-white/10"
                    data-close-user-menu
                    onClick={openSettings}
                  >
                    {cmsShellText[cmsLocale.get()].settings}
                  </button>
                </div>
              }
            />
            <AppSettingsSidebar open={settingsOpen} title={settingsLabel()}>
              <AppSettingsPanel
                name={fullName()}
                email={email.get()}
                userAvatar={<CmsSidebarCssAvatar />}
                banner={<CmsSidebarCssBanner accentColor={accentColor.get()} />}
                sections={sections()}
                logoutLabel={t("Abmelden", "Sign out")}
                logoutPlacement={"bottom"}
              />
            </AppSettingsSidebar>
          </div>
        </Show>
        <Show when={active() === settingsPageKey}>
          <CmsSettingsNav
            class="hidden md:flex"
            title={settingsLabel()}
            name={fullName()}
            email={email.get()}
            userAvatar={<CmsSidebarCssAvatar />}
            accentColor={accentColor.get()}
            items={settingsPages.map((page) => ({
              icon: page.icon,
              label: page.label[cmsLocale.get()],
              get isActive() {
                return settingsPage.get() === page.id
              },
              onClick: () => navigateSettings(page.id),
            }))}
            logoutLabel={t("Abmelden", "Sign out")}
          />
        </Show>
        <div
          class="flex min-w-0 flex-1 flex-col overflow-y-auto scroll-pt-16 bg-white dark:bg-[#222326]"
          style={{
            "--app-sidebar-accent": accentColor.get(),
            "--dashboard-accent": "var(--app-sidebar-accent, var(--color-blue-600))",
          }}
        >
          <CmsShellHeader
            group={cmsShellText[cmsLocale.get()][view().group]}
            title={active() === settingsPageKey ? settingsLabel() : view().label[cmsLocale.get()]}
            locale={cmsLocale.get()}
            onNavigate={() => setActive("")}
          />
          <main data-cms-main class="min-w-0 shrink-0 p-4 pb-24 sm:p-8 sm:pb-24">
            <Show
              when={active() === settingsPageKey}
              fallback={<CmsViewEnter view={cmsNavigation.get().view}>{viewContent()}</CmsViewEnter>}
            >
              <div class="mb-4 flex flex-col gap-3 md:hidden">
                <button
                  type="button"
                  class="self-start rounded-lg py-1 text-sm text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
                  onClick={() => {
                    setActive("")
                    cmsNavigate("dashboard")
                  }}
                >
                  ← Admin
                </button>
                <nav
                  aria-label={settingsLabel()}
                  class="-mx-4 flex gap-1.5 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  <For each={settingsPages}>
                    {(page) => (
                      <button
                        type="button"
                        class={`shrink-0 whitespace-nowrap rounded-lg border px-2.5 py-2 text-sm transition-colors ${
                          settingsPage.get() === page.id
                            ? "border-transparent bg-neutral-900 font-medium text-white dark:bg-white dark:text-neutral-900"
                            : "border-neutral-200 hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/10"
                        }`}
                        aria-current={settingsPage.get() === page.id ? "page" : undefined}
                        onClick={() => navigateSettings(page.id)}
                      >
                        {page.label[cmsLocale.get()]}
                      </button>
                    )}
                  </For>
                </nav>
              </div>
              <CmsViewEnter view={settingsPage.get()}>
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
                        <div
                          class={
                            "flex flex-wrap items-center gap-4 pb-4 mb-4 border-b border-neutral-200 dark:border-white/10"
                          }
                        >
                          <div class={"size-16 shrink-0 rounded-full overflow-hidden"}>
                            <CmsSidebarCssAvatar />
                          </div>
                          <div class={"flex flex-1 flex-col gap-1 min-w-0"}>
                            <span class={"text-sm font-medium"}>{t("Profilbild", "Profile picture")}</span>
                            <span class={"text-xs text-neutral-500 dark:text-neutral-400"}>
                              {t("JPG oder PNG, max. 2 MB", "JPG or PNG, max. 2 MB")}
                            </span>
                          </div>
                          <Button
                            variant={"outline"}
                            class={"w-full sm:w-auto sm:ml-auto gap-2 text-sm whitespace-nowrap"}
                            onClick={() =>
                              toastAdd({
                                title: t(
                                  "Bild-Upload ist in der Demo nicht verfügbar",
                                  "Image upload is not available in the demo",
                                ),
                                duration: 3000,
                              })
                            }
                          >
                            <Icon path={mdiCameraOutline} class={"size-4"} />
                            {t("Bild ändern", "Change image")}
                          </Button>
                        </div>
                        <div class={"grid gap-4 sm:grid-cols-2"}>
                          <Field label={t("Vorname", "First name")} for={"settings-first-name"}>
                            <Input
                              id={"settings-first-name"}
                              autocomplete={"given-name"}
                              value={firstNameDraft.get()}
                              onInput={(e) => firstNameDraft.set(e.currentTarget.value)}
                            />
                          </Field>
                          <Field label={t("Nachname", "Last name")} for={"settings-last-name"}>
                            <Input
                              id={"settings-last-name"}
                              autocomplete={"family-name"}
                              value={lastNameDraft.get()}
                              onInput={(e) => lastNameDraft.set(e.currentTarget.value)}
                            />
                          </Field>
                          <Field
                            label={t("Telefonnummer", "Phone number")}
                            for={"settings-phone"}
                            class={"sm:col-span-2"}
                          >
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
                      <CmsSaveBar dirty={profileDirty()} onDiscard={discardProfile} />
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
                        <SectionTitle>{t("Konto", "Account")}</SectionTitle>
                        <SettingsCard>
                          <div class={"grid gap-4"}>
                            <Field label={t("Benutzername", "Username")} for={"settings-username"}>
                              <Input
                                id={"settings-username"}
                                autocomplete={"username"}
                                value={usernameDraft.get()}
                                onInput={(e) => usernameDraft.set(e.currentTarget.value)}
                              />
                            </Field>
                            <Field label={t("E-Mail-Adresse", "Email address")} for={"settings-email"}>
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
                                    {t(
                                      "Änderungen werden erst nach Bestätigung per E-Mail wirksam.",
                                      "Changes take effect after email confirmation.",
                                    )}
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
                                      {t(
                                        "Bestätigung ausstehend: Wir haben einen Link an",
                                        "Confirmation pending: We sent a link to",
                                      )}{" "}
                                      <strong>{pending()}</strong>.
                                    </span>
                                    <button
                                      type={"button"}
                                      class={"underline cursor-pointer"}
                                      onClick={() =>
                                        toastAdd({
                                          title: t(
                                            `Link erneut an ${pending()} gesendet`,
                                            `Link resent to ${pending()}`,
                                          ),
                                          duration: 3000,
                                        })
                                      }
                                    >
                                      {t("Erneut senden", "Resend")}
                                    </button>
                                    <button type={"button"} class={"underline cursor-pointer"} onClick={confirmEmail}>
                                      {t("Bestätigen (Demo)", "Confirm (demo)")}
                                    </button>
                                    <button
                                      type={"button"}
                                      class={"underline cursor-pointer"}
                                      onClick={() => pendingEmail.set(undefined)}
                                    >
                                      {t("Abbrechen", "Cancel")}
                                    </button>
                                  </div>
                                )}
                              </Show>
                            </Field>
                          </div>
                        </SettingsCard>
                        <CmsSaveBar dirty={accountDirty()} onDiscard={discardAccount} />
                      </form>
                      <div class={"flex flex-col gap-3"}>
                        <SectionTitle>{t("Sicherheit", "Security")}</SectionTitle>
                        <SettingsCard>
                          <SettingsRow
                            icon={mdiLockReset}
                            title={t("Passwort", "Password")}
                            description={`${t("Zuletzt geändert", "Last changed")}: ${passwordChangedAt.get() === "vor 3 Monaten" ? t("vor 3 Monaten", "3 months ago") : t("gerade eben", "just now")}`}
                            action={
                              <Show when={!passwordFormOpen.get()}>
                                <Button
                                  variant={"outline"}
                                  class={"text-sm"}
                                  onClick={() => passwordFormOpen.set(true)}
                                >
                                  {t("Passwort ändern", "Change password")}
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
                              <Field
                                label={t("Aktuelles Passwort", "Current password")}
                                for={"settings-password-current"}
                              >
                                <Input
                                  id={"settings-password-current"}
                                  type={"password"}
                                  autocomplete={"current-password"}
                                  value={passwordCurrent.get()}
                                  onInput={(e) => passwordCurrent.set(e.currentTarget.value)}
                                />
                              </Field>
                              <div class={"grid gap-4 sm:grid-cols-2"}>
                                <Field label={t("Neues Passwort", "New password")} for={"settings-password-new"}>
                                  <Input
                                    id={"settings-password-new"}
                                    type={"password"}
                                    autocomplete={"new-password"}
                                    value={passwordNew.get()}
                                    onInput={(e) => passwordNew.set(e.currentTarget.value)}
                                  />
                                </Field>
                                <Field
                                  label={t("Neues Passwort bestätigen", "Confirm new password")}
                                  for={"settings-password-confirm"}
                                >
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
                                  <span class={"text-xs text-neutral-500 dark:text-neutral-400"}>
                                    {t("Mindestens 8 Zeichen.", "At least 8 characters.")}
                                  </span>
                                }
                              >
                                <span role={"alert"} class={"text-xs text-red-600 dark:text-red-400"}>
                                  {passwordError.get()}
                                </span>
                              </Show>
                              <div class={"flex justify-end gap-2"}>
                                <Button variant={"ghost"} class={"text-sm"} onClick={closePasswordForm}>
                                  {t("Abbrechen", "Cancel")}
                                </Button>
                                <Button type={"submit"} variant={"contrast"} class={"text-sm"}>
                                  {t("Passwort aktualisieren", "Update password")}
                                </Button>
                              </div>
                            </form>
                          </Show>
                          <SettingsRow
                            icon={mdiShieldAccountOutline}
                            title={t("Zwei-Faktor-Authentifizierung", "Two-factor authentication")}
                            description={
                              twoFactor.get()
                                ? t("Aktiv – Code per Authenticator-App", "Active – code via authenticator app")
                                : t(
                                    "Nicht aktiv – empfohlen für mehr Sicherheit",
                                    "Inactive – recommended for added security",
                                  )
                            }
                            action={
                              <Button
                                variant={"outline"}
                                class={"text-sm"}
                                onClick={() => {
                                  if (twoFactor.get()) twoFactor.set(false)
                                  else twoFactorSetup.set(!twoFactorSetup.get())
                                }}
                              >
                                {twoFactor.get() ? t("Deaktivieren", "Disable") : t("Aktivieren", "Enable")}
                              </Button>
                            }
                          />
                          <Show when={twoFactorSetup.get()}>
                            <div class="grid gap-3 border-t border-neutral-200 py-4 dark:border-white/10">
                              <div class="flex size-28 items-center justify-center border border-dashed border-neutral-400 text-center text-xs">
                                QR
                                <br />
                                {t("Platzhalter", "placeholder")}
                              </div>
                              <Field label={t("Bestätigungscode", "Verification code")} for="settings-2fa-code">
                                <Input
                                  id="settings-2fa-code"
                                  inputmode="numeric"
                                  value={twoFactorCode.get()}
                                  onInput={(e) => twoFactorCode.set(e.currentTarget.value)}
                                />
                              </Field>
                              <Button
                                variant="outline"
                                disabled={!twoFactorCode.get().trim()}
                                onClick={() => {
                                  twoFactor.set(true)
                                  twoFactorSetup.set(false)
                                  twoFactorCode.set("")
                                }}
                              >
                                {t("Einrichtung bestätigen", "Confirm setup")}
                              </Button>
                            </div>
                          </Show>
                        </SettingsCard>
                      </div>
                      <div class={"flex flex-col gap-3"}>
                        <SectionTitle>{t("Aktive Sitzungen", "Active sessions")}</SectionTitle>
                        <SettingsCard>
                          <For each={sessions.get()}>
                            {(session) => (
                              <SettingsRow
                                icon={session.icon}
                                title={
                                  session.current
                                    ? t("Chrome auf Linux", "Chrome on Linux")
                                    : t("Safari auf iPhone", "Safari on iPhone")
                                }
                                description={
                                  session.current
                                    ? `${t("Berlin · Jetzt aktiv", "Berlin · Active now")} · ${t("Dieses Gerät", "This device")}`
                                    : t("Hamburg · vor 2 Tagen", "Hamburg · 2 days ago")
                                }
                                action={
                                  <Show when={!session.current}>
                                    <Button
                                      variant={"outlineRed"}
                                      class={"text-sm"}
                                      onClick={() => endSession(session.id)}
                                    >
                                      {t("Abmelden", "Sign out")}
                                    </Button>
                                  </Show>
                                }
                              />
                            )}
                          </For>
                        </SettingsCard>
                        <p class={"text-xs text-neutral-500 dark:text-neutral-400"}>
                          {t("Mitglied seit März 2024", "Member since March 2024")}
                        </p>
                      </div>
                      <div class="flex flex-col gap-3">
                        <SectionTitle>{t("Persönliche API-Tokens", "Personal API tokens")}</SectionTitle>
                        <SettingsCard>
                          <For each={tokens.get()}>
                            {(token) => (
                              <div class="flex flex-wrap items-center gap-3 border-b border-neutral-200 py-3 dark:border-white/10">
                                <span class="text-sm">{token} · ••••••••</span>
                                <Button
                                  class="ml-auto text-sm"
                                  variant="outlineRed"
                                  onClick={() => tokens.set(tokens.get().filter((item) => item !== token))}
                                >
                                  {t("Widerrufen", "Revoke")}
                                </Button>
                              </div>
                            )}
                          </For>
                          <form
                            class="flex flex-wrap gap-2 pt-4"
                            onSubmit={(e) => {
                              e.preventDefault()
                              const name = tokenName.get().trim()
                              if (name && !tokens.get().includes(name)) {
                                tokens.set([...tokens.get(), name])
                                tokenName.set("")
                              }
                            }}
                          >
                            <Input
                              aria-label={t("Token-Name", "Token name")}
                              placeholder={t("Token-Name", "Token name")}
                              value={tokenName.get()}
                              onInput={(e) => tokenName.set(e.currentTarget.value)}
                            />
                            <Button type="submit" variant="outline">
                              {t("Token erstellen", "Create token")}
                            </Button>
                          </form>
                        </SettingsCard>
                      </div>
                    </div>
                  </Match>
                  <Match when={settingsPage.get() === "appearance"}>
                    <CmsSettingsPanel class={"max-w-2xl"} sections={sections()} />
                  </Match>
                </Switch>
              </CmsViewEnter>
            </Show>
          </main>
        </div>
      </div>
    </Show>
  )
}

function SettingsCard(p: { children: JSXElement }) {
  return (
    <div class={"p-4 rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-white/5 dark:bg-[#292A2D]"}>
      {p.children}
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
