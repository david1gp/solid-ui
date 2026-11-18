import { mdiLogout } from "@adaptive-ds/mdi/mdiLogout.js"
import { createSignal, For, type JSXElement, Match, Show, Switch } from "solid-js"
import type {
  AppSidebarUserMenuOption,
  AppSidebarUserMenuSection,
} from "#ui/modules/app_sidebar/AppSidebarUserMenu.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"

export interface AppSettingsPanelProps {
  name?: string
  email?: string
  /** Same section shape as the user menu; options with `preview` render as window mockup tiles. */
  sections?: AppSidebarUserMenuSection[]
  logoutLabel?: string
  onLogout?: () => void
  class?: string
}

/**
 * Settings page body: the user menu options laid out as grouped cards with selectable tiles.
 * Purely presentational: tiles are selectable, but only do something if the caller passes onClick.
 */
export function AppSettingsPanel(p: AppSettingsPanelProps) {
  return (
    <div class={classArr("flex flex-col gap-3 w-full text-neutral-950 dark:text-neutral-50", p.class)}>
      <Show when={p.name || p.email}>
        <Card>
          <div class={"flex flex-col"}>
            <Show when={p.name}>
              <span class={"text-sm font-semibold truncate"}>{p.name}</span>
            </Show>
            <Show when={p.email}>
              <span class={"text-sm text-neutral-500 dark:text-neutral-400 truncate"}>{p.email}</span>
            </Show>
          </div>
        </Card>
      </Show>

      <Show when={p.sections?.length}>
        <Card class={"flex flex-col gap-4"}>
          <For each={p.sections}>{(section) => <TileSection section={section} />}</For>
        </Card>
      </Show>

      <Show when={p.logoutLabel}>
        <Card compact>
          <button
            type={"button"}
            onClick={() => p.onLogout?.()}
            class={classArr(
              "flex items-center gap-3 w-full h-11 px-3 rounded-xl cursor-pointer text-sm font-medium", // layout
              "text-red-600 dark:text-red-400 hover:bg-black/5 dark:hover:bg-white/10", // color
            )}
          >
            <Icon path={mdiLogout} class={"size-5"} />
            <span>{p.logoutLabel}</span>
          </button>
        </Card>
      </Show>
    </div>
  )
}

function Card(p: { class?: string; compact?: boolean; children: JSXElement }) {
  return (
    <div
      class={classArr(
        p.compact ? "p-1" : "p-4",
        "rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-white/5 dark:bg-neutral-800/60",
        p.class,
      )}
    >
      {p.children}
    </div>
  )
}

/** Tile row with its own selection so tiles are clickable without any app logic behind them. */
function TileSection(p: { section: AppSidebarUserMenuSection }) {
  const [selected, setSelected] = createSignal(p.section.options.findIndex((o) => o.selected))
  const sectionIcon = () => p.section.icon
  const select = (o: AppSidebarUserMenuOption, i: number) => {
    setSelected(i)
    o.onClick?.()
  }
  // Sections whose options all carry a color render as one inline row of round swatches.
  const isSwatches = () => p.section.options.length > 0 && p.section.options.every((o) => o.color)
  return (
    <div class={classArr("flex gap-3", isSwatches() ? "items-center justify-between flex-wrap" : "flex-col")}>
      <div class={"flex items-center gap-3 text-sm font-medium"}>
        <Show when={sectionIcon()}>
          {(icon) => <Icon path={icon()} class={"size-5 text-neutral-500 dark:text-neutral-400"} />}
        </Show>
        <span>{p.section.label}</span>
      </div>
      <Show when={isSwatches()}>
        <div class={"flex items-center gap-1.5"}>
          <For each={p.section.options}>
            {(o, i) => <Swatch option={o} selected={selected() === i()} onClick={() => select(o, i())} />}
          </For>
        </div>
      </Show>
      <Show when={!isSwatches()}>
        <div class={"grid grid-flow-col auto-cols-fr gap-2"}>
          <For each={p.section.options}>
            {(o, i) => <Tile option={o} selected={selected() === i()} onClick={() => select(o, i())} />}
          </For>
        </div>
      </Show>
    </div>
  )
}

/** Round color swatch; the selected one gets a ring and a white center dot. */
function Swatch(p: { option: AppSidebarUserMenuOption; selected: boolean; onClick: () => void }) {
  return (
    <button
      type={"button"}
      aria-pressed={p.selected}
      aria-label={p.option.label}
      title={p.option.label}
      onClick={() => p.onClick()}
      style={{ "background-color": p.option.color, "--tw-ring-color": p.option.color }}
      class={classArr(
        "flex items-center justify-center size-[22px] rounded-full cursor-pointer", // layout
        "ring-offset-1 ring-offset-neutral-50 dark:ring-offset-neutral-800 transition-shadow", // ring
        p.selected ? "ring-2" : "hover:ring-2 hover:opacity-90",
      )}
    >
      <Show when={p.selected}>
        <span class={"size-2 rounded-full bg-white"} />
      </Show>
    </button>
  )
}

function Tile(p: { option: AppSidebarUserMenuOption; selected: boolean; onClick: () => void }) {
  const icon = () => p.option.icon
  return (
    <button
      type={"button"}
      aria-pressed={p.selected}
      onClick={() => p.onClick()}
      class={"group flex flex-col items-center gap-2 cursor-pointer text-sm font-medium"}
    >
      <span
        class={classArr(
          "flex items-center justify-center w-full rounded-xl p-1 transition-colors", // layout
          p.option.preview ? "aspect-[4/3]" : "h-14 gap-2", // size
          "border-2", // frame
          p.selected
            ? "border-neutral-900 bg-white dark:border-white/80 dark:bg-white/10 shadow-sm"
            : "border-transparent bg-white/60 dark:bg-white/5 group-hover:border-neutral-300 dark:group-hover:border-white/20",
        )}
      >
        <Show
          when={p.option.preview}
          fallback={
            <>
              <Show when={icon()}>{(path) => <Icon path={path()} class={"size-5"} />}</Show>
              <span>{p.option.label}</span>
            </>
          }
        >
          {(preview) => <WindowPreview variant={preview()} />}
        </Show>
      </span>
      <Show when={p.option.preview}>
        <span
          class={classArr(
            p.selected ? "text-neutral-950 dark:text-neutral-50" : "text-neutral-500 dark:text-neutral-400",
          )}
        >
          {p.option.label}
        </span>
      </Show>
    </button>
  )
}

/** Miniature app window in the given color scheme; "system" shows light and dark side by side. */
function WindowPreview(p: { variant: "light" | "dark" | "system" }) {
  return (
    <Switch>
      <Match when={p.variant === "system"}>
        <span class={"relative flex size-full overflow-hidden rounded-lg"}>
          <span class={"absolute inset-0"}>
            <Window dark={false} />
          </span>
          <span class={"absolute inset-0 [clip-path:inset(0_0_0_50%)]"}>
            <Window dark />
          </span>
        </span>
      </Match>
      <Match when={true}>
        <span class={"flex size-full overflow-hidden rounded-lg"}>
          <Window dark={p.variant === "dark"} />
        </span>
      </Match>
    </Switch>
  )
}

function Window(p: { dark: boolean }) {
  const dot = p.dark ? "bg-neutral-500" : "bg-neutral-300"
  const line = p.dark ? "bg-neutral-600" : "bg-neutral-300"
  return (
    <span
      class={classArr(
        "flex flex-col size-full gap-1.5 p-1.5 border rounded-lg",
        p.dark ? "bg-neutral-900 border-neutral-700" : "bg-neutral-100 border-neutral-200",
      )}
    >
      <span class={"flex gap-0.5"}>
        <span class={classArr("size-1 rounded-full", dot)} />
        <span class={classArr("size-1 rounded-full", dot)} />
        <span class={classArr("size-1 rounded-full", dot)} />
      </span>
      <span class={"flex flex-1 items-center gap-1.5"}>
        <span class={classArr("aspect-square h-[70%] rounded-full", p.dark ? "bg-neutral-700" : "bg-neutral-300")} />
        <span class={"flex flex-1 flex-col gap-1"}>
          <span class={classArr("h-1 w-1/2 rounded-full", line)} />
          <span class={classArr("h-1 w-full rounded-full", line)} />
          <span class={classArr("h-1 w-3/4 rounded-full", line)} />
        </span>
      </span>
    </span>
  )
}
