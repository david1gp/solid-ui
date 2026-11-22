import { cn } from "cn"
import type { MobileTableClassNames } from "#ui/table/shared/MobileTableClassNames.js"
import type { TableColumnDef } from "#ui/table/shared/TableColumnDef.js"
import type { MayHaveChildren } from "#ui/utils/MayHaveChildren.js"

export type Table1aMEntryProps<T> = {
  row: T
  columns: TableColumnDef<T>[]
  mobileClasses?: MobileTableClassNames
}

/** Renders one table1 mobile card with its field rows. */
export function Table1MEntry<T>(p: Table1aMEntryProps<T>) {
  return (
    <div class={cn("flex flex-col flex-wrap gap-2", p.mobileClasses?.entry)}>
      {p.columns.map((header, i) => {
        if (i === 0) return <MobileEntryFirst mobileClasses={p.mobileClasses}>{header.cell(p.row)}</MobileEntryFirst>
        return (
          <MobileEntryOther headerName={header.name} mobileClasses={p.mobileClasses}>
            {header.cell(p.row)}
          </MobileEntryOther>
        )
      })}
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
