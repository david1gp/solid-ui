import { Show } from "solid-js"
import { demoNoticeStateCreate } from "#src/app/demo_notice/demoNoticeStateCreate.js"
import { cmsLocale } from "#src/demos/modules/cms/i18n/cmsLocale.js"
import { Button } from "#ui/interactive/button/Button.jsx"
import { buttonVariant } from "#ui/interactive/button/buttonCva.js"

/** Small notice pinned to the bottom of the viewport telling visitors that some features are placeholders. */
export function DemoNoticePopup() {
  const state = demoNoticeStateCreate()
  return (
    <Show when={state.visible()}>
      <div
        role="status"
        aria-live="polite"
        data-demo-notice
        class={
          "fixed inset-x-4 bottom-16 sm:bottom-4 z-[60] mx-auto flex max-w-xl flex-col sm:flex-row sm:items-center gap-3 rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground shadow-lg"
        }
      >
        <p class={"flex-1"}>
          <Show
            when={
              typeof window !== "undefined" &&
              window.location.pathname === "/modules/DemoCMS" &&
              cmsLocale.get() === "en"
            }
            fallback={
              <>
                <span class={"font-semibold"}>Beachte</span> – manche Funktionen sind auf dieser Template | Demo Seite
                nicht verfügbar und dienen nur als Platzhalter.
              </>
            }
          >
            <span class={"font-semibold"}>Note</span> – some features on this template / demo page are unavailable and
            serve only as placeholders.
          </Show>
        </p>
        <Button
          variant={buttonVariant.contrast}
          class={"shrink-0 text-sm self-end sm:self-auto"}
          onClick={state.dismiss}
        >
          {typeof window !== "undefined" && window.location.pathname === "/modules/DemoCMS" && cmsLocale.get() === "en"
            ? "Got it"
            : "Verstanden"}
        </Button>
      </div>
    </Show>
  )
}
