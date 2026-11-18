import { mdiCheckboxBlankOutline } from "@adaptive-ds/mdi/mdiCheckboxBlankOutline.js"
import { mdiCheckboxMarked } from "@adaptive-ds/mdi/mdiCheckboxMarked.js"
import { cn } from "cn"
import { type ComponentProps, splitProps } from "solid-js"
import { classesDisabledDirectly } from "#ui/classes/classesDisabledDirectly.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import type { MayHaveChildren } from "#ui/utils/MayHaveChildren.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"
import type { MayHaveDisabled } from "#ui/utils/MayHaveDisabled.js"

interface CheckboxProps extends MayHaveClass, MayHaveChildren, MayHaveDisabled, ComponentProps<"checkbox"> {
  id?: string
  checked: boolean
  onChange: (checked: boolean) => void
}

/** Accessible labeled checkbox driven by a controlled `checked`/`onChange` pair. */
export function Checkbox(p: CheckboxProps) {
  const [s, rest] = splitProps(p, ["id", "checked", "onChange", "disabled", "class", "children"])
  return (
    <div class={cn("flex items-start gap-1", s.class)}>
      <input
        id={s.id}
        type="checkbox"
        checked={s.checked}
        onChange={(e) => s.onChange(e.currentTarget.checked)}
        class="sr-only invisible"
        disabled={s.disabled}
        aria-describedby={s.id ? `${s.id}-error` : undefined}
        {...rest}
      />
      <label
        for={s.id}
        class={cn(
          "flex items-start gap-1", // layout (box + text)
          "cursor-pointer", // interaction
          s.disabled && classesDisabledDirectly, // disabled state
        )}
      >
        <span aria-hidden="true" class={cn("size-6", "flex items-center justify-center")}>
          <Icon path={s.checked ? mdiCheckboxMarked : mdiCheckboxBlankOutline} class="size-6 text-current" />
        </span>
        {s.children}
      </label>
    </div>
  )
}
