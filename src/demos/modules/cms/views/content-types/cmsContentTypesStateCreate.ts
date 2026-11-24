import { createSignalObject } from "#ui/utils/createSignalObject.js"
import { cmsNavigate } from "../../shell/cmsNavigate.js"
import { cmsProducts } from "./products/cmsProducts.js"

type FieldType = "text" | "number" | "date" | "relation" | "media" | "repeater"
type Field = { id: string; type: FieldType; label: string; key: string }
type ContentType = { id: string; name: string; fields: Field[] }
const types = createSignalObject<ContentType[]>([
  {
    id: "article",
    name: "Artikel / Article",
    fields: [
      { id: "title", type: "text", label: "Titel", key: "title" },
      { id: "image", type: "media", label: "Bild", key: "image" },
    ],
  },
  {
    id: "event",
    name: "Veranstaltung / Event",
    fields: [{ id: "date", type: "date", label: "Datum", key: "date" }],
  },
])
let nextId = 0
export function cmsContentTypesStateCreate(id: () => string | undefined) {
  const picker = createSignalObject<FieldType>("text")
  const currentId = () => (id()?.startsWith("article:") ? "article" : id())
  const current = () => types.get().find((item) => item.id === currentId())
  const updateFields = (update: (fields: Field[]) => Field[]) =>
    types.set(types.get().map((item) => (item.id === currentId() ? { ...item, fields: update(item.fields) } : item)))
  return {
    tab: () => (id() === "article:tiles" ? "tiles" : "list"),
    tabSet: (value: "list" | "tiles") =>
      cmsNavigate("content-types", value === "list" ? "article" : `article:${value}`),
    types: () => types.get(),
    entryCount: (typeId: string) => (typeId === "article" ? cmsProducts.get().length : 0),
    current,
    picker: () => picker.get(),
    pickerSet: (value: FieldType) => picker.set(value),
    add: () => {
      const type = picker.get()
      const number = ++nextId
      const newField: Field = {
        id: `field-${number}`,
        type,
        label: type,
        key: `${type}_${number}`,
      }
      updateFields((fields) => [...fields, newField])
    },
    move: (fieldId: string, direction: number) =>
      updateFields((fields) => {
        const index = fields.findIndex((item) => item.id === fieldId)
        const target = index + direction
        if (index < 0 || target < 0 || target >= fields.length) return fields
        const result = [...fields]
        const item = result[index]
        const other = result[target]
        if (!item || !other) return fields
        result[index] = other
        result[target] = item
        return result
      }),
  }
}
