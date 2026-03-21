import { classesDisabledDirectly } from "#ui/classes/classesDisabledDirectly.js"
import { buttonCvaIconOnly, type ButtonCvaProps } from "#ui/interactive/button/buttonCva.js"
import { buttonIconCva } from "#ui/interactive/button/buttonIconCva.js"
import { classesButtonClickAnimation } from "#ui/interactive/button/classesButtonClickAnimation.js"
import { classesPopoverContentMerge } from "#ui/interactive/popover/classesPopoverContent.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import type { HasIcon } from "#ui/utils/HasIcon.js"
import type { HasTitle } from "#ui/utils/HasTitle.js"
import type { MayHaveChildren } from "#ui/utils/MayHaveChildren.js"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"
import type { MayHaveInnerClass } from "#ui/utils/MayHaveInnerClass.js"
import { isLoading, type MayHaveIsLoading } from "#ui/utils/MayHaveIsLoading.js"
import Popover from "@corvu/popover"
import { type Component, type ComponentProps, splitProps } from "solid-js"

export interface CorvuPopoverIconProps
  extends Omit<ComponentProps<"button">, "title">,
    ButtonCvaProps,
    HasIcon,
    HasTitle,
    MayHaveClass,
    MayHaveInnerClass,
    MayHaveChildren,
    MayHaveIsLoading {}

export const CorvuPopoverIcon: Component<CorvuPopoverIconProps> = (p) => {
  const [s, rest] = splitProps(p, [
    // button
    "variant",
    "size",
    "class",
    // state
    "isLoading",
    "disabled",
    // icons
    "title",
    "icon",
    "iconClass",
    // popover
    "innerClass",
    "children",
  ])

  return (
    <Popover
      floatingOptions={{
        offset: 8,
        flip: true,
        shift: true,
      }}
    >
      <Popover.Trigger
        class={buttonCvaIconOnly(s.variant, isLoading(p), s.disabled, classesButtonClickAnimation, s.class)}
        title={s.title}
        {...rest}
      >
        <Icon
          path={s.icon}
          class={buttonIconCva(
            s.variant,
            isLoading(p) && "animate-spin-faster",
            s.disabled && classesDisabledDirectly,
            s.iconClass,
          )}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content class={classesPopoverContentMerge(s.innerClass)}>{s.children}</Popover.Content>
      </Popover.Portal>
    </Popover>
  )
}
