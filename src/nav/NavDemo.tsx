import { cn } from "cn"
import type { ComponentProps } from "solid-js"
import { createSignal, lazy, onMount, Show, splitProps } from "solid-js"
import type { DemoNavDataProps } from "#ui/demo_pages/DemoNavDataProps.js"
import { LinkBlock } from "#ui/demo_pages/LinkBlock.jsx"
import { buttonVariant } from "#ui/interactive/button/buttonCva.js"
import { LinkButtonExternal, LinkButtonInternal } from "#ui/interactive/link/LinkButton.jsx"
import { ThemeButton } from "#ui/interactive/theme/ThemeButton.jsx"
import { iconGithub } from "#ui/static/icons/iconGithub.js"
import { iconNpm } from "#ui/static/icons/iconNpm.js"
import { LogoImageText } from "#ui/static/logo/LogoImageText.jsx"
import { objectEntries } from "#utils/obj/objectEntries.js"
import { objectKeys } from "#utils/obj/objectKeys.js"

// `@corvu/popover` is precompiled to client-only DOM templates (`template()` at
// module load), so it must stay out of the SSR import graph. Load it via a
// dynamic import and render it only after mount on the client.
const CorvuPopoverLazy = lazy(() =>
  import("#ui/interactive/popover/CorvuPopover.jsx").then((m) => ({
    default: m.CorvuPopover,
  })),
)

export interface DemoNavProps extends DemoNavDataProps, ComponentProps<"nav"> {}

export function NavDemo(p: DemoNavProps) {
  const [s, rest] = splitProps(p, ["class", "children", "category", "compName", "demoList", "demoPrefix"])
  const githubUrl = "https://github.com/david1gp/solid-ui"
  const npmUrl = "https://www.npmjs.com/package/@adaptive-ds/solid-ui"
  return (
    <header
      class={
        "w-full bg-gray-100 dark:bg-background [&_a:hover]:bg-gray-200 [&_button:hover]:bg-gray-200 dark:[&_a:hover]:bg-slate-800 dark:[&_button:hover]:bg-slate-800"
      }
    >
      <nav class={cn("flex flex-wrap items-center justify-between py-1 gap-1 w-full", s.class)} {...rest}>
        <div class={"flex flex-wrap gap-1"}>
          <LogoImageText logoText="adaptive-solid-ui" logoTextClass="text-lg font-semibold" />
          {/* <LogoImageOnly /> */}
          {s.category && (
            <>
              <NavSeparatingSlash />
              <LinkButtonInternal
                variant={buttonVariant.ghost}
                to="/$"
                params={{
                  _splat: `${s.demoPrefix}/${s.category}/`.replace(/^\//, ""),
                }}
              >
                <span class={"capitalize"}>{s.category}</span>
              </LinkButtonInternal>
              {s.compName && (
                <>
                  <NavSeparatingSlash />
                  <ComponentPopover
                    demoList={s.demoList}
                    category={s.category}
                    compName={s.compName}
                    demoPrefix={s.demoPrefix}
                  />
                </>
              )}
            </>
          )}
        </div>

        <div class="flex flex-wrap items-center gap-1">
          <LinkButtonExternal variant={buttonVariant.ghost} icon={iconGithub} href={githubUrl} title="Github" newTab>
            Code
          </LinkButtonExternal>
          <LinkButtonExternal variant={buttonVariant.ghost} icon={iconNpm} href={npmUrl} title="NPM" newTab>
            Package
          </LinkButtonExternal>
          <ThemeButton showText={true} class="rounded-md" />
        </div>
      </nav>
    </header>
  )
}

function ComponentPopover(
  s: Pick<DemoNavProps, "class" | "children" | "category" | "compName" | "demoList" | "demoPrefix">,
) {
  if (!s.category || !s.compName) return null
  const links = objectEntries(s.demoList)
    .filter(([category, _tree]) => category === s.category)
    .flatMap(([category, tree]) => objectKeys(tree).map((compName) => `${s.demoPrefix}/${category}/${compName}`))
  if (!links || links.length <= 0) return null
  const [mounted, setMounted] = createSignal(false)
  onMount(() => setMounted(true))
  return (
    <Show
      when={mounted()}
      fallback={
        <LinkButtonInternal
          variant={buttonVariant.ghost}
          to="/$"
          params={{
            _splat: `${s.demoPrefix}/${s.category}/${s.compName}`.replace(/^\//, ""),
          }}
        >
          {s.compName}
        </LinkButtonInternal>
      }
    >
      <CorvuPopoverLazy variant={buttonVariant.ghost} buttonChildren={s.compName}>
        <LinkBlock
          header={s.category.charAt(0).toUpperCase() + s.category.slice(1)}
          removeUrlPrefix={`${s.demoPrefix}/${s.category}/`}
          links={links}
        />
      </CorvuPopoverLazy>
    </Show>
  )
}

function NavSeparatingSlash() {
  return <span class={"py-1.5 text-gray-500 text-xl"}>/</span>
}
