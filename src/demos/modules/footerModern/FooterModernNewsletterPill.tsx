import { Show } from "solid-js"
import { footerSimpleNewsletterStateCreate } from "#src/demos/modules/footerSimple/footerSimpleNewsletterStateCreate.js"

export function FooterModernNewsletterPill() {
  const state = footerSimpleNewsletterStateCreate()
  return (
    <form class={"mt-8 w-full max-w-md"} novalidate onSubmit={state.submit}>
      <div class={"flex rounded-full border border-white/35 bg-[#253a46]/70 p-1.5 shadow-lg backdrop-blur-xl"}>
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
            "min-w-0 flex-1 rounded-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-white/75 focus-visible:ring-2 focus-visible:ring-white"
          }
        />
        <button
          type={"submit"}
          class={
            "shrink-0 cursor-pointer rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#263c47] hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          }
        >
          Abonnieren
        </button>
      </div>
      <p id={"footer-modern-hint"} class={"mt-3 text-xs text-white"} aria-live={"polite"}>
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
