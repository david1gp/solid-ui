import { cn } from "cn"
import type { ParentComponent } from "solid-js"
import { type Component, type Element as JSXElement, merge, Show, omit } from "solid-js"
import { type ComponentProps } from "@solidjs/web"

export interface TimelinePropsItem
  extends Omit<TimelineItemProps, "isActive" | "isActiveBullet" | "isCurrent" | "bulletSize" | "lineSize"> {
  bulletSize?: number
}

export type TimelineProps = {
  items: TimelinePropsItem[]
  activeItem: number
  bulletSize?: number
  lineSize?: number
}

/*
  No bullet or line is active when activeItem is -1
  First bullet is active only if activeItem is 0 or more
  First line is active only if activeItem is 1 or more
*/

const Timeline: Component<TimelineProps> = (rawProps) => {
  const p = merge({ bulletSize: 16, lineSize: 2 }, rawProps)

  return (
    <ol
      style={{
        "padding-left": `${p.bulletSize / 2}px`,
      }}
    >
      {p.items.map((item, index) => {
        return (
          <TimelineItem
            title={item.title}
            description={item.description}
            bullet={item.bullet}
            isLast={index === p.items.length - 1}
            isActive={p.activeItem === -1 ? false : p.activeItem >= index + 1}
            isActiveBullet={p.activeItem === -1 ? false : p.activeItem >= index}
            isCurrent={p.activeItem === index}
            bulletSize={p.bulletSize}
            lineSize={p.lineSize}
          />
        )
      })}
    </ol>
  )
}

export type TimelineItemProps = {
  title: JSXElement
  description?: JSXElement
  bullet?: JSXElement
  isLast?: boolean
  isActive: boolean
  isActiveBullet: boolean
  isCurrent?: boolean
  class?: string
  bulletSize: number
  lineSize: number
}

const TimelineItem: Component<TimelineItemProps> = (p) => {
  const rest = omit(
    p,
    "class",
    "bullet",
    "description",
    "title",
    "isLast",
    "isActive",
    "isActiveBullet",
    "isCurrent",
    "bulletSize",
    "lineSize",
  )
  return (
    <li
      class={cn(
        "relative border-l border-l-neutral-200 pb-8 pl-8 transition-colors dark:border-l-neutral-700",
        p.isLast && "border-l-transparent pb-0 dark:border-l-transparent",
        p.isActive && !p.isLast && "border-l-blue-600 dark:border-l-blue-500",
        p.class,
      )}
      style={{
        "border-left-width": `${p.lineSize}px`,
      }}
      aria-current={p.isCurrent ? "step" : undefined}
      {...rest}
    >
      <TimelineItemBullet
        lineSize={p.lineSize}
        bulletSize={p.bulletSize}
        isActive={p.isActiveBullet}
        isCurrent={p.isCurrent}
      >
        {p.bullet}
      </TimelineItemBullet>
      <TimelineItemTitle class={!p.isActiveBullet ? "text-muted-foreground" : "text-foreground"}>
        {p.title}
      </TimelineItemTitle>
      <Show when={p.description}>
        <TimelineItemDescription>{p.description}</TimelineItemDescription>
      </Show>
    </li>
  )
}

export type TimelineItemBulletProps = {
  children?: JSXElement
  isActive?: boolean
  isCurrent?: boolean
  bulletSize: number
  lineSize: number
}

const TimelineItemBullet: Component<TimelineItemBulletProps> = (p) => {
  return (
    <div
      class={cn(
        "absolute top-0 z-10 flex items-center justify-center rounded-full border border-neutral-300 bg-background text-muted-foreground transition-colors dark:border-neutral-600",
        p.isActive && !p.isCurrent && "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500",
        p.isCurrent &&
          "border-blue-600 bg-background text-blue-600 ring-4 ring-blue-600/15 dark:border-blue-500 dark:text-blue-400 dark:ring-blue-500/25",
      )}
      style={{
        width: `${p.bulletSize}px`,
        height: `${p.bulletSize}px`,
        left: `${-p.bulletSize / 2 - p.lineSize / 2}px`,
        "border-width": `${p.lineSize}px`,
      }}
      aria-hidden="true"
    >
      {p.children}
    </div>
  )
}

const TimelineItemTitle: ParentComponent<{ class?: string }> = (p) => {
  return <div class={cn("mb-1 text-base font-semibold leading-none transition-colors", p.class)}>{p.children}</div>
}

const TimelineItemDescription: Component<ComponentProps<"p">> = (p) => {
  const rest = omit(p, "class", "children")
  return (
    <p class={cn("text-muted-foreground text-sm", p.class)} {...rest}>
      {p.children}
    </p>
  )
}

export { Timeline }
