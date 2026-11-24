import { For } from "solid-js"
import { cmsDashboardStateCreate } from "./cmsDashboardStateCreate.js"

export function CmsDashboardStatisticsPanel(props: {
  state: ReturnType<typeof cmsDashboardStateCreate>
  accentColor?: string
}) {
  return (
    <section
      class="rounded-2xl border border-gray-200 bg-gray-50/70 p-5 pb-20 dark:border-gray-800 dark:bg-gray-900/70 sm:p-6"
      style={props.accentColor ? { "--dashboard-accent": props.accentColor } : undefined}
      aria-labelledby="dashboard-statistics-title"
    >
      <h2 id="dashboard-statistics-title" class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {props.state.text().statistics}
      </h2>

      <div class="relative mx-auto my-7 flex h-48 w-48 items-center justify-center sm:h-52 sm:w-52">
        <svg viewBox="0 0 200 200" class="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
          <circle
            cx="100"
            cy="100"
            r="83"
            fill="none"
            stroke="currentColor"
            stroke-width="14"
            class="text-gray-200 dark:text-gray-800"
          />
          <circle
            cx="100"
            cy="100"
            r="83"
            fill="none"
            stroke="var(--dashboard-accent)"
            stroke-width="14"
            stroke-linecap="round"
            stroke-dasharray="390 522"
          />
        </svg>
        <div class="text-center">
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {props.state.chartMetric() === "visitors"
              ? props.state.text().totalVisitors
              : props.state.text().totalPageviews}
          </p>
          <p class="mt-1 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {props.state.number(props.state.chartTotal())}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <For each={props.state.metrics}>
          {(metric, index) => (
            <div class="rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
              <p class="text-xs text-gray-500 dark:text-gray-400">{props.state.text().metrics[index()]}</p>
              <div class="mt-1 flex flex-wrap items-baseline gap-x-2">
                <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {props.state.number(metric.value)}
                </span>
                <span
                  class="text-xs font-medium text-emerald-600 dark:text-emerald-400"
                  title={props.state.text().trend}
                >
                  {metric.trend}
                </span>
              </div>
            </div>
          )}
        </For>
      </div>

      <div class="mt-7 border-t border-gray-200 pt-5 dark:border-gray-800">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <select
            aria-label={props.state.text().statistics}
            value={props.state.chartMetric()}
            onChange={(event) => props.state.selectChartMetric(event.currentTarget.value as "visitors" | "pageviews")}
            class="max-w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          >
            <option value="visitors">{props.state.text().visitors}</option>
            <option value="pageviews">{props.state.text().pageviews}</option>
          </select>
          <fieldset
            class="flex rounded-lg bg-gray-200/70 p-1 dark:bg-gray-800"
            aria-label={props.state.text().statistics}
          >
            <For each={["month", "week", "day"] as const}>
              {(range) => (
                <button
                  type="button"
                  aria-pressed={props.state.chartRange() === range ? "true" : "false"}
                  onClick={() => props.state.selectChartRange(range)}
                  class={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${props.state.chartRange() === range ? "bg-white text-gray-900 dark:bg-gray-700 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`}
                >
                  {props.state.text()[range]}
                </button>
              )}
            </For>
          </fieldset>
        </div>
        <div
          class="group/chart mt-5 flex h-44 items-end gap-2"
          role="img"
          aria-label={`${props.state.chartMetric() === "visitors" ? props.state.text().visitors : props.state.text().pageviews}: ${props.state
            .chartSeries()
            .map((point) => `${point.label} ${props.state.number(point.value)}`)
            .join(", ")}`}
        >
          <For each={props.state.chartSeries()}>
            {(point, index) => (
              <div class="group/bar flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2">
                <div class="relative flex w-full flex-1 items-end justify-center pt-6">
                  <span
                    class={`absolute top-0 whitespace-nowrap rounded-md bg-gray-900 px-1.5 py-1 text-xs text-white dark:bg-gray-100 dark:text-gray-900 ${index() === props.state.chartSeries().length - 1 ? "opacity-100 group-hover/chart:opacity-0 group-hover/bar:opacity-100" : "opacity-0 group-hover/bar:opacity-100"}`}
                  >
                    {props.state.number(point.value)}
                  </span>
                  <div
                    class={`w-2 max-w-full rounded-full transition-all ${["dark:hue-rotate-0", "dark:hue-rotate-30", "dark:hue-rotate-60", "dark:hue-rotate-90", "dark:-hue-rotate-30", "dark:-hue-rotate-60", ""][index()]}`}
                    style={{
                      height: `${(point.value / Math.max(...props.state.chartSeries().map((item) => item.value), 1)) * 100}%`,
                      background: `linear-gradient(to bottom, color-mix(in oklab, var(--dashboard-accent) ${index() === props.state.chartSeries().length - 1 ? 100 : 55 + (index() % 3) * 12}%, white), color-mix(in oklab, var(--dashboard-accent) 12%, transparent))`,
                    }}
                  />
                </div>
                <span
                  class={`text-xs group-hover/bar:font-bold ${index() === props.state.chartSeries().length - 1 ? "font-bold group-hover/chart:font-normal group-hover/bar:font-bold text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"}`}
                >
                  {point.label}
                </span>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  )
}
