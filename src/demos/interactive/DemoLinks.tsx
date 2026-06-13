import { buttonVariant } from "#ui/interactive/button/buttonCva.js"
import { LinkButtonExternal, LinkButtonInternal } from "#ui/interactive/link/LinkButton.jsx"
import { LinkButtonIconOnlyExternal, LinkButtonIconOnlyInternal } from "#ui/interactive/link/LinkButtonIconOnly.jsx"
import { mdiGithub, mdiHome, mdiOpenInNew } from "@mdi/js"
import { For } from "solid-js"

export function DemoLinks() {
  return (
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-6">Links Demo</h1>
      <div class="space-y-8">
        <InternalLinkButtonDemo />
        <LinkButtonVariantsDemo />
        <LinkButtonWithIconsDemo />
        <LinkButtonIconOnlyDemo />
        <ExternalLinksDemo />
      </div>
    </div>
  )
}

/** Internal links — typed `to`, client-side nav + preload (needs a RouterProvider). */
function InternalLinkButtonDemo() {
  return (
    <div>
      <h2 class="text-2xl font-bold mb-4">Internal Link Buttons</h2>
      <div class="flex flex-wrap gap-4">
        <LinkButtonInternal to="/">Home</LinkButtonInternal>
        <LinkButtonInternal to="/$" params={{ _splat: "interactive/DemoButtons" }} variant={buttonVariant.outline}>
          Buttons demo (typed splat)
        </LinkButtonInternal>
        <LinkButtonInternal to="/$" params={{ _splat: "interactive/DemoLinks" }} variant={buttonVariant.contrast}>
          Links demo
        </LinkButtonInternal>
      </div>
    </div>
  )
}

function LinkButtonVariantsDemo() {
  const variants = Object.values(buttonVariant)

  return (
    <div>
      <h2 class="text-2xl font-bold mb-4">Link Button Variants</h2>
      <div class="flex flex-wrap gap-4">
        <For each={variants}>
          {(variant) => (
            <LinkButtonExternal href="#variant" variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </LinkButtonExternal>
          )}
        </For>
      </div>
    </div>
  )
}

function LinkButtonWithIconsDemo() {
  return (
    <div>
      <h2 class="text-2xl font-bold mb-4">Link Buttons with Icons</h2>
      <div class="flex flex-wrap gap-4">
        <LinkButtonInternal to="/" icon={mdiHome}>
          Home
        </LinkButtonInternal>
        <LinkButtonExternal href="https://github.com" icon={mdiGithub} iconRight={mdiOpenInNew} newTab>
          GitHub
        </LinkButtonExternal>
        <LinkButtonExternal href="#external" iconRight={mdiOpenInNew}>
          Hash link
        </LinkButtonExternal>
      </div>
    </div>
  )
}

function LinkButtonIconOnlyDemo() {
  return (
    <div>
      <h2 class="text-2xl font-bold mb-4">Icon-Only Link Buttons</h2>
      <div class="flex gap-4">
        <LinkButtonIconOnlyInternal to="/" icon={mdiHome} title="Home" aria-label="Go to home page" />
        <LinkButtonIconOnlyExternal
          href="https://github.com"
          icon={mdiGithub}
          title="GitHub"
          variant={buttonVariant.contrast}
          newTab
        />
        <LinkButtonIconOnlyExternal
          href="#external"
          icon={mdiOpenInNew}
          title="External Link"
          variant={buttonVariant.outline}
        />
      </div>
    </div>
  )
}

function ExternalLinksDemo() {
  return (
    <div>
      <h2 class="text-2xl font-bold mb-4">External Links</h2>
      <div class="space-y-4">
        <div class="flex flex-wrap gap-4">
          <LinkButtonExternal href="https://example.com" newTab>
            External Link
          </LinkButtonExternal>
          <LinkButtonExternal href="https://github.com" icon={mdiGithub} newTab>
            GitHub (New Tab)
          </LinkButtonExternal>
        </div>
        <div class="text-sm text-muted-foreground">
          <p>
            Internal links use a typed <code>to</code> for client-side navigation and preloading.
          </p>
          <p>
            External links are plain anchors with <code>href</code>; <code>newTab</code> opens a new tab/window with{" "}
            <code>rel="noopener noreferrer"</code>.
          </p>
          <p>
            Icon-only links should have proper <code>title</code> and <code>aria-label</code> attributes for
            accessibility.
          </p>
        </div>
      </div>
    </div>
  )
}
