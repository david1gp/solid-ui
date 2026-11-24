import type { JSX } from "@solidjs/web"
import { Button } from "#ui/interactive/button/Button.jsx"

export function RegisterLoginSubmit(props: { children: JSX.Element; loading?: boolean; disabled?: boolean }) {
  return (
    <Button
      class={`primary-button${props.loading ? " loading" : ""}`}
      type="submit"
      disabled={props.loading || props.disabled}
    >
      <span class="spinner" aria-hidden="true" />
      <span>{props.children}</span>
    </Button>
  )
}
