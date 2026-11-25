import { mdiChevronLeft } from "@adaptive-ds/mdi/mdiChevronLeft.js"
import type { JSX } from "@solidjs/web"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { cmsCardClass } from "./cmsCardClass.js"
import { cmsCollapsiblePreviewColumnStateCreate } from "./cmsCollapsiblePreviewColumnStateCreate.js"

export function CmsCollapsiblePreviewColumn(props: { title: string; children: JSX.Element }) {
  const state = cmsCollapsiblePreviewColumnStateCreate()
  return (
    <section
      class={`${cmsCardClass} relative w-full overflow-hidden transition-[width] duration-500 ease-in-out motion-reduce:transition-none ${state.collapsed() ? "lg:w-12" : "lg:w-[calc((100%_-_1.5rem)/2)]"}`}
    >
      <div class="mb-4 flex h-8 items-center justify-between gap-2 lg:w-[calc((100cqw_-_1.5rem)/2_-_2.5rem_-_2px)]">
        <h2
          class={`font-semibold ${state.collapsed() ? "lg:absolute lg:left-3 lg:top-12 lg:[writing-mode:vertical-rl] lg:rotate-180" : ""}`}
        >
          {props.title}
        </h2>
        <button
          type="button"
          class={`flex size-8 shrink-0 items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dashboard-accent)] ${state.collapsed() ? "lg:absolute lg:left-2 lg:top-2" : ""}`}
          aria-expanded={state.collapsed() ? "false" : "true"}
          aria-controls={state.contentId}
          aria-label={`${props.title} ${state.collapsed() ? "ausklappen" : "einklappen"}`}
          title={`${props.title} ${state.collapsed() ? "ausklappen" : "einklappen"}`}
          onClick={state.toggle}
        >
          <Icon
            path={mdiChevronLeft}
            class={`size-5 transition-transform duration-500 ease-in-out motion-reduce:transition-none ${state.collapsed() ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      <div
        id={state.contentId}
        aria-hidden={state.collapsed() ? "true" : "false"}
        inert={state.collapsed()}
        class={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out motion-reduce:transition-none lg:w-[calc((100cqw_-_1.5rem)/2_-_2.5rem_-_2px)] lg:grid-rows-[1fr] ${state.collapsed() ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"}`}
      >
        <div class="min-h-0 overflow-hidden">{props.children}</div>
      </div>
    </section>
  )
}
