# Home page: one frosted tile with category tabs

## Goal

On the home page (`/`, https://adaptive-solid-ui.pages.dev/) replace the current set of separate collapsible
category sections with **one large frosted tile**. The main categories are shown as **tabs at the top of the tile**.
An additional first tab, **"Overview"**, is selected on first page load and explains what Solid UI is.

## Context

- Route: `src/routes/index.tsx` renders `DemosOverview` from `src/app/demos/DemoViews.tsx`.
- Categories come from `demoList` in `src/app/demos/demoList.ts` (keys: composite, input, interactive, modules, static, table);
  each category lists demo links (currently via `BulletLinks`, names via `demoDisplayNames`).
- Existing tabs component: `ui/interactive/tabs/TabsTop.tsx` (`TabsTop`, accessible tablist + tabpanels). Reuse it.
- Existing frosted style: `panelClass` in `DemoViews.tsx` (backdrop-blur-xl + translucent bg). Background behind: `DemoShapesBackdrop`.
- Stack: SolidJS 2, TanStack router, Tailwind 4 (`src/tailwind.css`), Biome, bun. Site language: English.
- Install in a worktree: `BUN_INSTALL_CACHE_DIR=/tmp/buncache bun install` (global bun cache is read-only).
- Worktree: `/tmp/solid-ui-wt-STsB/solid-ui`, branch `feat/home-tabs-tile`.

## Decisions

- Texts in **English** (site is English, `lang="en"`).
- Tab order: `Overview` (default), then the categories in the existing `demoList` order. Tab labels = capitalized category names.
- Tab content for a category: the same demo links as today (no new content), laid out readable inside the tile (e.g. multi-column grid of links).
- The tile: single large card, max-width container centered, frosted (`backdrop-blur` + translucent background + subtle border/shadow),
  must be readable in light and dark theme over `DemoShapesBackdrop`. Keep `DemoShapesBackdrop`.
- Reuse `TabsTop`; do not add new libraries. If `TabsTop` lacks something minor, extend it backward-compatibly (do not break `DemoTabs`).
- Selected tab state: local signal; optional sync to URL is NOT required.
- Overview text (may be refined slightly):
  - Heading: "Solid UI"
  - Lead: "A platform of ready-made UI/UX templates and components for SolidJS – for a consistent design and fast, simple implementation."
  - Short paragraphs/bullets explaining: UI (User Interface) = what users see and interact with; UX (User Experience) = how it feels to use;
    Solid UI provides tested, accessible building blocks (inputs, tables, interactive elements, composite modules) that share one design language,
    so apps look consistent and teams build faster without reinventing basics; how to use the site: pick a category tab to browse live demos.
- Keep everything else (nav header, other routes, prerendering) unchanged.

## Tasks

1. [x] Implement the frosted tile with `TabsTop` (Overview + category tabs) in `DemoViews.tsx` (split into new files if it improves structure, one component per file). Run `bun run check`-equivalent pieces: `bunx tsc --noEmit -p tsconfig.json`, biome format check, `bun test` (unit tests only). Build with `bun run build`.
2. [x] Visual verification via browser subagent (dev server, light + dark, desktop + mobile width, tab switching, links work).
3. [ ] Commits, merge to main, cleanup, deploy, verify deployed site.

## Status

- Current: task 3. Done: tile translucent frost, extended Overview text, TabsTop arrow/Home/End keys + roving tabindex. Unit tests: use `bun run test` (plain `bun test` lacks required conditions).
