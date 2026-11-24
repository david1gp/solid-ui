import { For, Show } from "solid-js"
import { CmsRichText } from "../../ui/CmsRichText.js"
import { CmsTree } from "../../ui/CmsTree.js"
import { PageHeader } from "../../ui/PageHeader.js"
import { cmsPagesStateCreate } from "./cmsPagesStateCreate.js"

const text = {
  de: {
    title: "Seiten",
    description: "Verwalten und gestalten Sie Ihre Seiten.",
    addPage: "Seite hinzufügen",
    edit: "Bearbeiten",
    back: "Zurück zu den Seiten",
    pageTitle: "Seitentitel",
    addBlock: "Block hinzufügen",
    heading: "Überschrift",
    richText: "Rich Text",
    settings: "Blockeinstellungen",
    selectBlock: "Wählen Sie einen Block aus.",
    content: "Inhalt",
    alignment: "Ausrichtung",
    left: "Links",
    center: "Zentriert",
    right: "Rechts",
    delete: "Block löschen",
    up: "Nach oben",
    down: "Nach unten",
    desktop: "Desktop",
    tablet: "Tablet",
    mobile: "Mobil",
    preview: "Vorschau",
    expand: "Aufklappen",
    collapse: "Zuklappen",
    missing: "Seite nicht gefunden",
    empty: "Fügen Sie einen Block hinzu, um zu beginnen.",
    bold: "Fett",
    italic: "Kursiv",
    list: "Liste",
    link: "Link",
    linkPrompt: "Link-Adresse eingeben",
    editor: "Texteditor",
  },
  en: {
    title: "Pages",
    description: "Manage and design your pages.",
    addPage: "Add page",
    edit: "Edit",
    back: "Back to pages",
    pageTitle: "Page title",
    addBlock: "Add block",
    heading: "Heading",
    richText: "Rich text",
    settings: "Block settings",
    selectBlock: "Select a block.",
    content: "Content",
    alignment: "Alignment",
    left: "Left",
    center: "Center",
    right: "Right",
    delete: "Delete block",
    up: "Move up",
    down: "Move down",
    desktop: "Desktop",
    tablet: "Tablet",
    mobile: "Mobile",
    preview: "Preview",
    expand: "Expand",
    collapse: "Collapse",
    missing: "Page not found",
    empty: "Add a block to get started.",
    bold: "Bold",
    italic: "Italic",
    list: "List",
    link: "Link",
    linkPrompt: "Enter link URL",
    editor: "Text editor",
  },
}
const button =
  "rounded-xl border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-white/10"
const field = "w-full rounded-xl border border-neutral-200 bg-transparent px-3 py-2 text-sm dark:border-neutral-700"

export function CmsPagesView(props: { id?: string }) {
  const state = cmsPagesStateCreate(() => props.id)
  return (
    <Show
      when={!props.id}
      fallback={
        <div class="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white text-neutral-900 dark:bg-[#222326] dark:text-white">
          <header class="flex flex-wrap items-center gap-3 border-b border-neutral-200 p-4 dark:border-neutral-700">
            <button type="button" class={button} onClick={state.close}>
              ← {text[state.locale()].back}
            </button>
            <Show when={state.page()} fallback={<span>{text[state.locale()].missing}</span>}>
              {(page) => (
                <input
                  class={`${field} max-w-xs font-semibold`}
                  aria-label={text[state.locale()].pageTitle}
                  value={page().title}
                  onInput={(event) => state.rename(event.currentTarget.value)}
                />
              )}
            </Show>
            <div class="ml-auto flex flex-wrap gap-1" aria-label={text[state.locale()].preview}>
              <For each={["desktop", "tablet", "mobile"] as const}>
                {(size) => (
                  <button
                    type="button"
                    class={`${button} ${state.preview() === size ? "bg-neutral-200 dark:bg-neutral-700" : ""}`}
                    aria-pressed={state.preview() === size ? "true" : "false"}
                    onClick={() => state.setPreview(size)}
                  >
                    {text[state.locale()][size]}
                  </button>
                )}
              </For>
            </div>
          </header>
          <Show when={state.page()}>
            {(page) => (
              <div class="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
                <div class="min-w-0 flex-1 overflow-y-auto bg-neutral-100 p-4 dark:bg-neutral-950/30 md:p-8">
                  <div
                    class="mx-auto space-y-3 rounded-2xl border border-neutral-200 bg-white p-4 transition-all dark:border-neutral-700 dark:bg-neutral-900 md:p-6"
                    style={{
                      "max-width":
                        state.preview() === "mobile" ? "375px" : state.preview() === "tablet" ? "768px" : "100%",
                    }}
                  >
                    <Show
                      when={page().blocks.length}
                      fallback={<p class="py-8 text-center text-sm text-neutral-500">{text[state.locale()].empty}</p>}
                    >
                      <For each={page().blocks}>
                        {(block) => (
                          <div
                            draggable="true"
                            onDragStart={(event) => {
                              state.dragStart(block.id)
                              event.dataTransfer?.setData("text/plain", block.id)
                            }}
                            onDragEnd={state.dragEnd}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={(event) => {
                              event.preventDefault()
                              state.drop(block.id)
                            }}
                            class={`rounded-xl border p-3 ${state.selected() === block.id ? "border-blue-500" : "border-neutral-200 dark:border-neutral-700"}`}
                          >
                            <button
                              type="button"
                              class="mb-2 flex w-full items-center gap-2 text-left text-xs text-neutral-500"
                              onClick={() => state.select(block.id)}
                            >
                              <span aria-hidden="true">⋮⋮</span>{" "}
                              {block.type === "heading" ? text[state.locale()].heading : text[state.locale()].richText}
                            </button>
                            <div
                              class="cursor-pointer break-words"
                              style={{ "text-align": block.align }}
                              onClick={() => state.select(block.id)}
                            >
                              <Show
                                when={block.type === "heading"}
                                fallback={
                                  <div class="min-h-8 text-sm whitespace-pre-wrap">
                                    {block.content.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ")}
                                  </div>
                                }
                              >
                                <h2 class="text-xl font-semibold">{block.content}</h2>
                              </Show>
                            </div>
                          </div>
                        )}
                      </For>
                    </Show>
                  </div>
                  <div class="mx-auto mt-4 flex flex-wrap gap-2">
                    <span class="self-center text-sm text-neutral-500">{text[state.locale()].addBlock}:</span>
                    <button type="button" class={button} onClick={() => state.addBlock("heading")}>
                      + {text[state.locale()].heading}
                    </button>
                    <button type="button" class={button} onClick={() => state.addBlock("text")}>
                      + {text[state.locale()].richText}
                    </button>
                  </div>
                </div>
                <aside class="w-full shrink-0 space-y-4 border-t border-neutral-200 p-4 dark:border-neutral-700 lg:w-80 lg:overflow-y-auto lg:border-t-0 lg:border-l">
                  <h2 class="font-semibold">{text[state.locale()].settings}</h2>
                  <Show
                    when={state.block()}
                    fallback={<p class="text-sm text-neutral-500">{text[state.locale()].selectBlock}</p>}
                  >
                    {(block) => (
                      <div class="space-y-4">
                        <label class="block space-y-2 text-sm">
                          <span>{text[state.locale()].content}</span>
                          <Show
                            when={block().type === "heading"}
                            fallback={
                              <CmsRichText
                                value={block().content}
                                onChange={state.setContent}
                                labels={{
                                  bold: text[state.locale()].bold,
                                  italic: text[state.locale()].italic,
                                  heading: text[state.locale()].heading,
                                  list: text[state.locale()].list,
                                  link: text[state.locale()].link,
                                  linkPrompt: text[state.locale()].linkPrompt,
                                  editor: text[state.locale()].editor,
                                }}
                              />
                            }
                          >
                            <input
                              class={field}
                              value={block().content}
                              onInput={(event) => state.setContent(event.currentTarget.value)}
                            />
                          </Show>
                        </label>
                        <label class="block space-y-2 text-sm">
                          <span>{text[state.locale()].alignment}</span>
                          <select
                            class={field}
                            value={block().align}
                            onChange={(event) =>
                              state.setAlign(event.currentTarget.value as "left" | "center" | "right")
                            }
                          >
                            <option value="left">{text[state.locale()].left}</option>
                            <option value="center">{text[state.locale()].center}</option>
                            <option value="right">{text[state.locale()].right}</option>
                          </select>
                        </label>
                        <div class="flex flex-wrap gap-2">
                          <button type="button" class={button} onClick={() => state.moveBlock(-1)}>
                            {text[state.locale()].up}
                          </button>
                          <button type="button" class={button} onClick={() => state.moveBlock(1)}>
                            {text[state.locale()].down}
                          </button>
                          <button type="button" class={button} onClick={state.removeBlock}>
                            {text[state.locale()].delete}
                          </button>
                        </div>
                      </div>
                    )}
                  </Show>
                </aside>
              </div>
            )}
          </Show>
        </div>
      }
    >
      <PageHeader
        title={text[state.locale()].title}
        description={text[state.locale()].description}
        actions={
          <button type="button" class={button} onClick={state.addPage}>
            + {text[state.locale()].addPage}
          </button>
        }
      />
      <CmsTree
        items={state.pages()}
        itemId={(page) => page.id}
        itemChildren={(page) => page.children}
        onMove={state.movePage}
        labels={{ expand: text[state.locale()].expand, collapse: text[state.locale()].collapse }}
        renderItem={(page) => (
          <div class="flex items-center justify-between gap-2">
            <span class="truncate">{page.title}</span>
            <button type="button" class={button} onClick={() => state.open(page.id)}>
              {text[state.locale()].edit}
            </button>
          </div>
        )}
      />
    </Show>
  )
}
