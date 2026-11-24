import { For } from "solid-js"
import type { cmsDashboardStateCreate } from "./cmsDashboardStateCreate.js"

export function CmsDashboardQuickActionTiles(props: { state: ReturnType<typeof cmsDashboardStateCreate> }) {
  return (
    <section class="flex min-w-0 flex-col">
      <h2 class="mb-4 font-semibold">{props.state.text().actions}</h2>
      <div class="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
        <For each={props.state.quickActions}>
          {(action) => (
            <button
              type="button"
              onClick={() => props.state.navigate(action.view)}
              class="flex min-h-48 min-w-0 flex-col items-center justify-start rounded-2xl border border-gray-200 bg-white px-2 pt-7 pb-4 text-center transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--dashboard-accent)] dark:border-neutral-800 dark:bg-neutral-900/60 dark:hover:bg-neutral-800"
            >
              <span class="mb-4 grid h-11 w-11 place-items-center rounded-full bg-[color-mix(in_oklab,var(--dashboard-accent)_12%,transparent)] text-[var(--dashboard-accent)] dark:bg-neutral-800">
                <svg aria-hidden="true" viewBox="0 0 24 24" class="h-5 w-5 fill-current">
                  <path d={action.icon} />
                </svg>
              </span>
              <span class="flex min-h-10 items-center justify-center text-sm font-medium">
                {action.label[props.state.locale()]}
              </span>
              <span class="mt-1 text-xs text-gray-500 dark:text-neutral-400">
                {props.state.number(action.count)} {action.countLabel[props.state.locale()]}
              </span>
            </button>
          )}
        </For>
      </div>
    </section>
  )
}
