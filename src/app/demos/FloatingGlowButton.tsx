import { mdiHome } from "@adaptive-ds/mdi/mdiHome.js"
import { mdiMoonWaningCrescent } from "@adaptive-ds/mdi/mdiMoonWaningCrescent.js"
import { mdiWhiteBalanceSunny } from "@adaptive-ds/mdi/mdiWhiteBalanceSunny.js"
import { Show } from "solid-js"
import "./FloatingGlowButton.css"

/** Small dark app-icon style button with a gradient-filled icon and a soft colored glow at the bottom. */
export function FloatingGlowButton(props: {
  kind: "home" | "theme"
  label: string
  isDark?: boolean
  onClick?: () => void
}) {
  return (
    <Show
      when={props.kind === "home"}
      fallback={
        <button
          type="button"
          class="floating-glow floating-glow--theme"
          title={props.label}
          aria-label={props.label}
          onClick={props.onClick}
        >
          <svg viewBox="0 0 24 24" fill="url(#floating-theme-gradient)" aria-hidden="true">
            <defs>
              <linearGradient id="floating-theme-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop stop-color="#fbe58a" />
                <stop offset=".55" stop-color="#f7b7a3" />
                <stop offset="1" stop-color="#ee8fd0" />
              </linearGradient>
            </defs>
            <path d={props.isDark ? mdiWhiteBalanceSunny : mdiMoonWaningCrescent} />
          </svg>
        </button>
      }
    >
      <a href="/" class="floating-glow floating-glow--home" title={props.label} aria-label={props.label}>
        <svg viewBox="0 0 24 24" fill="url(#floating-home-gradient)" aria-hidden="true">
          <defs>
            <linearGradient id="floating-home-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop stop-color="#f6c6f0" />
              <stop offset=".5" stop-color="#d79cf5" />
              <stop offset="1" stop-color="#9c8cff" />
            </linearGradient>
          </defs>
          <path d={mdiHome} />
        </svg>
      </a>
    </Show>
  )
}
