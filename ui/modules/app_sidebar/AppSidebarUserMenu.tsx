import { mdiLogout } from "@adaptive-ds/mdi/mdiLogout.js"
import { createSignal, For, type JSXElement, Show } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"

/** One choice of a segmented menu section, e.g. "Hell" or "DE". */
export interface AppSidebarUserMenuOption {
  label: string
  /** MDI path string. */
  icon?: string
  /** Initially selected option; afterwards the selection follows clicks. */
  selected?: boolean
  /** Settings panel only: render the tile as a light/dark/system window mockup. */
  preview?: "light" | "dark" | "system"
  onClick?: () => void
}

/** A labelled row of segmented choices, e.g. "Darstellung" or "Sprache". */
export interface AppSidebarUserMenuSection {
  label: string
  /** MDI path string; shown next to the label in the settings panel. */
  icon?: string
  options: AppSidebarUserMenuOption[]
}

export interface AppSidebarUserMenuProps {
  name?: string
  email?: string
  sections?: AppSidebarUserMenuSection[]
  /** Label of the bottom action row; hidden when omitted. */
  logoutLabel?: string
  onLogout?: () => void
}

/**
 * Account popover body: identity, segmented choice sections and a logout row.
 * Purely presentational: options are selectable, but only do something if the caller passes onClick.
 */
export function AppSidebarUserMenu(p: AppSidebarUserMenuProps) {
  return (
    <div class={"flex flex-col gap-3 w-72 text-neutral-950 dark:text-neutral-50"}>
      <Show when={p.name || p.email}>
        <div class={"flex flex-col px-1"}>
          <Show when={p.name}>
            <span class={"text-sm font-semibold truncate"}>{p.name}</span>
          </Show>
          <Show when={p.email}>
            <span class={"text-sm text-neutral-500 dark:text-neutral-400 truncate"}>{p.email}</span>
          </Show>
        </div>
      </Show>

      <For each={p.sections}>{(section) => <SegmentedSection section={section} />}</For>

      <Show when={p.logoutLabel}>
        <button
          type={"button"}
          onClick={() => p.onLogout?.()}
          class={classArr(
            "flex items-center gap-2 h-8 px-2 rounded-md cursor-pointer text-sm font-medium", // layout
            "hover:bg-black/5 dark:hover:bg-white/10", // hover
          )}
        >
          <Icon path={mdiLogout} class={"size-4"} />
          <span>{p.logoutLabel}</span>
        </button>
      </Show>
    </div>
  )
}

/** Segmented choice row; keeps its own selection so options are clickable without any app logic behind them. */
function SegmentedSection(p: { section: AppSidebarUserMenuSection }) {
  const [selected, setSelected] = createSignal(p.section.options.findIndex((o) => o.selected))
  return (
    <Section label={p.section.label}>
      <div class={"grid grid-flow-col auto-cols-fr gap-1"}>
        <For each={p.section.options}>
          {(o, i) => (
            <Segment
              selected={selected() === i()}
              onClick={() => {
                setSelected(i())
                o.onClick?.()
              }}
            >
              <Show when={o.icon}>{(icon) => <Icon path={icon()} class={"size-4"} />}</Show>
              <span>{o.label}</span>
            </Segment>
          )}
        </For>
      </div>
    </Section>
  )
}

function Section(p: { label: string; children: JSXElement }) {
  return (
    <div class={"flex flex-col gap-1"}>
      <span class={"px-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400"}>{p.label}</span>
      {p.children}
    </div>
  )
}

function Segment(p: { selected: boolean; onClick: () => void; children: JSXElement }) {
  return (
    <button
      type={"button"}
      aria-pressed={p.selected}
      onClick={() => p.onClick()}
      class={classArr(
        "flex items-center justify-center gap-1.5 h-8 px-2 rounded-md cursor-pointer text-sm font-medium", // layout
        "hover:bg-black/5 dark:hover:bg-white/10", // hover
        p.selected && "bg-blue-50 dark:bg-white/10 hover:bg-blue-50", // selected
      )}
    >
      {p.children}
    </button>
  )
}
