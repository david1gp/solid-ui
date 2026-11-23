# Site header: NavHeader-style header for catalog and demo pages

## Goal

Replace the current simple site header (`src/nav/NavDemo.tsx`: logo "adaptive-solid-ui", "Code", "Package", theme button)
with a header that looks and behaves like the NavHeader module demo (https://adaptive-solid-ui.pages.dev/modules/DemoNavHeader),
but **without CTA button, profile/account menu and login/register**. Its navigation items are the existing "Code" and "Package" links.
The new site header is a **separate copy**: it must not share header code with the NavHeader module/demo.

## Context

- Worktree: `/tmp/solid-ui-wt-WKfR/solid-ui`, branch `feat/site-nav-header`. Install: `BUN_INSTALL_CACHE_DIR=/tmp/buncache bun install` (global bun cache is read-only).
- Stack: SolidJS 2, TanStack router, Tailwind 4, Biome, bun. Site language English (theme labels Hell/Dunkel come from existing theme button).
- NavHeader module (library, published via `ui/**`): `ui/modules/nav_header/NavHeader.tsx`, `NavHeaderNavItem.ts`, `navHeaderStateCreate.ts`.
  Demo: `src/demos/modules/DemoNavHeader.tsx`, `src/demos/modules/demoNavHeaderStateCreate.ts`.
- Current site header: `src/nav/NavDemo.tsx`, rendered by `src/app/demos/DemoViews.tsx` for the home catalog (`DemosOverview`) and ordinary (non-fullscreen) demo pages.
  Fullscreen demos (incl. DemoNavHeader) render a floating home/theme control instead — unchanged.
- Links: Code = `https://github.com/david1gp/solid-ui`, Package = `https://www.npmjs.com/package/@adaptive-ds/solid-ui` (external).

## Decisions

- Placement: exactly where `NavDemo` is rendered today (home + ordinary demo pages). Nowhere else. Fullscreen demo pages unchanged.
- `NavDemo` is removed after replacement (delete file if no other usages).
- Separation (strict for header code): new files live in the app, e.g. `src/nav/site_header/` (one component/function per file, subject-first names like `SiteNavHeader.tsx`, `siteNavHeaderStateCreate.ts`, `SiteNavHeaderNavItem.ts`).
  They must NOT import anything from `ui/modules/nav_header/`, from `src/demos/`, or from `ui/modules/app_sidebar/`.
  Allowed shared generic primitives: `ui/static/icon/Icon`, `ui/interactive/button/*`, `ui/interactive/link/*`, `ui/static/logo/*`, `ui/interactive/theme/*`, `ui/utils/*`, and npm deps already in package.json (e.g. MDI icons).
  The NavHeader module and demo must stay functionally unchanged (no edits to them).
- Content: logo "adaptive-solid-ui" (same logo as today, links to `/`), nav items "Code" and "Package" (external, open like today, optionally with their current icons), theme switch/button as today.
  No CTA, no profile, no login/register, no account menu, no active-item state needed for external links.
- Look & behaviour copied from NavHeader: same layout/styling (sticky top bar, spacing, link styling), responsive: below `lg` a hamburger toggles a panel with the links + theme control; Escape closes it and returns focus to the trigger; at `lg`+ inline.
  Remove code paths that are not needed (auth, user, CTA, popover account menu) rather than keeping dead props.
- Must not overlap/obscure the home frosted tabs tile or demo content (keep page layout offsets working).

## Tasks

1. [x] Create the separate site header (copy + strip of NavHeader), replace `NavDemo` usages in `DemoViews.tsx`, delete `NavDemo` if unused. Checks: `bunx tsc --noEmit -p tsconfig.json`, biome format check from `check` script, `bun run test`, `bun run build`.
2. [x] Browser verification on dev server: home + a regular demo page + DemoNavHeader page (unchanged), light/dark, desktop + 390px mobile (hamburger, Escape), links' targets, no console errors.
3. [ ] Commits, merge to main, push, cleanup, deploy preview → verify → production.

## Status

- Current: task 3. New files: `src/nav/site_header/SiteNavHeader.tsx`, `siteNavHeaderStateCreate.ts`; `NavDemo.tsx` deleted.
