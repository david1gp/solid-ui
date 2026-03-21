import { Icon } from "#ui/static/icon/Icon.jsx"
import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"
import { classMerge } from "#ui/utils/classMerge.js"
import { mdiCircle } from "@mdi/js"
import { For } from "solid-js"
import { TextOrLink } from "./TextOrLink.js"

export interface BlackBulletPointsProps extends MayHaveClass {
  points: string[] | Readonly<string[]>
  classText?: string
  classBullet?: string
}

export function BlackBulletPoints(p: BlackBulletPointsProps) {
  return (
    <For each={p.points}>
      {(point) => (
        <div class={classMerge("flex gap-1", p.class)}>
          <Icon path={mdiCircle} class={classMerge("size-1.5 mt-2.5 shrink-0", p.classBullet)} />
          <TextOrLink text={point} class={p.classText} />
        </div>
      )}
    </For>
  )
}
