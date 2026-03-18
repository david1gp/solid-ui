import { LinkText } from "#ui/interactive/link/LinkText"
import type { MayHaveClass } from "#ui/utils/MayHaveClass"
import { classMerge } from "#ui/utils/classMerge"
import { Show } from "solid-js"

export interface TextOrLinkProps extends MayHaveClass {
  text: string
}

export function TextOrLink(p: TextOrLinkProps) {
  const isLink = () => p.text.startsWith("http")

  return (
    <Show when={isLink()} fallback={<p class={classMerge(p.class)}>{p.text}</p>}>
      <LinkText href={p.text}>{p.text}</LinkText>
    </Show>
  )
}
