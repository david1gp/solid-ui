import type { MayHaveClass } from "#ui/utils/MayHaveClass.js"
import { classMerge } from "#ui/utils/classMerge.js"

export interface IconProps extends MayHaveClass {
  path: string
  title?: string
  color?: string | null
}

export function Icon(p: IconProps) {
  return (
    <svg
      viewBox={"0 0 24 24"}
      aria-hidden={!p.title}
      stroke-width={0.5}
      class={classMerge("size-6 shrink-0 align-middle dark:fill-white", p.class)}
    >
      <path d={p.path} />
    </svg>
  )
}
