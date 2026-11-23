import { Match, Switch } from "solid-js"

/** Small decorative flag, independent of platform emoji support. */
export function CmsSidebarFlag(p: { language: "de" | "en"; class?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={"0 0 30 20"}
      class={`inline-block w-5 h-auto shrink-0 rounded-[2px] ${p.class ?? ""}`}
    >
      <Switch>
        <Match when={p.language === "de"}>
          <path fill={"#ffce00"} d={"M0 0h30v20H0z"} />
          <path fill={"#d00"} d={"M0 0h30v13.33H0z"} />
          <path d={"M0 0h30v6.67H0z"} />
        </Match>
        <Match when={true}>
          <path fill={"#012169"} d={"M0 0h30v20H0z"} />
          <path stroke={"#fff"} stroke-width={"4"} d={"M0 0l30 20M30 0L0 20"} />
          <path stroke={"#c8102e"} stroke-width={"2"} d={"M0 0l30 20M30 0L0 20"} />
          <path stroke={"#fff"} stroke-width={"6"} d={"M15 0v20M0 10h30"} />
          <path stroke={"#c8102e"} stroke-width={"3"} d={"M15 0v20M0 10h30"} />
        </Match>
      </Switch>
    </svg>
  )
}
