import { createSignalObject } from "#ui/utils/createSignalObject.js"

export function cmsEventCategoriesFieldStateCreate(props: {
  categories: () => string[]
  add: (value: string) => void
  remove: (value: string) => void
}) {
  const draft = createSignalObject("")
  const commit = () => {
    props.add(draft.get())
    draft.set("")
  }
  return {
    draft: draft.get,
    draftSet: (value: string) => draft.set(value),
    keyDown: (event: KeyboardEvent) => {
      if (event.isComposing) return
      if (event.key === "Enter" || event.key === ",") {
        event.preventDefault()
        commit()
      } else if (event.key === "Backspace" && !draft.get()) {
        const last = props.categories().at(-1)
        if (last !== undefined) props.remove(last)
      }
    },
  }
}
