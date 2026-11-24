import type { JSX } from "@solidjs/web"
import { Show } from "solid-js"

export function RegisterLoginPasswordInput(props: {
  children: JSX.Element
  visible: boolean
  showLabel: string
  hideLabel: string
  onToggle: () => void
}) {
  return (
    <div class="input-wrap">
      {props.children}
      <button
        class="password-toggle"
        type="button"
        aria-label={props.visible ? props.hideLabel : props.showLabel}
        aria-pressed={props.visible ? "true" : "false"}
        onClick={props.onToggle}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <Show
            when={!props.visible}
            fallback={
              <path
                d="m4 4 16 16M10.6 6.1A9.7 9.7 0 0 1 12 6c6 0 9.5 6 9.5 6a15 15 0 0 1-2.2 2.8M14.6 14.6A3.7 3.7 0 0 1 9.4 9.4M6.2 7.1A16 16 0 0 0 2.5 12s3.5 6 9.5 6c1 0 1.9-.2 2.8-.5"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
              />
            }
          >
            <path
              d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
              stroke="currentColor"
              stroke-width="1.7"
            />
            <circle cx="12" cy="12" r="2.6" stroke="currentColor" stroke-width="1.7" />
          </Show>
        </svg>
      </button>
    </div>
  )
}
