import { cn } from "cn"
import { omit } from "solid-js"
import { ButtonIcon } from "#ui/interactive/button/ButtonIcon.jsx"
import type { SignalObject } from "#ui/utils/createSignalObject.js"
import { isDisabled } from "#ui/utils/MayHaveDisabledAccessor.js"
import { type ComponentProps } from "@solidjs/web"

/**
 * https://github.com/radix-ui/primitives/blob/main/packages/react/toggle/src/Toggle.tsx
 * https://github.com/mui/base-ui/blob/master/packages/react/src/toggle/useToggle.ts
 */
export interface ToggleButtonProps extends ToggleButtonStateProps, ComponentProps<"button"> {
  title: string
  onClick?: (e: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }) => void
  onPressedChange?: (pressed: boolean) => void
}

type ToggleButtonStateProps = {
  pressedSignal: SignalObject<boolean>
}

/** Button toggling a pressed signal on click. */
export function ToggleButton(p: ToggleButtonProps) {
  const rest = omit(p, "title", "pressedSignal", "disabled", "onPressedChange", "onClick", "children", "class")
  return (
    <ButtonIcon
      type="button"
      title={p.title}
      aria-pressed={p.pressedSignal.get() ? "true" : "false"}
      disabled={isDisabled(p)}
      data-state={p.pressedSignal.get() ? "on" : "off"}
      data-disabled={isDisabled(p)}
      // Visible pressed state; without it toggles look identical on and off.
      class={cn("data-[state=on]:bg-slate-200 dark:data-[state=on]:bg-white/15", p.class)}
      onClick={(e) => {
        const next = togglePressed(p)
        if (p.onPressedChange) {
          p.onPressedChange(next)
        }
        if (p.onClick) p.onClick(e)
      }}
      {...rest}
    >
      {p.children}
    </ButtonIcon>
  )
}

function togglePressed(
  s: Pick<ToggleButtonProps, "disabled" | "title" | "pressedSignal" | "onPressedChange" | "onClick">,
): boolean {
  const prev = s.pressedSignal.get()
  const next = !prev
  s.pressedSignal.set(next)
  return next
}
