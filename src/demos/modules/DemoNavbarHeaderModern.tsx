import { NavbarHeaderModernBackdrop } from "#src/demos/modules/navbarHeaderModern/backdrop/NavbarHeaderModernBackdrop.jsx"
import { demoNavbarHeaderModernStateCreate } from "#src/demos/modules/navbarHeaderModern/demoNavbarHeaderModernStateCreate.js"
import { NavbarHeaderModernLogo } from "#src/demos/modules/navbarHeaderModern/logo/NavbarHeaderModernLogo.jsx"
import { NavbarHeaderModern } from "#src/demos/modules/navbarHeaderModern/NavbarHeaderModern.jsx"
import { NavbarHeaderModernCssAvatar } from "#src/demos/modules/navbarHeaderModern/NavbarHeaderModernCssAvatar.jsx"
import { NavbarHeaderModernUserMenu } from "#src/demos/modules/navbarHeaderModern/NavbarHeaderModernUserMenu.jsx"

/** Standalone copy of the NavHeader demo; its components live in ./navbarHeaderModern and evolve independently. */
export function DemoNavbarHeaderModern() {
  const state = demoNavbarHeaderModernStateCreate()
  return (
    <div class={"relative isolate min-h-screen bg-background text-foreground"}>
      <NavbarHeaderModernBackdrop />
      <NavbarHeaderModern
        logo={
          <div ref={state.attachLogo}>
            <NavbarHeaderModernLogo logoText={"adaptive-solid-ui"} logoTextClass={"text-lg font-semibold"} />
          </div>
        }
        items={state.items()}
        showThemeSwitch
        loginLabel={"Anmelden"}
        onLogin={state.login}
        registerLabel={"Registrieren"}
        onRegister={state.login}
        ctaLabel={"Kontakt"}
        ctaHref={"#kontakt"}
        userName={state.loggedIn() ? "Max Mustermann" : undefined}
        userInitials={state.loggedIn() ? "MM" : undefined}
        userAvatar={state.loggedIn() ? <NavbarHeaderModernCssAvatar /> : undefined}
        userMenu={
          state.loggedIn() ? (
            <NavbarHeaderModernUserMenu
              name={"Max Mustermann"}
              email={"max.mustermann@example.com"}
              userAvatar={<NavbarHeaderModernCssAvatar />}
              logoutLabel={"Abmelden"}
              onLogout={state.logout}
            />
          ) : undefined
        }
      />
    </div>
  )
}
