import { Show } from "solid-js"

/** Inline validation message below a form field. */
export function RegisterCiFieldError(p: { id: string; message?: string }) {
  return (
    <Show when={p.message}>
      <p class="rc-field-error" id={p.id} role="alert">
        {p.message}
      </p>
    </Show>
  )
}
