import { dynamic } from "@solidjs/web"
import { type Component, createMemo, createSignal, Errored, For, Loading, onSettled, Show } from "solid-js"
import { demoList } from "#src/app/demos/demoList.js"
import { DemoShapesBackdrop } from "#src/app/demos/DemoShapesBackdrop.jsx"
import { demosOverviewStateCreate } from "#src/app/demos/demosOverviewStateCreate.js"
import { FloatingGlowButton } from "#src/app/demos/FloatingGlowButton.jsx"
import { floatingThemeStateCreate } from "#src/app/demos/floatingThemeStateCreate.js"
import { HomeHowTo } from "#src/app/demos/HomeHowTo.jsx"
import { SiteNavHeader } from "#src/nav/site_header/SiteNavHeader.jsx"
import { LinkButtonInternal } from "#ui/interactive/link/LinkButton.jsx"
import { LinkTextInternal } from "#ui/interactive/link/LinkText.jsx"
import { BulletLinks } from "#ui/interactive/list/BulletLinks.jsx"
import { TabsTop } from "#ui/interactive/tabs/TabsTop.jsx"
import { LayoutWrapperDemo } from "#ui/static/layout/LayoutWrapperDemo.jsx"
import { classArr } from "#ui/utils/classArr.js"
import { objectKeys } from "#utils/obj/objectKeys.js"

// Demos live at the site root (prefix ""), e.g. /input, /input/DemoInputS.
const prefix = ""

/** Full-viewport demos rendered without the demo nav; they get a floating home button instead. */
const fullscreenDemos = new Set([
  "DemoAppSidebar",
  "DemoSidebarModern",
  "DemoRegisterLogin",
  "DemoRegisterCi",
  "DemoCMS",
  "DemoNavHeader",
  "Bottom-Mobile-Navbar",
])

/** Display labels overriding the name derived from the demo key (prefix "Demo" stripped). */
const demoDisplayNames: Record<string, string> = {
  DemoAppSidebar: "Sidebar-Simple",
  DemoSidebarModern: "Sidebar-modern",
  DemoCMS: "CMS",
  DemoNavHeader: "NavHeader-Simple",
  DemoRegisterLogin: "Register-Login",
  DemoRegisterCi: "Register-CI",
}

/** Frosted panel keeping link text readable above the abstract backdrop shapes. */
const panelClass = "px-6 py-4 rounded-2xl bg-background/70 backdrop-blur-xl dark:bg-[#222326]/70"

/** L0 — overview grid of every category and its components. */
export function DemosOverview() {
  const state = demosOverviewStateCreate(demoList, demoDisplayNames)
  const categories = objectKeys(demoList)
  const options = ["overview", "howto", ...categories]
  return (
    <LayoutWrapperDemo title={"demos"}>
      <DemoShapesBackdrop fixed />
      <SiteNavHeader />
      <div
        class={classArr(
          "flex flex-col items-center justify-center", // layout
          "bg-transparent", // background
          "p-4", // spacing
        )}
      >
        <div
          class={classArr(
            "w-full max-w-5xl rounded-2xl border border-border/50 bg-background/60 px-6 py-4 shadow-xl backdrop-blur-xl dark:bg-[#222326]/60", // layout and surface
          )}
        >
          <TabsTop
            selectedClass="bg-[#5f5fd3] text-white"
            valueSignal={state.selectedTab}
            getOptions={() => options}
            trailing={
              <div class="relative ml-auto flex w-full items-center sm:w-64">
                <svg
                  aria-hidden="true"
                  class="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>
                <input
                  type="search"
                  aria-label="Search components"
                  placeholder="Search components…"
                  class="w-full rounded-md border border-border bg-background py-2 pl-9 pr-9 text-sm [&::-webkit-search-cancel-button]:hidden"
                  value={state.query.get()}
                  onInput={(event) => state.setQuery(event.currentTarget.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      event.preventDefault()
                      state.setQuery("")
                    }
                  }}
                />
                <Show when={state.query.get()}>
                  <button
                    type="button"
                    aria-label="Clear search"
                    class="absolute right-2 rounded px-1 text-xl text-muted-foreground"
                    onClick={() => state.setQuery("")}
                  >
                    ×
                  </button>
                </Show>
              </div>
            }
            valueText={(value) => (value === "howto" ? "How to" : capitalizeFirst(value))}
            class={"rounded-lg p-1 bg-background/50 dark:bg-background/50"}
            valueChildren={(value) => {
              if (state.query.get().trim()) {
                return (
                  <div class="space-y-2 py-6">
                    <Show
                      when={state.results().length}
                      fallback={<p class="text-muted-foreground">No results for “{state.query.get().trim()}”</p>}
                    >
                      <For each={state.results()}>
                        {(result) => (
                          <div class="flex items-baseline gap-2">
                            <LinkTextInternal to="/$" params={{ _splat: `${result.category}/${result.name}` }}>
                              {result.displayName}
                            </LinkTextInternal>
                            <span class="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                              {capitalizeFirst(result.category)}
                            </span>
                          </div>
                        )}
                      </For>
                    </Show>
                  </div>
                )
              }
              if (value === "overview") {
                return (
                  <div class={"max-w-3xl space-y-4 py-6"}>
                    <h2 class={"text-3xl font-semibold"}>Solid UI</h2>
                    <p class={"text-lg"}>
                      A platform of ready-made UI/UX templates and components for SolidJS – for a consistent design and
                      fast, simple implementation.
                    </p>
                    <p>
                      UI (User Interface) is what people see and interact with, such as buttons and forms. UX (User
                      Experience) is how easy and comfortable those interactions feel.
                    </p>
                    <p>Use these building blocks to create applications with:</p>
                    <ul class={"list-disc space-y-1 pl-6"}>
                      <li>A consistent look across apps</li>
                      <li>Accessible components covered by tests</li>
                      <li>Faster development through reusable building blocks</li>
                      <li>Light and dark themes and responsive layouts</li>
                    </ul>
                    <p>Pick a category tab above to browse live demos.</p>
                  </div>
                )
              }
              if (value === "howto") return <HomeHowTo />
              const tree: Record<string, unknown> | undefined = demoList[value as keyof typeof demoList]
              const names = objectKeys(tree ?? {})
              return (
                <div class={"grid gap-x-6 gap-y-2 py-6 sm:grid-cols-2 lg:grid-cols-3"}>
                  <Show when={names.length > 0} fallback={<span class={"text-muted-foreground"}>No entries yet</span>}>
                    <BulletLinks
                      internal
                      urls={names.map((name) => `${prefix}/${value}/${name}`)}
                      display={names.map((name) => demoDisplayNames[name] ?? name.replace(/^Demo/, ""))}
                    />
                  </Show>
                </div>
              )
            }}
          />
        </div>
      </div>
    </LayoutWrapperDemo>
  )
}

/** L1 — a single category, listing its component demos. */
export function DemosCategory(props: { category: string }) {
  const links = createMemo(() => {
    const category = props.category
    const tree = demoList[category as keyof typeof demoList]
    return Object.keys(tree ?? {}).map((name) => `${prefix}/${category}/${name}`)
  })
  return (
    <LayoutWrapperDemo title={props.category}>
      <DemoShapesBackdrop fixed />
      <SiteNavHeader />
      <div
        class={classArr(
          "flex flex-col items-center justify-center", // layout
          "bg-transparent", // background
          "p-4", // spacing
        )}
      >
        <div class={panelClass}>
          <h2 class={"text-xl font-semibold"}>{capitalizeFirst(props.category)}</h2>
          <div class={"flex flex-col"}>
            <BulletLinks
              internal
              urls={links()}
              display={links().map((link) => {
                const name = link.split("/").pop() ?? ""
                return demoDisplayNames[name] ?? name
              })}
            />
          </div>
        </div>
      </div>
    </LayoutWrapperDemo>
  )
}

/** L2 — a single component demo. */
export function DemoComponent(props: { category: string; compName: string }) {
  const Demo = dynamic<Component>(() => {
    const tree: Record<string, Component> | undefined = demoList[props.category as keyof typeof demoList]
    return tree?.[props.compName]
  })
  // Keep client-only dependencies, including Corvu's DOM templates, out of
  // prerender while preserving the catalog chrome and metadata.
  const [mounted, setMounted] = createSignal(false)
  onSettled(() => {
    setMounted(true)
  })
  return (
    <LayoutWrapperDemo title={props.compName}>
      <Show when={fullscreenDemos.has(props.compName)} fallback={<SiteNavHeader />}>
        <HomeButtonFloating />
      </Show>
      <Show when={mounted()}>
        <Errored fallback={(err) => <DemoLoadError error={err()} />}>
          <Loading>
            <Demo />
          </Loading>
        </Errored>
      </Show>
    </LayoutWrapperDemo>
  )
}

/** Icon-only home link pinned to the bottom-right of the viewport. */
function HomeButtonFloating() {
  const state = floatingThemeStateCreate()
  return (
    <div data-demo-floating-buttons class="fixed bottom-4 right-4 z-50 flex items-center gap-1.5">
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
      <SiteNavHeader />
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
