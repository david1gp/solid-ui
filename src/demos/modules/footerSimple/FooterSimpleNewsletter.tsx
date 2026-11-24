import { mdiSend } from "@adaptive-ds/mdi/mdiSend.js"
import { Show } from "solid-js"
import { Input } from "#ui/input/input/Input.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"
import { footerSimpleNewsletterStateCreate } from "./footerSimpleNewsletterStateCreate.js"

/** Compact newsletter sign-up with its own German validation message. */
export function FooterSimpleNewsletter(p: { title: string; description: string }) {
  const state = footerSimpleNewsletterStateCreate()
  return (
    <form class={"flex flex-col gap-2"} novalidate onSubmit={state.submit}>
      <h2 class={"text-sm font-semibold text-neutral-950 dark:text-neutral-50"}>{p.title}</h2>
      <p class={"text-sm text-neutral-600 dark:text-neutral-400"}>{p.description}</p>
      <div class={"flex gap-2"}>
        <label for={"footer-simple-newsletter-email"} class={"sr-only"}>
          E-Mail-Adresse
        </label>
        <Input
          id={"footer-simple-newsletter-email"}
          type={"email"}
          autocomplete={"email"}
          placeholder={"name@beispiel.de"}
          class={"min-w-0 flex-1"}
          value={state.email()}
          aria-invalid={state.error() ? "true" : "false"}
          aria-describedby={"footer-simple-newsletter-hint"}
          onInput={(e) => state.input(e.currentTarget.value)}
        />
        <button
          type={"submit"}
          aria-label={"Newsletter abonnieren"}
          title={"Abonnieren"}
          class={classArr(
            "flex items-center justify-center gap-2 shrink-0 h-10 px-3 rounded-md cursor-pointer", // layout
            "text-sm font-medium text-white bg-(--footer-simple-accent) hover:opacity-90", // color
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--footer-simple-accent)", // focus
          )}
        >
          <Icon path={mdiSend} class={"size-4"} />
          <span class={"hidden sm:inline"}>Abonnieren</span>
        </button>
      </div>
      <Show
        when={state.error()}
        fallback={
          <span id={"footer-simple-newsletter-hint"} class={"text-xs text-neutral-500 dark:text-neutral-400"}>
            {state.subscribed()
              ? `Fast geschafft – bitte bestätige die E-Mail an ${state.subscribed()}.`
              : "Kein Spam, jederzeit abbestellbar."}
          </span>
        }
      >
        <span id={"footer-simple-newsletter-hint"} role={"alert"} class={"text-xs text-red-600 dark:text-red-400"}>
          {state.error()}
        </span>
      </Show>
    </form>
  )
}
