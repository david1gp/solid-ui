import { cn } from "cn"
import { createSignal, onSettled } from "solid-js"
import { NavbarHeaderModernButtonIconOnly } from "#src/demos/modules/navbarHeaderModern/buttons/NavbarHeaderModernButtonIconOnly.jsx"
import { navbarHeaderModernButtonVariant } from "#src/demos/modules/navbarHeaderModern/buttons/navbarHeaderModernButtonCva.js"
import type { NavbarHeaderModernThemeButtonText } from "#src/demos/modules/navbarHeaderModern/theme/NavbarHeaderModernThemeButtonText.js"
import { navbarHeaderModernThemeButtonTextDefault } from "#src/demos/modules/navbarHeaderModern/theme/NavbarHeaderModernThemeButtonText.js"
import { themeInit, themeRotate, themeSignal } from "#ui/interactive/theme/themeSignal.js"
import { themeIcon } from "#ui/interactive/theme/themeVariant.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"

export interface NavbarHeaderModernThemeButtonProps extends MayHaveClass {
  showText?: boolean
  texts?: NavbarHeaderModernThemeButtonText
}

/** NavbarHeaderModernButton cycling through the color theme. */
export function NavbarHeaderModernThemeButton(p: NavbarHeaderModernThemeButtonProps) {
  const navigate = (_to: string) => {}
  const handleGlobalKeyDown = createGlobalKeyHandler(navigate)

  const texts = () => p.texts ?? navbarHeaderModernThemeButtonTextDefault
  // SSR always starts as `os` ("Operation system"). Showing that label then
  // swapping to Light/Dark after themeInit shifts the navbar. Wait until the
  // stored theme is applied before rendering the label.
  const [themeReady, setThemeReady] = createSignal(false)

  onSettled(() => {
    themeInit()
    setThemeReady(true)
    window.addEventListener("keydown", handleGlobalKeyDown)
    return () => window.removeEventListener("keydown", handleGlobalKeyDown)
  })

  return (
    <NavbarHeaderModernButtonIconOnly
      title={texts().currentTheme(texts()[themeSignal.get()])}
      icon={themeIcon(themeSignal.get())}
      variant={navbarHeaderModernButtonVariant.ghost}
      class={cn(p.showText && "min-w-24", p.class)}
      onClick={themeRotate}
    >
      {p.showText && themeReady() && texts()[themeSignal.get()]}
    </NavbarHeaderModernButtonIconOnly>
  )
}

function createGlobalKeyHandler(navigate: (to: string) => void) {
  return (e: KeyboardEvent) => {
    if (e.key === "s" && e.altKey) {
      e.preventDefault()
      themeRotate()
    } else if (e.key === "d" && e.altKey) {
      e.preventDefault()
      navigate("/demos")
    }
  }
}
