import { For, Show } from "solid-js"

export interface CmsMiniChartProps {
  values: number[]
  type?: "line" | "bar"
  label?: string
  class?: string
}

/** Lightweight responsive sparkline. Non-finite values are omitted. */
export function CmsMiniChart(p: CmsMiniChartProps) {
  const values = () => p.values.filter(Number.isFinite)
  const min = () => Math.min(0, ...values())
  const max = () => Math.max(0, ...values())
  const y = (value: number) => 36 - ((value - min()) / (max() - min() || 1)) * 32
  const points = () =>
    values()
      .map((value, index, all) => `${all.length === 1 ? 50 : 4 + (index / (all.length - 1)) * 92},${y(value)}`)
      .join(" ")
  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      role="img"
      aria-label={p.label ?? "Diagramm"}
      class={p.class ?? "h-10 w-full text-blue-500"}
    >
      <Show
        when={p.type === "bar"}
        fallback={
          <polyline
            points={points()}
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            vector-effect="non-scaling-stroke"
          />
        }
      >
        <For each={values()}>
          {(value, index) => {
            const width = 92 / values().length
            const baseline = y(0)
            return (
              <rect
                x={4 + index() * width}
                y={Math.min(y(value), baseline)}
                width={Math.max(0, width - 1)}
                height={Math.abs(baseline - y(value))}
                fill="currentColor"
              />
            )
          }}
        </For>
      </Show>
    </svg>
  )
}
