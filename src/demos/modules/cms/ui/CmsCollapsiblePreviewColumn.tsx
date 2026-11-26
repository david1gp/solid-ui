import { mdiChevronLeft } from "@adaptive-ds/mdi/mdiChevronLeft.js"
import type { JSX } from "@solidjs/web"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { cmsCardClass } from "./cmsCardClass.js"
import { cmsTileTransitionClass } from "./cmsTileTransitionClass.js"
import { cmsCollapsiblePreviewColumnStateCreate } from "./cmsCollapsiblePreviewColumnStateCreate.js"

export function CmsCollapsiblePreviewColumn(props: { title: string; children: JSX.Element }) {
  const state = cmsCollapsiblePreviewColumnStateCreate()
  return (
    <section
      class={`${cmsCardClass} ${cmsTileTransitionClass} relative w-full overflow-hidden ${state.collapsed() ? "lg:w-12" : "lg:w-[calc((100%_-_1.5rem)/2)]"}`}
    >
      <div class="mb-4 flex h-8 items-center justify-between gap-2">
        <h2
          class={`font-semibold lg:whitespace-nowrap lg:transition-opacity lg:duration-150 motion-reduce:transition-none ${state.collapsed() ? "lg:opacity-0" : "lg:delay-300 lg:opacity-100"}`}
        >
          {props.title}
        </h2>
        <span
          aria-hidden="true"
          class={`pointer-events-none absolute left-3 top-12 hidden rotate-180 whitespace-nowrap font-semibold [writing-mode:vertical-rl] transition-opacity duration-150 motion-reduce:transition-none lg:block ${state.collapsed() ? "opacity-100 delay-300" : "opacity-0"}`}
        >
          {props.title}
        </span>
        <button
          type="button"
          class="flex size-8 shrink-0 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dashboard-accent)] lg:absolute lg:right-2 lg:top-2"
          aria-expanded={state.collapsed() ? "false" : "true"}
          aria-controls={state.contentId}
          aria-label={`${props.title} ${state.collapsed() ? "ausklappen" : "einklappen"}`}
          title={`${props.title} ${state.collapsed() ? "ausklappen" : "einklappen"}`}
          onClick={state.toggle}
        >
          <Icon
            path={mdiChevronLeft}
            class={`size-5 transition-transform duration-[350ms] ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none ${state.collapsed() ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <div
        id={state.contentId}
        aria-hidden={state.collapsed() ? "true" : "false"}
        inert={state.collapsed()}
        class={`${cmsTileTransitionClass} grid lg:w-[calc((100cqw_-_1.5rem)/2_-_2.5rem_-_2px)] lg:grid-rows-[1fr] ${state.collapsed() ? "grid-rows-[0fr]" : "grid-rows-[1fr]"}`}
      >
        <div class="min-h-0 overflow-hidden">{props.children}</div>
      </div>
    </section>
  )
}
