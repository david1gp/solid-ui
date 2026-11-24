import { Show } from "solid-js"
import { classArr } from "#ui/utils/classArr.js"
import { footerModernNewsletterStateCreate } from "./footerModernNewsletterStateCreate.js"

/** Rounded newsletter field with an embedded subscribe button, solid surface in theme colors. */
export function FooterModernNewsletterPill() {
  const state = footerModernNewsletterStateCreate()
  return (
    <form class={"mt-8 w-full max-w-md"} novalidate onSubmit={state.submit}>
      <div
        class={classArr(
          "flex rounded-full border bg-background p-1.5 shadow-sm", // layout
          "focus-within:ring-2 focus-within:ring-foreground/30", // focus
          state.error() ? "border-red-500 dark:border-red-400" : "border-border",
        )}
      >
        <label for={"footer-modern-email"} class={"sr-only"}>
          E-Mail-Adresse
        </label>
        <input
          id={"footer-modern-email"}
          type={"email"}
          autocomplete={"email"}
          placeholder={"Deine E-Mail-Adresse"}
          value={state.email()}
          onInput={(e) => state.input(e.currentTarget.value)}
          aria-invalid={state.error() ? "true" : "false"}
          aria-describedby={"footer-modern-hint"}
          class={
            "min-w-0 flex-1 rounded-full bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          }
        />
        <button
          type={"submit"}
          class={
            "shrink-0 cursor-pointer rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          }
        >
          Abonnieren
        </button>
      </div>
      <p
        id={"footer-modern-hint"}
        class={classArr("mt-3 text-xs", state.error() ? "text-red-600 dark:text-red-300" : "text-muted-foreground")}
        aria-live={"polite"}
      >
        <Show
          when={state.error()}
          fallback={
            state.subscribed()
              ? `Fast geschafft – bitte bestätige die E-Mail an ${state.subscribed()}.`
              : "Kein Spam, jederzeit abbestellbar."
          }
        >
          {state.error()}
        </Show>
      </p>
    </form>
  )
}
