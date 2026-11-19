import { Match, Switch } from "solid-js"

/** Small decorative flag, independent of platform emoji support. */
export function AppSidebarFlag(p: { language: "de" | "en" | "gb" | "fr" | "es" | "it"; class?: string }) {
  return (
    <svg
      aria-hidden={true}
      viewBox={"0 0 30 20"}
      class={`inline-block w-5 h-auto shrink-0 rounded-[2px] ${p.class ?? ""}`}
    >
      <Switch>
        <Match when={p.language === "de"}>
          <path fill={"#ffce00"} d={"M0 0h30v20H0z"} />
          <path fill={"#d00"} d={"M0 0h30v13.33H0z"} />
          <path d={"M0 0h30v6.67H0z"} />
        </Match>
        <Match when={p.language === "fr"}>
          <path fill={"#ed2939"} d={"M0 0h30v20H0z"} />
          <path fill={"#fff"} d={"M0 0h20v20H0z"} />
          <path fill={"#002395"} d={"M0 0h10v20H0z"} />
        </Match>
        <Match when={p.language === "it"}>
          <path fill={"#ce2b37"} d={"M0 0h30v20H0z"} />
          <path fill={"#fff"} d={"M0 0h20v20H0z"} />
          <path fill={"#009246"} d={"M0 0h10v20H0z"} />
        </Match>
        <Match when={p.language === "es"}>
          <path fill={"#aa151b"} d={"M0 0h30v20H0z"} />
          <path fill={"#f1bf00"} d={"M0 5h30v10H0z"} />
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
