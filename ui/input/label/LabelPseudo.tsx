import { classesLabel } from "#ui/input/label/classesLabel.js"
import { classMerge } from "#ui/utils/classMerge.js"
import { type Component, type ComponentProps, splitProps } from "solid-js"

export const LabelPseudo: Component<ComponentProps<"span">> = (p) => {
  const [s, rest] = splitProps(p, ["class"])
  return <span class={classMerge(classesLabel, s.class)} {...rest} />
}
