import { mdiChevronDown } from "@adaptive-ds/mdi/mdiChevronDown.js"
import { createSignal, For, onMount, Show } from "solid-js"
import { demoList } from "#src/app/demos/demoList.js"
import { NavDemo } from "#src/nav/NavDemo.jsx"
import { LinkBlock } from "#ui/demo_pages/LinkBlock.jsx"
import { LinkButtonInternal } from "#ui/interactive/link/LinkButton.jsx"
import { BulletLinks } from "#ui/interactive/list/BulletLinks.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { LayoutWrapperDemo } from "#ui/static/layout/LayoutWrapperDemo.jsx"
import { classArr } from "#ui/utils/classArr.js"
import { objectEntries } from "#utils/obj/objectEntries.js"
import { objectKeys } from "#utils/obj/objectKeys.js"

// Demos live at the site root (prefix ""), e.g. /input, /input/DemoInputS.
const prefix = ""

/** L0 — overview grid of every category and its components. */
export function DemosOverview() {
  const categories: [string, Record<string, unknown>][] = objectEntries(demoList)
  return (
    <LayoutWrapperDemo title={"demos"}>
      <NavDemo demoList={demoList} demoPrefix={prefix} />
      <div
        class={classArr(
          "flex flex-col items-center justify-center", // layout
          "bg-transparent", // background
          "p-4", // spacing
        )}
      >
        <div class={"flex flex-wrap justify-center items-start gap-x-8 gap-y-3"}>
          <For each={categories}>
            {([category, tree]) => {
              const categoryLinks = objectKeys(tree).map((compName) => `${prefix}/${category}/${compName}`)
              const removePrefix = `${prefix}/${category}/Demo`
              return (
                <details class={"group"}>
                  <summary
                    class={classArr(
                      "flex items-center gap-1 cursor-pointer select-none list-none", // layout
                      "[&::-webkit-details-marker]:hidden", // hide native marker
                    )}
                  >
                    <h2 class={"text-xl font-semibold capitalize"}>{category}</h2>
                    <Icon
                      path={mdiChevronDown}
                      class={"size-6 fill-current transition-transform group-open:rotate-180"}
                    />
                  </summary>
                  <div class={"flex flex-col mt-1"}>
                    <Show
                      when={categoryLinks.length > 0}
                      fallback={<span class={"text-muted-foreground"}>No entries yet</span>}
                    >
                      <BulletLinks internal removeUrlPrefix={removePrefix} urls={categoryLinks} />
                    </Show>
                  </div>
                </details>
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
          "bg-transparent", // background
          "p-4", // spacing
        )}
      >
        <div>
          <LinkBlock header={capitalizeFirst(props.category)} removeUrlPrefix={removePrefix} links={links} />
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

function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}
