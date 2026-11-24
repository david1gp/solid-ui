import type { JSX } from "@solidjs/web"
import { Show } from "solid-js"
import { FieldError } from "../FieldError.jsx"

export function RegisterLoginField(props: {
  id: string
  label: string
  error?: string
  children: JSX.Element
  action?: JSX.Element
  header?: boolean
  after?: JSX.Element
}) {
  return (
    <div class="field">
      <Show when={props.header} fallback={<label for={props.id}>{props.label}</label>}>
        <div class="field-header">
          <label for={props.id}>{props.label}</label>
          {props.action}
        </div>
      </Show>
      {props.children}
      <FieldError id={`${props.id}Error`} message={props.error} />
      {props.after}
    </div>
  )
}
