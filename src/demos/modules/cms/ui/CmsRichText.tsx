import { createEffect, For } from "solid-js"

export interface CmsRichTextProps {
  value: string
  onChange: (html: string) => void
  labels?: Partial<{
    bold: string
    italic: string
    heading: string
    list: string
    link: string
    linkPrompt: string
    editor: string
  }>
}

/** Demo HTML editor. Sanitize HTML before displaying it in a trusted context. */
export function CmsRichText(p: CmsRichTextProps) {
  let editor: HTMLDivElement | undefined
  const labels = () => ({
    bold: "Fett",
    italic: "Kursiv",
    heading: "Überschrift",
    list: "Liste",
    link: "Link",
    linkPrompt: "Link-Adresse eingeben",
    editor: "Texteditor",
    ...p.labels,
  })
  const commands = () => [
    { label: labels().bold, text: "B", command: "bold", value: undefined },
    { label: labels().italic, text: "I", command: "italic", value: undefined },
    { label: labels().heading, text: "H2", command: "formatBlock", value: "h2" },
    { label: labels().list, text: "• Liste", command: "insertUnorderedList", value: undefined },
  ]
  const run = (command: string, value?: string) => {
    editor?.focus()
    document.execCommand(command, false, value)
    if (editor) p.onChange(editor.innerHTML)
  }
  const link = () => {
    const url = window.prompt(labels().linkPrompt)
    if (!url || !/^(https?:|mailto:|\/|#)/i.test(url)) return
    run("createLink", url)
  }
  createEffect(
    () => p.value,
    (value) => {
      if (editor && editor.innerHTML !== value) editor.innerHTML = value
    },
  )
  return (
    <div class="overflow-hidden rounded-xl border border-neutral-200 dark:border-white/10">
      <div
        class="flex flex-wrap gap-1 border-b border-neutral-200 p-2 dark:border-white/10"
        role="toolbar"
        aria-label={labels().editor}
      >
        <For each={commands()}>
          {(item) => (
            <button
              type="button"
              title={item.label}
              aria-label={item.label}
              class="rounded-lg px-2 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-white/10"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => run(item.command, item.value)}
            >
              {item.text}
            </button>
          )}
        </For>
        <button
          type="button"
          title={labels().link}
          aria-label={labels().link}
          class="rounded-lg px-2 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-white/10"
          onMouseDown={(event) => event.preventDefault()}
          onClick={link}
        >
          ↗
        </button>
      </div>
      <div
        ref={editor}
        contenteditable
        role="textbox"
        aria-multiline="true"
        aria-label={labels().editor}
        class="min-h-32 p-3 text-sm outline-none"
        onInput={() => {
          if (editor) p.onChange(editor.innerHTML)
        }}
      />
    </div>
  )
}
