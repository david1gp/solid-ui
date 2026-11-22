import { mdiCheckboxBlankOutline } from "@adaptive-ds/mdi/mdiCheckboxBlankOutline.js"
import { mdiCheckboxMarked } from "@adaptive-ds/mdi/mdiCheckboxMarked.js"
import { cn } from "cn"
import { omit } from "solid-js"
import { classesDisabledDirectly } from "#ui/classes/classesDisabledDirectly.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import type { MayHaveChildren } from "#ui/utils/MayHaveChildren.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"
import type { MayHaveDisabled } from "#ui/utils/MayHaveDisabled.js"
import { type ComponentProps } from "@solidjs/web";

interface CheckboxProps extends MayHaveClass, MayHaveChildren, MayHaveDisabled, ComponentProps<"checkbox"> {
  id?: string
  checked: boolean
  onChange: (checked: boolean) => void
}

/** Accessible labeled checkbox driven by a controlled `checked`/`onChange` pair. */
export function Checkbox(p: CheckboxProps) {
  const rest = omit(p, "id", "checked", "onChange", "disabled", "class", "children")
  return (
    <div class={cn("flex items-start gap-1", p.class)}>
      <input
        id={p.id}
        type="checkbox"
        checked={p.checked}
        onChange={(e) => p.onChange(e.currentTarget.checked)}
        class="sr-only invisible"
        disabled={p.disabled}
        aria-describedby={p.id ? `${p.id}-error` : undefined}
        {...rest}
      />
      <label
        for={p.id}
        class={cn(
          "flex items-start gap-1", // layout (box + text)
          "cursor-pointer", // interaction
          p.disabled && classesDisabledDirectly, // disabled state
        )}
      >
        <span aria-hidden="true" class={cn("size-6", "flex items-center justify-center")}>
          <Icon path={p.checked ? mdiCheckboxMarked : mdiCheckboxBlankOutline} class="size-6 text-current" />
        </span>
        {p.children}
      </label>
    </div>
  )
}
