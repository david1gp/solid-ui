import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { onCleanup } from "solid-js"
import { cmsEventListMove } from "../events/cmsEventListMove.js"
import { cmsNavigate } from "../../../shell/cmsNavigate.js"
import { cmsEventTitleSplit } from "../events/cmsEventTitleSplit.js"
import { cmsProductOrder } from "./cmsProductOrder.js"
import type { cmsProducts } from "./cmsProducts.js"

export function cmsProductEditStateCreate(product: ReturnType<typeof cmsProducts.get>[number], backToList = false) {
  const split = cmsEventTitleSplit(product.title)
  const name = createSignalObject(split.eyebrow || split.title)
  const subtitle = createSignalObject(split.eyebrow ? split.title : "")
  const position = createSignalObject(cmsProductOrder.get().indexOf(product.id) + 1 || product.position)
  const featured = createSignalObject(product.featured)
  const price = createSignalObject(String(product.price))
  const quantity = createSignalObject(String(product.quantity))
  const description = createSignalObject(product.description)
  const faq = createSignalObject(product.faq.map((item, id) => ({ ...item, id: String(id) })))
  const faqValidationAttempted = createSignalObject(false)
  const tabValue = () =>
    typeof window !== "undefined" && new URL(window.location.href).searchParams.get("productTab") === "FAQ"
      ? "FAQ"
      : "Details"
  const tabState = createSignalObject(tabValue())
  const tab = {
    get: tabState.get,
    set: (value: string) => {
      tabState.set(value)
      if (typeof window === "undefined") return
      const url = new URL(window.location.href)
      if (value === "FAQ") url.searchParams.set("productTab", value)
      else url.searchParams.delete("productTab")
      window.history.replaceState(window.history.state, "", url)
    },
  }
  if (typeof window !== "undefined") {
    const syncTab = () => tabState.set(tabValue())
    window.addEventListener("popstate", syncTab)
    onCleanup(() => window.removeEventListener("popstate", syncTab))
  }
  const faqInvalid = () => faq.get().some((item) => Boolean(item.question.trim()) !== Boolean(item.answer.trim()))
  const notice = createSignalObject("")
  const imageNotice = createSignalObject("")
  let nextId = faq.get().length
  return {
    name: () => name.get(),
    nameSet: (value: string) => name.set(value),
    subtitle: () => subtitle.get(),
    subtitleSet: (value: string) => subtitle.set(value),
    title: () => (subtitle.get() ? `${name.get()} – ${subtitle.get()}` : name.get()),
    position: () => position.get(),
    positionSet: (value: number) => position.set(value),
    featured: () => featured.get(),
    featuredSet: (value: boolean) => featured.set(value),
    price: () => price.get(),
    priceSet: (value: string) => price.set(value),
    quantity: () => quantity.get(),
    quantitySet: (value: string) => quantity.set(value),
    description: () => description.get(),
    descriptionSet: (value: string) => description.set(value),
    tab,
    tabHasErrors: (value: string) => value === "FAQ" && faqValidationAttempted.get() && faqInvalid(),
    faq: () => faq.get(),
    faqValidationAttempted: () => faqValidationAttempted.get(),
    faqAdd: () => faq.set([...faq.get(), { id: String(nextId++), question: "", answer: "" }]),
    faqRemove: (id: string) => faq.set(faq.get().filter((item) => item.id !== id)),
    faqUpdate: (id: string, changes: Partial<{ question: string; answer: string }>) =>
      faq.set(faq.get().map((item) => (item.id === id ? { ...item, ...changes } : item))),
    faqMove: (from: number, to: number) => faq.set(cmsEventListMove(faq.get(), from, to)),
    notice: () => notice.get(),
    imageNotice: () => imageNotice.get(),
    imageUnavailable: () => imageNotice.set("Demo – nicht verfügbar"),
    save: () => {
      faqValidationAttempted.set(true)
      if (faqInvalid()) {
        notice.set("Bitte ergänze die fehlenden FAQ-Angaben.")
        return
      }
      notice.set("Demo – Änderungen werden nicht gespeichert")
    },
    back: () => cmsNavigate("content-types", backToList ? "article" : "article:tiles"),
  }
}
