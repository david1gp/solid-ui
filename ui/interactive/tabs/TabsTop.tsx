import { createUniqueId, type Element as JSXElement, For } from "solid-js"
import type { TabsTopText } from "#ui/interactive/tabs/TabsTopText.js"
import { tabsTopTextDefault } from "#ui/interactive/tabs/TabsTopText.js"
import { classArr } from "#ui/utils/classArr.js"
import type { SignalObject } from "#ui/utils/createSignalObject.js"
import type { HasGetOptions } from "#ui/utils/HasGetOptions.js"
import type { HasValueSignalString } from "#ui/utils/HasValueSignalString.js"
import type { MayHaveValueText } from "#ui/utils/HasValueText.js"
import type { MayHaveChildren } from "#ui/utils/MayHaveChildren.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"

export interface TabsTopProps
  extends HasValueSignalString,
    HasGetOptions,
    MayHaveValueText,
    MayHaveChildren,
    MayHaveClass {
  valueIcon?: (value: string) => string
  valueAmount?: (value: string) => number | undefined
  valueChildren: (value: string) => JSXElement
  id?: string
  disabled?: boolean
  texts?: TabsTopText
  trailing?: JSXElement
}

/**
 * Tabs with the trigger row rendered above the panels.
 * https://www.radix-ui.com/primitives/docs/components/tabs
 * https://github.com/radix-ui/primitives/blob/main/packages/react/tabs/src/Tabs.tsx
 **/
export function TabsTop(p: TabsTopProps) {
  const baseId = createUniqueId()
  return (
    <>
      <div
        id={p.id}
        role="tablist"
        data-disabled={p.disabled}
        onKeyDown={(event) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return
          const tabs = Array.from(
            event.currentTarget.querySelectorAll<HTMLButtonElement>(':scope > [role="tab"]:not(:disabled)'),
          )
          const index = tabs.indexOf(event.target as HTMLButtonElement)
          if (index < 0 || tabs.length === 0) return
          event.preventDefault()
          const next =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? tabs.length - 1
                : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length
          tabs[next]?.focus()
          tabs[next]?.click()
        }}
        class={classArr(
          "flex flex-wrap gap-2",
          // "grid gap-2 rounded-md p-2",
          "bg-white dark:bg-background", // bg
          "border border-slate-200 dark:border-neutral-700", // border
          p.class,
        )}
      >
        <For each={p.getOptions()} fallback={<NoTabOptions class={p.class} texts={p.texts} />}>
          {(value) => (
            <TabOption
              baseId={baseId}
              value={value}
              valueSignal={p.valueSignal}
              tabIndex={
                value === p.valueSignal.get() ||
                (!p.getOptions().includes(p.valueSignal.get()) && value === p.getOptions()[0])
                  ? 0
                  : -1
              }
              disabled={p.disabled}
              valueAmount={p.valueAmount}
              valueText={p.valueText}
              valueChildren={p.valueChildren}
            />
          )}
        </For>
        {p.trailing}
      </div>
      <div>
        <For each={p.getOptions()} fallback={<NoTabOptions class={p.class} texts={p.texts} />}>
          {(value) => (
            <TabContent
              baseId={baseId}
              value={value}
              valueSignal={p.valueSignal}
              disabled={p.disabled}
              valueAmount={p.valueAmount}
              valueText={p.valueText}
              valueChildren={p.valueChildren}
            />
          )}
        </For>
      </div>
    </>
  )
}

function NoTabOptions(p: { class?: string; texts?: TabsTopText }) {
  return <div class={p.class}>{(p.texts ?? tabsTopTextDefault).noEntries}</div>
}

interface TabOptionProps extends MayHaveClass {
  baseId: string
  value: string
  valueSignal: SignalObject<string>
  tabIndex?: number
  disabled?: boolean
  valueAmount?: (value: string) => number | undefined
  valueText?: (value: string) => string
  valueChildren: (value: string) => JSXElement
}

function TabOption(p: TabOptionProps): JSXElement {
  // console.log("TabOption", p.value, "value:", p.valueSignal.get())
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected(p) ? "true" : "false"}
      tabindex={p.tabIndex}
      id={makeTriggerId(p.baseId, p.value)}
      aria-controls={makeContentId(p.baseId, p.value)}
      data-state={isSelected(p) ? "active" : "inactive"}
      data-disabled={p.disabled}
      disabled={p.disabled}
      class={classArr(
        // "block",
        "cursor-pointer select-none",
        "rounded-sm",
        "px-3 py-2 text-center",
        isSelected(p) ? "bg-blue-500 text-white" : "hover:bg-slate-50 dark:hover:bg-neutral-900", // bg hover
        "flex gap-2",
        p.class,
      )}
      onClick={(_e) => setActiveTab(p)}
    >
      {getText(p)}
    </button>
  )
}

function TabContent(p: TabOptionProps): JSXElement {
  return (
    <div
      id={makeContentId(p.baseId, p.value)}
      role="tabpanel"
      data-state={isSelected(p) ? "active" : "inactive"}
      aria-labelledby={makeTriggerId(p.baseId, p.value)}
      hidden={!isSelected(p)}
      // biome-ignore lint/a11y/noNoninteractiveTabindex: WAI-APG recommends tabindex=0 on tabpanels so keyboard users can scroll them.
      tabindex={0}
      class={classArr("")}
    >
      {p.valueChildren(p.value)}
    </div>
  )
}

function makeTriggerId(baseId: string, value: string) {
  return `${baseId}-${value}-trigger`
}

function makeContentId(baseId: string, value: string) {
  return `${baseId}-${value}-content`
}

interface SetActiveTabProps extends HasValueSignalString {
  value: string
}

function setActiveTab(p: SetActiveTabProps) {
  const prev = p.valueSignal.get()
  // console.log("setActiveTab", p.value, "prev:", prev)
  if (prev === p.value) return
  p.valueSignal.set(p.value)
}

interface OptionProps {
  value: string
  valueSignal: SignalObject<string>
}

function isSelected(p: OptionProps) {
  return p.value === p.valueSignal.get()
}

interface GetTextProps {
  value: string
  valueAmount?: (value: string) => number | undefined
  valueText?: (value: string) => string
}

function getText(p: GetTextProps): string {
  const amount = p.valueAmount?.(p.value)
  const text = p.valueText?.(p.value) || p.value
  if (!amount) return text
  return `${text} (${amount})`
}
