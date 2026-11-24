import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { cmsLocale } from "../../i18n/cmsLocale.js"
import { cmsNavigate } from "../../shell/cmsNavigate.js"

type Block = { id: string; type: "text" | "heading"; content: string; align: "left" | "center" | "right" }
type Page = { id: string; title: string; children: Page[]; blocks: Block[] }

const pages = createSignalObject<Page[]>([
  {
    id: "home",
    title: "Startseite",
    children: [
      {
        id: "about",
        title: "Über uns",
        children: [],
        blocks: [{ id: "about-text", type: "text", content: "<p>Willkommen auf unserer Website.</p>", align: "left" }],
      },
      { id: "contact", title: "Kontakt", children: [], blocks: [] },
    ],
    blocks: [
      { id: "home-heading", type: "heading", content: "Willkommen", align: "left" },
      { id: "home-text", type: "text", content: "<p>Gestalten Sie Ihre Seite mit Inhaltsblöcken.</p>", align: "left" },
    ],
  },
  { id: "services", title: "Leistungen", children: [], blocks: [] },
])
let nextId = 0
const newId = () => `page-block-${Date.now()}-${++nextId}`
const pageFind = (items: Page[], id: string): Page | undefined => {
  for (const page of items) {
    if (page.id === id) return page
    const child = pageFind(page.children, id)
    if (child) return child
  }
  return undefined
}
const pageUpdate = (items: Page[], id: string, update: (page: Page) => Page): Page[] =>
  items.map((page) => (page.id === id ? update(page) : { ...page, children: pageUpdate(page.children, id, update) }))
const pageRemove = (items: Page[], id: string): Page[] =>
  items.filter((page) => page.id !== id).map((page) => ({ ...page, children: pageRemove(page.children, id) }))
const pageInsert = (items: Page[], target: string, page: Page, position: "before" | "after"): Page[] => {
  const index = items.findIndex((item) => item.id === target)
  if (index !== -1) {
    const result = [...items]
    result.splice(index + (position === "after" ? 1 : 0), 0, page)
    return result
  }
  return items.map((item) => ({ ...item, children: pageInsert(item.children, target, page, position) }))
}

export function cmsPagesStateCreate(id: () => string | undefined) {
  const selected = createSignalObject<string | undefined>(undefined)
  const preview = createSignalObject<"desktop" | "tablet" | "mobile">("desktop")
  const drag = createSignalObject<string | undefined>(undefined)
  const page = () => (id() ? pageFind(pages.get(), id() as string) : undefined)
  const block = () => page()?.blocks.find((item) => item.id === selected.get())
  const updatePage = (update: (page: Page) => Page) => {
    const current = page()
    if (current) pages.set(pageUpdate(pages.get(), current.id, update))
  }
  const updateBlock = (update: (block: Block) => Block) =>
    updatePage((current) => ({
      ...current,
      blocks: current.blocks.map((item) => (item.id === selected.get() ? update(item) : item)),
    }))
  return {
    pages: () => pages.get(),
    page,
    block,
    selected: () => selected.get(),
    preview: () => preview.get(),
    locale: () => cmsLocale.get(),
    open: (pageId: string) => {
      selected.set(undefined)
      cmsNavigate("pages", pageId)
    },
    close: () => {
      selected.set(undefined)
      cmsNavigate("pages")
    },
    addPage: () => {
      const pageId = newId()
      pages.set([
        ...pages.get(),
        { id: pageId, title: cmsLocale.get() === "de" ? "Neue Seite" : "New page", children: [], blocks: [] },
      ])
      cmsNavigate("pages", pageId)
    },
    movePage: (source: string, target: string, position: "before" | "after") => {
      const item = pageFind(pages.get(), source)
      if (!item || pageFind(item.children, target)) return
      pages.set(pageInsert(pageRemove(pages.get(), source), target, item, position))
    },
    rename: (title: string) => updatePage((current) => ({ ...current, title })),
    select: (blockId: string) => selected.set(blockId),
    setPreview: (value: "desktop" | "tablet" | "mobile") => preview.set(value),
    addBlock: (type: Block["type"]) => {
      const blockId = newId()
      updatePage((current) => ({
        ...current,
        blocks: [
          ...current.blocks,
          {
            id: blockId,
            type,
            content: type === "heading" ? (cmsLocale.get() === "de" ? "Überschrift" : "Heading") : "<p></p>",
            align: "left",
          },
        ],
      }))
      selected.set(blockId)
    },
    setContent: (content: string) => updateBlock((item) => ({ ...item, content })),
    setAlign: (align: Block["align"]) => updateBlock((item) => ({ ...item, align })),
    removeBlock: () => {
      updatePage((current) => ({ ...current, blocks: current.blocks.filter((item) => item.id !== selected.get()) }))
      selected.set(undefined)
    },
    dragStart: (blockId: string) => drag.set(blockId),
    dragEnd: () => drag.set(undefined),
    drop: (target: string) => {
      const source = drag.get()
      if (!source || source === target) return
      updatePage((current) => {
        const blocks = [...current.blocks]
        const from = blocks.findIndex((item) => item.id === source)
        const to = blocks.findIndex((item) => item.id === target)
        if (from < 0 || to < 0) return current
        const [item] = blocks.splice(from, 1)
        if (item) blocks.splice(to, 0, item)
        return { ...current, blocks }
      })
      drag.set(undefined)
    },
    moveBlock: (direction: -1 | 1) =>
      updatePage((current) => {
        const blocks = [...current.blocks]
        const index = blocks.findIndex((item) => item.id === selected.get())
        const next = index + direction
        if (index < 0 || next < 0 || next >= blocks.length) return current
        const item = blocks[index]
        blocks[index] = blocks[next]!
        blocks[next] = item!
        return { ...current, blocks }
      }),
  }
}
