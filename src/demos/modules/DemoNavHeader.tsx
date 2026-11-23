import { AppSidebarCssAvatar } from "#ui/modules/app_sidebar/AppSidebarCssAvatar.jsx"
import { AppSidebarUserMenu } from "#ui/modules/app_sidebar/AppSidebarUserMenu.jsx"
import { NavHeader } from "#ui/modules/nav_header/NavHeader.jsx"
import { LogoImageText } from "#ui/static/logo/LogoImageText.jsx"
import { demoNavHeaderStateCreate } from "./demoNavHeaderStateCreate.js"

export function DemoNavHeader() {
  const state = demoNavHeaderStateCreate()
  return (
    <div class={"min-h-screen bg-background text-foreground"}>
      <NavHeader
        logo={
          <div ref={state.attachLogo}>
            <LogoImageText logoText={"adaptive-solid-ui"} logoTextClass={"text-lg font-semibold"} />
          </div>
        }
        items={state.items()}
        loginLabel={"Anmelden"}
        onLogin={state.login}
        registerLabel={"Registrieren"}
        onRegister={state.login}
        ctaLabel={"Kontakt aufnehmen"}
        ctaHref={"#kontakt"}
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
    </div>
  )
}
