import { mdiClose } from "@adaptive-ds/mdi/mdiClose.js"
import { Show } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import type { kalenderStateCreate } from "./kalenderStateCreate.js"

type State = ReturnType<typeof kalenderStateCreate>

/** Confirmation after create, save or delete, with "Rückgängig". */
export function KalenderToast(props: { state: State }) {
  return (
    <div
      aria-live="polite"
      class="pointer-events-none fixed inset-x-0 bottom-16 z-30 flex justify-center px-4 sm:bottom-4"
    >
      <Show when={props.state.toast()}>
        {(message) => (
          <div
            role="status"
            class="pointer-events-auto flex items-center gap-3 rounded-lg bg-neutral-900 py-2 pl-4 pr-2 text-sm text-white shadow-xl dark:bg-neutral-100 dark:text-neutral-900"
          >
            <span>{message()}</span>
            <button
              type="button"
              class="rounded px-2 py-1 font-semibold text-violet-300 hover:bg-white/10 dark:text-violet-700 dark:hover:bg-black/5"
              onClick={props.state.toastUndo}
            >
              Rückgängig
            </button>
            <button
              type="button"
              aria-label="Meldung schließen"
              class="rounded p-1 hover:bg-white/10 dark:hover:bg-black/5"
              onClick={props.state.toastClose}
            >
              <Icon path={mdiClose} class="size-4" />
            </button>
          </div>
        )}
      </Show>
    </div>
  )
}
