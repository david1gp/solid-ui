import { createUniqueId, For, omit } from "solid-js"
import { Input } from "#ui/input/input/Input.jsx"
import type { HasId } from "#ui/utils/HasId.js"
import type { MayHaveClassAndChildren } from "#ui/utils/MayHaveClassAndChildren.js"

export interface ResourceListSearchProps extends ComponentProps<"input"> {
  getOptions: () => string[]
  optionDisplayText?: (option: string) => string
}

/** Text input with autocomplete suggestions from a datalist. */
export function InputDatalist(p: ResourceListSearchProps) {
  const rest = omit(p, "id", "class", "type", "list")
  const fallbackId = createUniqueId()
  const id = () => p.id ?? fallbackId
  const listId = () => `${id()}-options`

  return (
    <>
      <Input id={id()} type={p.type ?? "text"} class={p.class} list={listId()} {...rest} />
      <DataList id={listId()} getOptions={p.getOptions} optionDisplayText={p.optionDisplayText} />
    </>
  )
}

import { type ComponentProps } from "@solidjs/web"

interface DataListProps extends HasId, MayHaveClassAndChildren {
  getOptions: () => string[]
  optionDisplayText?: (option: string) => string
}

function DataList(p: DataListProps) {
  return (
    <datalist id={p.id}>
      <For each={p.getOptions()}>
        {(item) => <option value={item}>{p.optionDisplayText ? p.optionDisplayText(item) : item}</option>}
      </For>
    </datalist>
  )
}
