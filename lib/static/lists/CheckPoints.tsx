import { For } from "solid-js"
import { mdiCheck } from "@mdi/js"
import type { MayHaveClass } from "~ui/utils/MayHaveClass"
import { classMerge } from "~ui/utils/classMerge"
import { Icon } from "~ui/static/icon/Icon"
import { TextOrLink } from "./TextOrLink"

export interface CheckPointsProps extends MayHaveClass {
  points: string[] | Readonly<string[]>
  classText?: string
  classBullet?: string
}

export function CheckPoints(p: CheckPointsProps) {
  return (
    <For each={p.points}>
      {(point) => (
        <div class={classMerge("flex flex-row flex-nowrap", p.class)}>
          <Icon
            path={mdiCheck}
            class={classMerge("fill-green-600 dark:fill-green-600 mr-1 flex-none", p.classBullet)}
          />
          <TextOrLink text={point} class={p.classText} />
        </div>
      )}
    </For>
  )
}
