import { For, Show } from "solid-js"
import { Button } from "#ui/interactive/button/Button.jsx"
import { AppSidebarCssAvatar } from "#ui/modules/app_sidebar/AppSidebarCssAvatar.jsx"
import { AppSidebarUserMenu } from "#ui/modules/app_sidebar/AppSidebarUserMenu.jsx"
import { NavHeader } from "#ui/modules/nav_header/NavHeader.jsx"
import { demoNavHeaderStateCreate } from "./demoNavHeaderStateCreate.js"

export function DemoNavHeader() {
  const state = demoNavHeaderStateCreate()
  return (
    <div class={"min-h-screen bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50"}>
      <NavHeader
        logo={
          <span class={"flex size-9 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white"}>
            A
          </span>
        }
        brand={"Atlas."}
        onBrandClick={state.goHome}
        items={state.items()}
        loginLabel={"Anmelden"}
        onLogin={state.login}
        userName={state.loggedIn() ? "Max Mustermann" : undefined}
        userInitials={state.loggedIn() ? "MM" : undefined}
        userAvatar={state.loggedIn() ? <AppSidebarCssAvatar /> : undefined}
        userMenu={
          state.loggedIn() ? (
            <AppSidebarUserMenu
              name={"Max Mustermann"}
              email={"max.mustermann@example.com"}
              userAvatar={<AppSidebarCssAvatar />}
              sections={state.sections}
              logoutLabel={"Abmelden"}
              onLogout={state.logout}
            />
          ) : undefined
        }
      />
      <main class={"mx-auto max-w-5xl px-5 py-12 md:py-20"}>
        <p class={"text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400"}>
          Atlas · Navigation
        </p>
        <h1 class={"mt-4 text-4xl font-bold tracking-tight md:text-6xl"}>{state.active()}</h1>
        <p class={"mt-5 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400"}>
          Willkommen bei Atlas. Entdecken Sie eine einfache Navigation, die auch beim Scrollen immer erreichbar bleibt.
        </p>
        <div class={"mt-8 flex flex-wrap items-center gap-3"}>
          <Button onClick={state.toggleLogin}>
            <Show when={state.loggedIn()} fallback={"Demo: angemeldet anzeigen"}>
              Demo: abgemeldet anzeigen
            </Show>
          </Button>
          <span class={"text-sm text-neutral-500"}>Status: {state.loggedIn() ? "Angemeldet" : "Abgemeldet"}</span>
        </div>
        <div class={"mt-16 space-y-8"}>
          <For
            each={[
              "Alles im Blick",
              "Einfach zusammenarbeiten",
              "Mehr Raum für Ideen",
              "Bereit für den nächsten Schritt",
            ]}
          >
            {(title, index) => (
              <section
                class={
                  "min-h-64 rounded-2xl border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900"
                }
              >
                <p class={"text-sm font-semibold text-blue-600 dark:text-blue-400"}>
                  0{index() + 1} / {state.active()}
                </p>
                <h2 class={"mt-3 text-2xl font-semibold"}>{title}</h2>
                <p class={"mt-4 max-w-2xl leading-relaxed text-neutral-600 dark:text-neutral-400"}>
                  Dieser Platzhalter zeigt, wie sich die Navigation auf einer längeren Seite verhält. Scrollen Sie
                  weiter und wechseln Sie jederzeit zu einem anderen Bereich.
                </p>
              </section>
            )}
          </For>
        </div>
      </main>
    </div>
  )
}
