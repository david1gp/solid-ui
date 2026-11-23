import type { Element as JSXElement } from "solid-js"

/** "How to" tab on the home page: how to hand a template or a single element over to an AI session. */
export function HomeHowTo() {
  return (
    <div class={"max-w-3xl space-y-6 py-6"}>
      <div class={"space-y-2"}>
        <h2 class={"text-3xl font-semibold"}>How to use the templates</h2>
        <p class={"text-lg"}>
          The templates are meant to be handed to an AI coding assistant. You give it a link (or a copied element) and
          tell it where to build it in your app.
        </p>
      </div>

      <section class={"space-y-3"}>
        <h3 class={"text-xl font-semibold"}>Use a whole template</h3>
        <ol class={"list-decimal space-y-2 pl-6"}>
          <li>Open the demo page you want from one of the category tabs.</li>
          <li>Copy the link of that demo page from the address bar of your browser.</li>
          <li>Start a new AI session and paste the link there.</li>
          <li>Tell the AI to use this template for your page.</li>
        </ol>
      </section>

      <section class={"space-y-3"}>
        <h3 class={"text-xl font-semibold"}>Use only a single element of a page</h3>
        <ol class={"list-decimal space-y-2 pl-6"}>
          <li>Open the demo page and paste its link into a new AI session, as described above.</li>
          <li>
            Press <Kbd>F12</Kbd> to open the browser developer tools.
          </li>
          <li>
            Click the <strong>"Select an element"</strong> button{" "}
            <span
              class={
                "inline-flex items-center justify-center align-middle size-6 rounded border border-border bg-background"
              }
            >
              <SelectElementIcon />
            </span>{" "}
            in the top left corner of the developer tools (shortcut <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>C</Kbd>,
            on Mac <Kbd>Cmd</Kbd> + <Kbd>Shift</Kbd> + <Kbd>C</Kbd>).
          </li>
          <li>
            Click the element on the page you want. It gets highlighted on the right in the code (Elements panel).
          </li>
          <li>
            Right-click the highlighted element in the code and choose <strong>Copy</strong> →{" "}
            <strong>Copy element</strong>.
          </li>
          <li>Paste the copied element into the same AI session as well.</li>
          <li>Tell the AI to copy this element and add it at the place you want.</li>
        </ol>
      </section>

      <section class={"space-y-2"}>
        <h3 class={"text-xl font-semibold"}>Example prompt</h3>
        <pre
          class={
            "whitespace-pre-wrap break-words [overflow-wrap:anywhere] rounded-lg border border-border/60 bg-background/60 p-4 font-mono text-sm dark:bg-background/40"
          }
        >
          {`Here is a template: https://adaptive-solid-ui.pages.dev/modules/DemoRegisterCi

Here is the element I want from it:
<copied element>

Copy this element and add it to the login page below the password field.`}
        </pre>
      </section>
    </div>
  )
}

function Kbd(p: { children: JSXElement }) {
  return (
    <kbd class={"rounded border border-border bg-background px-1.5 py-0.5 font-mono text-xs shadow-sm"}>
      {p.children}
    </kbd>
  )
}

/** Mirrors the Chrome DevTools "Select an element" icon: a frame with a mouse pointer in its corner. */
function SelectElementIcon() {
  return (
    <svg viewBox="0 0 24 24" class={"size-4"} fill="none" aria-hidden="true">
      <path
        d="M10 18H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v5"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
      <path d="M12 12l9 3.4-3.9 1.5-1.5 3.9z" fill="currentColor" />
    </svg>
  )
}
