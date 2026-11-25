import { createSignalObject } from "#ui/utils/createSignalObject.js"
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
  const faq = createSignalObject(
    product.faq.map((item, id) => ({
      id,
      question: createSignalObject(item.question),
      answer: createSignalObject(item.answer),
    })),
  )
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
    faq: () => faq.get(),
    faqAdd: () =>
      faq.set([...faq.get(), { id: nextId++, question: createSignalObject(""), answer: createSignalObject("") }]),
    faqRemove: (id: number) => faq.set(faq.get().filter((item) => item.id !== id)),
    faqChange: (id: number, field: "question" | "answer", value: string) =>
      faq
        .get()
        .find((item) => item.id === id)
        ?.[field].set(value),
    notice: () => notice.get(),
    imageNotice: () => imageNotice.get(),
    imageUnavailable: () => imageNotice.set("Demo – nicht verfügbar"),
    save: () => notice.set("Demo – Änderungen werden nicht gespeichert"),
    back: () => cmsNavigate("content-types", backToList ? "article" : "article:tiles"),
  }
}
