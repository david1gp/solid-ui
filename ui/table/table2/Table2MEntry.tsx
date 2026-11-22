import { cn } from "cn"
import { For, Match, Switch } from "solid-js"
import { Separator } from "#ui/static/separator/Separator.jsx"
import type { MobileTableClassNames } from "#ui/table/shared/MobileTableClassNames.js"
import type { TableColumnDef } from "#ui/table/shared/TableColumnDef.js"
import type { MayHaveChildren } from "#ui/utils/MayHaveChildren.js"

export type Table2MEntryProps<T> = {
  row: T
  columns: TableColumnDef<T>[]
  mobileClasses?: MobileTableClassNames
}

/** Renders one table2 mobile card with its field rows. */
export function Table2MEntry<T>(p: Table2MEntryProps<T>) {
  return (
    <div class={cn("flex flex-col flex-wrap gap-2", p.mobileClasses?.entry)}>
      <For each={p.columns}>
        {(header, i) => (
          <>
            <Separator />
            <Switch>
              <Match when={i() === 0}>
                <MobileEntryFirst mobileClasses={p.mobileClasses}>{header.cell(p.row)}</MobileEntryFirst>
              </Match>
              <Match when={i() !== 0}>
                <MobileEntryOther headerName={header.name} mobileClasses={p.mobileClasses}>
                  {header.cell(p.row)}
                </MobileEntryOther>
              </Match>
            </Switch>
          </>
        )}
      </For>
    </div>
  )
}

function MobileEntryFirst(p: { mobileClasses?: MobileTableClassNames } & MayHaveChildren) {
  return <span class={cn("font-semibold", p.mobileClasses?.first)}>{p.children}</span>
}

function MobileEntryOther(p: { headerName: string; mobileClasses?: MobileTableClassNames } & MayHaveChildren) {
  return (
    <span class={cn("flex flex-wrap justify-between", p.mobileClasses?.entry)}>
      <span class={cn("text-gray-600 dark:text-neutral-400", p.mobileClasses?.header)}>{`${p.headerName}:`}</span>
      <span class={cn("text-right", p.mobileClasses?.other)}>{p.children}</span>
    </span>
  )
}
