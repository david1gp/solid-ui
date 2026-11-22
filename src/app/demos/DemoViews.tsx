import { mdiChevronDown } from "@adaptive-ds/mdi/mdiChevronDown.js"
import { createSignal, Errored, For, onSettled, Show } from "solid-js"
import { demoList } from "#src/app/demos/demoList.js"
import { FloatingGlowButton } from "#src/app/demos/FloatingGlowButton.jsx"
import { floatingThemeStateCreate } from "#src/app/demos/floatingThemeStateCreate.js"
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

/** Full-viewport demos rendered without the demo nav; they get a floating home button instead. */
const fullscreenDemos = new Set(["DemoAppSidebar", "DemoRegisterLogin"])

/** Display labels overriding the name derived from the demo key (prefix "Demo" stripped). */
const demoDisplayNames: Record<string, string> = {
  DemoAppSidebar: "Sidebar-Simple",
  DemoRegisterLogin: "Register-Login",
}

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
              const categoryLabels = objectKeys(tree).map(
                (compName) => demoDisplayNames[compName] ?? compName.replace(/^Demo/, ""),
              )
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
                      <BulletLinks internal display={categoryLabels} urls={categoryLinks} />
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
  // e.g. @corvu-next/utils' FloatingArrow — which on the server resolves to
  // solid-js/web's notSup() and throws "Client-only API called on the server
  // side", crashing the prerender. Gating render on mount means the prerender
  // never renders the demo (so its chunk is never imported server-side); it
  // loads on the client only. The chrome (nav, title, links, JSON-LD) still
  // prerenders for SEO. Verified: removing this gate breaks `vite build`.
  const [mounted, setMounted] = createSignal(false)
  onSettled(() => setMounted(true))
  return (
    <LayoutWrapperDemo title={props.compName}>
      <Show
        when={fullscreenDemos.has(props.compName)}
        fallback={
          <NavDemo demoList={demoList} category={props.category} compName={props.compName} demoPrefix={prefix} />
        }
      >
        <HomeButtonFloating />
      </Show>
      <Show when={mounted()}>
        <Errored fallback={(err) => <DemoLoadError error={err} />}>
          <Comp />
        </Errored>
      </Show>
    </LayoutWrapperDemo>
  )
}

/** Icon-only home link pinned to the bottom-right of the viewport. */
function HomeButtonFloating() {
  const state = floatingThemeStateCreate()
  return (
    <div class={"fixed bottom-4 right-4 z-50 flex items-center gap-1.5"}>
      <FloatingGlowButton kind={"theme"} label={state.label()} isDark={state.isDark()} onClick={state.toggle} />
      <FloatingGlowButton kind={"home"} label={"Home"} />
    </div>
  )
}

/** Shown instead of an empty page when a demo chunk fails to load or render. */
function DemoLoadError(props: { error: unknown }) {
  const message = () => (props.error instanceof Error ? props.error.message : String(props.error))
  return (
    <div class={"flex flex-col items-center gap-3 p-8 text-center"}>
      <h2 class={"text-xl font-semibold"}>Demo could not be loaded</h2>
      <p class={"text-muted-foreground max-w-xl break-words"}>{message()}</p>
      <button
        type={"button"}
        class={"px-3 py-1.5 rounded-md border border-border cursor-pointer hover:bg-black/5 dark:hover:bg-white/10"}
        onClick={() => location.reload()}
      >
        Reload page
      </button>
    </div>
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
