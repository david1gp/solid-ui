import { For } from "solid-js"
import { CmsMiniChart } from "../../ui/CmsMiniChart.js"
import { PageHeader } from "../../ui/PageHeader.js"
import { cmsDashboardStateCreate } from "./cmsDashboardStateCreate.js"

const metrics = [
  { value: 128, trend: "+12%", values: [34, 42, 39, 55, 52, 68, 75] },
  { value: 24, trend: "+8%", values: [20, 25, 24, 30, 32, 34, 40] },
  { value: 846, trend: "+16%", values: [30, 38, 45, 43, 56, 67, 80] },
  { value: 18, trend: "+5%", values: [20, 23, 23, 27, 30, 30, 35] },
]
const views = ["posts", "pages", "media", "users"] as const
const activityTimes = [
  [-15, "minute"],
  [-2, "hour"],
  [-1, "day"],
  [-3, "day"],
] as const

export function CmsDashboardView(_props: { id?: string }) {
  const state = cmsDashboardStateCreate()
  return (
    <div class="space-y-6">
      <PageHeader title={state.text().title} description={state.text().description} />
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <For each={metrics}>
          {(metric, index) => (
            <div class="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
              <p class="text-sm text-gray-500 dark:text-gray-400">{state.text().metrics[index()]}</p>
              <div class="mt-2 flex items-end justify-between gap-4">
                <div>
                  <p class="text-2xl font-semibold">{state.number(metric.value)}</p>
                  <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span class="font-medium text-emerald-600 dark:text-emerald-400">{metric.trend}</span>{" "}
                    {state.text().trend}
                  </p>
                </div>
                <CmsMiniChart
                  values={metric.values}
                  label={state.text().metrics[index()]}
                  class="h-10 w-20 shrink-0 text-indigo-500"
                />
              </div>
            </div>
          )}
        </For>
      </div>
      <div class="grid gap-4 lg:grid-cols-2">
        <section class="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
          <h2 class="font-semibold">{state.text().activity}</h2>
          <ul class="mt-3 divide-y divide-gray-100 dark:divide-gray-800">
            <For each={activityTimes}>
              {(time, index) => (
                <li class="flex items-center justify-between gap-4 py-3 text-sm">
                  <span>{state.text().activities[index()]}</span>
                  <span class="shrink-0 text-xs text-gray-500 dark:text-gray-400">
                    {state.relative(time[0], time[1])}
                  </span>
                </li>
              )}
            </For>
          </ul>
        </section>
        <section class="rounded-2xl border border-gray-200 p-4 dark:border-gray-800">
          <h2 class="font-semibold">{state.text().actions}</h2>
          <div class="mt-4 grid gap-2 sm:grid-cols-2">
            <For each={views}>
              {(view, index) => (
                <button
                  type="button"
                  onClick={() => state.navigate(view)}
                  class="rounded-xl border border-gray-200 px-4 py-3 text-left text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                >
                  {state.text().actionLabels[index()]}{" "}
                  <span aria-hidden="true" class="float-right">
                    →
                  </span>
                </button>
              )}
            </For>
          </div>
        </section>
        <section class="rounded-2xl border border-gray-200 p-4 dark:border-gray-800 lg:col-span-2">
          <h2 class="font-semibold">{state.text().tasks}</h2>
          <ul class="mt-3 divide-y divide-gray-100 dark:divide-gray-800">
            <For each={[0, 1, 2, 3]}>
              {(index) => (
                <li>
                  <label class="flex cursor-pointer items-center gap-3 py-3 text-sm">
                    <input
                      type="checkbox"
                      checked={state.checked(index)}
                      onChange={() => state.toggle(index)}
                      class="accent-indigo-600"
                    />
                    <span class={state.checked(index) ? "line-through text-gray-400" : ""}>
                      {state.text().taskLabels[index]}
                    </span>
                  </label>
                </li>
              )}
            </For>
          </ul>
        </section>
      </div>
    </div>
  )
}
