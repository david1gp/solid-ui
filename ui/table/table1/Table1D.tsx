import { cn } from "cn"
import { For, Show } from "solid-js"
import type { DesktopTableClassNames } from "#ui/table/shared/DesktopTableClassNames.js"
import { sharedTableRowClassName } from "#ui/table/shared/sharedTableRowClassName.js"
import type { Table1Data } from "#ui/table/table1/Table1Data.js"
import type { Table1DTexts } from "#ui/table/table1/Table1DTexts.js"
import { table1DTextDefault } from "#ui/table/table1/Table1DTexts.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"

export interface Table1aDProps<T> extends Table1Data<T>, MayHaveClass {
  desktopClasses?: DesktopTableClassNames
  texts?: Table1DTexts
}

/** Renders table1 desktop full-table layout. */
export function Table1D<T>(p: Table1aDProps<T>) {
  return (
    <Show
      when={p.rows.length > 0}
      fallback={
        <span class={cn("text-lg text-center p-2 pt-6", p.class)}>
          {p.texts?.noEntries ?? table1DTextDefault.noEntries}
        </span>
      }
    >
      <table class={cn("overflow-x-auto", p.class, p.desktopClasses?.class)}>
        <thead>
          <tr>
            <For each={p.columns}>
              {(h) => (
                <th
                  scope="col"
                  class={cn("text-left", "px-4 py-2", p.desktopClasses?.header, h.headerClass)}
                  title={h.title}
                >
                  {h.name}
                </th>
              )}
            </For>
          </tr>
        </thead>
        <tbody>
          <For each={p.rows}>
            {(row) => (
              <tr class={cn(sharedTableRowClassName, p.desktopClasses?.row)}>
                <For each={p.columns}>
                  {(h) => <td class={cn(p.desktopClasses?.data, h.dataClass)}>{h.cell(row)}</td>}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </Show>
  )
}
