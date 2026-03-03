import { For } from "solid-js"
import { mdiCircle } from "@mdi/js"
import type { MayHaveClass } from "~ui/utils/MayHaveClass"
import { classMerge } from "~ui/utils/classMerge"
import { Icon } from "~ui/static/icon/Icon"
import { TextOrLink } from "./TextOrLink"

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
