import { classesLabel } from "#ui/input/label/classesLabel"
import { classMerge } from "#ui/utils/classMerge"
import { type Component, type ComponentProps, splitProps } from "solid-js"

export const LabelPseudo: Component<ComponentProps<"span">> = (p) => {
  const [s, rest] = splitProps(p, ["class"])
  return <span class={classMerge(classesLabel, s.class)} {...rest} />
}
