import { mdiLogout } from "@adaptive-ds/mdi/mdiLogout.js"
import { createEffect, createSignal, For, type Element as JSXElement, Show, untrack } from "solid-js"
import { ModernSidebarAvatar } from "#src/demos/modules/modern/ModernSidebarAvatar.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"

/** One choice of a segmented menu section, e.g. "Hell" or "DE". */
export interface ModernSidebarUserMenuOption {
  label: string
  /** MDI path string. */
  icon?: string
  /** Optional decorative content, such as a flag. */
  leading?: JSXElement
  /** Optional emoji flag, used when leading is omitted. */
  flag?: string
  /** Selected option; reactive values can be supplied with a getter. */
  selected?: boolean
  /** Settings panel only: render the tile as a light/dark/system window mockup. */
  preview?: "light" | "dark" | "system"
  /** Settings panel only: CSS color; a section where every option has one renders as round swatches. */
  color?: string
  onClick?: () => void
}

/** A labelled row of segmented choices, e.g. "Darstellung" or "Sprache". */
export interface ModernSidebarUserMenuSection {
  label: string
  /** MDI path string; shown next to the label in the settings panel. */
  icon?: string
  /** Optional note shown above the options, e.g. "Muss manuell aktiviert werden". */
  hint?: string
  options: ModernSidebarUserMenuOption[]
}

export interface ModernSidebarUserMenuProps {
  name?: string
  email?: string
  userInitials?: string
  userImageUrl?: string
  userAvatar?: JSXElement
  sections?: ModernSidebarUserMenuSection[]
  /** Label of the bottom action row; hidden when omitted. */
  logoutLabel?: string
  onLogout?: () => void
}

/**
 * Account popover body: identity, segmented choice sections and a logout row.
 * Purely presentational: options are selectable, but only do something if the caller passes onClick.
 */
export function ModernSidebarUserMenu(p: ModernSidebarUserMenuProps) {
  return (
    <div class={"flex flex-col gap-3 w-72 text-neutral-950 dark:text-neutral-50"}>
      <Show when={p.name || p.email || p.userAvatar || p.userImageUrl || p.userInitials}>
        <div class={"flex items-center gap-3 px-1"}>
          <ModernSidebarAvatar userAvatar={p.userAvatar} userImageUrl={p.userImageUrl} userInitials={p.userInitials} />
          <div class={"flex flex-col min-w-0"}>
            <Show when={p.name}>
              <span class={"text-sm font-semibold truncate"}>{p.name}</span>
            </Show>
            <Show when={p.email}>
              <span class={"text-sm text-neutral-500 dark:text-neutral-400 truncate"}>{p.email}</span>
            </Show>
          </div>
        </div>
      </Show>

      <For each={p.sections}>{(section) => <SegmentedSection section={section} />}</For>

      <Show when={p.logoutLabel}>
        <button
          type={"button"}
          onClick={() => p.onLogout?.()}
          class={classArr(
            "flex items-center gap-2 h-8 px-2 rounded-md cursor-pointer text-sm font-medium", // layout
            "text-red-600 dark:text-red-400 hover:bg-black/5 dark:hover:bg-white/10", // color
          )}
        >
          <Icon path={mdiLogout} class={"size-4"} />
          <span>{p.logoutLabel}</span>
        </button>
      </Show>
    </div>
  )
}

/** Segmented choice row with local selection that also follows external selection changes. */
function SegmentedSection(p: { section: ModernSidebarUserMenuSection }) {
  const selectedFromOptions = () => p.section.options.findIndex((o) => o.selected)
  const [selected, setSelected] = createSignal(untrack(selectedFromOptions))
  createEffect(selectedFromOptions, (index) => {
    setSelected(index)
  })
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
              <Show
                when={o.leading}
                fallback={
                  <Show when={o.flag}>
                    <span aria-hidden="true">{o.flag}</span>
                  </Show>
                }
              >
                {o.leading}
              </Show>
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
      aria-pressed={p.selected ? "true" : "false"}
      onClick={() => p.onClick()}
      class={classArr(
        "flex items-center justify-center gap-1.5 h-8 px-2 rounded-md cursor-pointer text-sm font-medium", // layout
        "hover:bg-black/5 dark:hover:bg-white/10", // hover
        p.selected && "bg-violet-500/10 dark:bg-violet-400/15 hover:bg-violet-500/10", // selected
      )}
    >
      {p.children}
    </button>
  )
}
