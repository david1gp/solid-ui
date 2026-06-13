import { demoList } from "#src/app/demos/demoList.js"
import { NavDemo } from "#src/nav/NavDemo.jsx"
import { LinkBlock } from "#ui/demo_pages/LinkBlock.jsx"
import { LinkButtonInternal } from "#ui/interactive/link/LinkButton.jsx"
import { classesGridCols5xl } from "#ui/static/grid/classesGridCols.js"
import { LayoutWrapperDemo } from "#ui/static/layout/LayoutWrapperDemo.jsx"
import { classArr } from "#ui/utils/classArr.js"
import { objectEntries } from "#utils/obj/objectEntries.js"
import { objectKeys } from "#utils/obj/objectKeys.js"
import { createSignal, For, onMount, Show } from "solid-js"

// Demos live at the site root (prefix ""), e.g. /input, /input/DemoInputS.
const prefix = ""

/** L0 — overview grid of every category and its components. */
export function DemosOverview() {
  const categories = objectEntries(demoList)
  return (
    <LayoutWrapperDemo title={"demos"}>
      <NavDemo demoList={demoList} demoPrefix={prefix} />
      <div
        class={classArr(
          "flex flex-col items-center justify-center", // layout
          "bg-gray-50 dark:bg-gray-700", // background
          "p-4", // spacing
        )}
      >
        <div class={classArr(classesGridCols5xl, "gap-4")}>
          <For each={categories}>
            {([category, tree]) => {
              const categoryLinks = objectKeys(tree).map((compName) => `${prefix}/${category}/${compName}`)
              const removePrefix = `${prefix}/${category}/Demo`
              return (
                <div>
                  <LinkBlock header={category} removeUrlPrefix={removePrefix} links={categoryLinks} />
                </div>
              )
            }}
          </For>
        </div>
      </div>
    </LayoutWrapperDemo>
  )
}

/** L1 — a single category, listing its component demos. */
export function DemosCategory(props: { category: string }) {
  const tree = demoList[props.category as keyof typeof demoList]
  const links = objectKeys(tree).map((name) => `${prefix}/${props.category}/${name}`)
  const removePrefix = `${prefix}/${props.category}/`
  return (
    <LayoutWrapperDemo title={props.category}>
      <NavDemo demoList={demoList} category={props.category} demoPrefix={prefix} />
      <div
        class={classArr(
          "flex flex-col items-center justify-center", // layout
          "bg-gray-50 dark:bg-gray-900", // background
          "p-4", // spacing
        )}
      >
        <div>
          <LinkBlock header={props.category} removeUrlPrefix={removePrefix} links={links} />
        </div>
      </div>
    </LayoutWrapperDemo>
  )
}

/** L2 — a single component demo. */
export function DemoComponent(props: { category: string; compName: string }) {
  const tree = demoList[props.category as keyof typeof demoList]
  const Comp = tree[props.compName as keyof typeof tree] as () => ReturnType<typeof LayoutWrapperDemo>
  // Each demo is lazy()-imported (see demoList) so it sits in its own chunk.
  // Some demos pull client-only deps that call `template()` at module load —
  // e.g. @corvu/utils' FloatingArrow — which on the server resolves to
  // solid-js/web's notSup() and throws "Client-only API called on the server
  // side", crashing the prerender. Gating render on mount means the prerender
  // never renders the demo (so its chunk is never imported server-side); it
  // loads on the client only. The chrome (nav, title, links, JSON-LD) still
  // prerenders for SEO. Verified: removing this gate breaks `vite build`.
  const [mounted, setMounted] = createSignal(false)
  onMount(() => setMounted(true))
  return (
    <LayoutWrapperDemo title={props.compName}>
      <NavDemo demoList={demoList} category={props.category} compName={props.compName} demoPrefix={prefix} />
      <Show when={mounted()}>
        <Comp />
      </Show>
    </LayoutWrapperDemo>
  )
}

/** 404 — unknown demo path. */
export function DemosNotFound() {
  return (
    <LayoutWrapperDemo>
      <NavDemo demoList={demoList} demoPrefix={prefix} />
      <h1 class={"text-xl font-semibold"}>not found</h1>
      <LinkButtonInternal to="/">back to demos</LinkButtonInternal>
    </LayoutWrapperDemo>
  )
}

/** Returns true when `category`/`compName` resolve to a real demo component. */
export function demoExists(category: string, compName?: string): boolean {
  const tree = demoList[category as keyof typeof demoList]
  if (!tree) return false
  if (compName === undefined) return true
  return compName in tree
}
