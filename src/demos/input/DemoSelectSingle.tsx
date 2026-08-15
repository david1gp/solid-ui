import type { JSX } from "solid-js"
import { demoGetTextValue } from "#src/demos/input/demoGetTextValue.jsx"
import { SelectSingle } from "#ui/input/select/SelectSingle.jsx"
import type { SelectSingleEntry } from "#ui/input/select/SelectSingleEntry.js"
import { classesGridCols3xl } from "#ui/static/grid/classesGridCols.js"
import { PageWrapper } from "#ui/static/page/PageWrapper.jsx"
import { classArr } from "#ui/utils/classArr.js"
import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { arrCreate } from "#utils/arr/arrCreate.js"

const basicEntries: SelectSingleEntry[] = [
  { type: "item", value: "Apple" },
  { type: "item", value: "Banana" },
  { type: "item", value: "Cherry" },
]
const densityEntries: SelectSingleEntry[] = [
  { type: "item", value: "compact" },
  { type: "item", value: "comfortable" },
  { type: "item", value: "spacious" },
]
const groupedEntries: SelectSingleEntry[] = [
  { type: "group", label: "Warm drinks" },
  { type: "item", value: "Espresso" },
  { type: "item", value: "Tea" },
  { type: "group", label: "Cold drinks" },
  { type: "item", value: "Iced coffee" },
  { type: "item", value: "Lemonade" },
]
const options100Strings = arrCreate<string>(100, (i) => "" + i)
const entries100: SelectSingleEntry[] = options100Strings.map((value) => ({ type: "item", value }))

const basicValueSignal = createSignalObject("")
const densityValueSignal = createSignalObject("")
const groupedValueSignal = createSignalObject("")
const hundredValueSignal = createSignalObject("")

export function DemoSelectSingle() {
  return (
    <PageWrapper
      innerClass={classArr(
        "max-w-2xl", // sizing
        "space-y-8", // spacing
      )}
    >
      <h1 class={classArr("text-3xl font-bold")}>SelectSingle Demo</h1>
      <SelectExample title="Basic">
        <SelectSingle valueSignal={basicValueSignal} getOptions={() => basicEntries} buttonProps={{}} />
      </SelectExample>
      <SelectExample title="Custom-rendered items">
        <SelectSingle
          valueSignal={densityValueSignal}
          getOptions={() => densityEntries}
          valueText={densityValueText}
          renderItem={renderDensityItem}
          buttonProps={{}}
        />
      </SelectExample>
      <SelectExample title="Inline category headings">
        <SelectSingle
          valueSignal={groupedValueSignal}
          getOptions={() => groupedEntries}
          innerClass={classArr(
            "grid grid-cols-1", // layout
            "gap-y-1", // spacing
          )}
          buttonProps={{}}
        />
      </SelectExample>
      <SelectExample title="100 items">
        <SelectSingle
          valueSignal={hundredValueSignal}
          getOptions={() => entries100}
          valueText={demoGetTextValue}
          innerClass={classArr(
            classesGridCols3xl, // responsive grid
            "max-h-80 overflow-y-auto", // bounded scrolling
            "gap-x-2 gap-y-1", // spacing
          )}
          buttonProps={{}}
        />
      </SelectExample>
    </PageWrapper>
  )
}

interface SelectExampleProps {
  title: string
  children: JSX.Element
}

function SelectExample(p: SelectExampleProps) {
  return (
    <section>
      <h2
        class={classArr(
          "text-lg font-semibold", // typography
          "mb-2", // spacing
        )}
      >
        {p.title}
      </h2>
      {p.children}
    </section>
  )
}

function renderDensityItem(value: string): JSX.Element {
  return (
    <span
      class={classArr(
        "flex flex-col items-start", // layout
        "leading-tight", // typography
      )}
    >
      <span class={classArr("font-medium")}>{densityValueText(value)}</span>
      <span class={classArr("text-xs text-muted-foreground")}>{densityDescription(value)}</span>
    </span>
  )
}

function densityValueText(value: string): string {
  if (value === "compact") return "Compact"
  if (value === "comfortable") return "Comfortable"
  return "Spacious"
}

function densityDescription(value: string): string {
  if (value === "compact") return "More content at once"
  if (value === "comfortable") return "Balanced spacing"
  return "Extra breathing room"
}
