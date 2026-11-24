# Timeline: centered demo + best-practice visual refresh

Worktree: `/tmp/solid-ui-timeline-MD7p` (branch `feat/timeline-centered-colors`). Never edit `/adaptive/solid-ui` directly (it has unrelated uncommitted changes).

## Goal
1. `https://adaptive-solid-ui.pages.dev/static/DemoTimeline`: page content (heading, description, timeline) horizontally centered with a sensible max width and side padding (currently flush left at x=0, touches viewport edge).
2. Refresh the Timeline component visually following best practice: clear active/completed vs. current vs. upcoming states, using theme color tokens (works in light + dark mode).

## Files
- Demo: `src/demos/static/DemoTimeline.tsx`
- Component: `ui/static/timeline/Timeline.tsx`
- Theme tokens: `src/tailwind.css` (Tailwind v4, class-based `.dark`). Use existing tokens only (`primary`, `primary-foreground`, `muted`, `muted-foreground`, `border`, `background`, `foreground`, `card`, ...). No new deps, no hardcoded hex colors.

## Decisions
- Keep public API backward compatible: `items`, `activeItem`, `bulletSize`, `lineSize`, item `title/description/bullet` keep their semantics (activeItem -1 = nothing active; bullets `<= activeItem` active; lines between items `< activeItem` active).
- States per item index i: `completed` (i < activeItem), `current` (i === activeItem), `upcoming` (i > activeItem).
  - completed: bullet filled `bg-primary text-primary-foreground border-primary`; connecting line `primary`.
  - current: bullet `border-primary bg-background text-primary` + subtle ring (`ring-4 ring-primary/20` or similar); title in `text-foreground`; `aria-current="step"` on the li.
  - upcoming: bullet `border-border bg-background text-muted-foreground`; line `border`/`bg-border`; title slightly muted (`text-muted-foreground` or `text-foreground/70`).
- Bullet must sit opaque on top of the line (`bg-background`, z-index) so the line never shows through.
- Semantics: use `<ol>` (ordered process), bullets `aria-hidden`. Smooth `transition-colors`.
- Demo: wrap in centered container e.g. `mx-auto w-full max-w-2xl px-4 py-8` (heading + timeline left-aligned inside the centered column). Optionally show the timeline inside a `rounded-xl border bg-card p-6` card. Demo may bump bulletSize to ~32 so icons fit nicely (`h-4 w-4` icons).

## Tasks
1. [x] Implement component + demo changes; run `bun run check` subset: `bunx tsc --noEmit` (or project's tsc cmd) and biome format check on changed files; no e2e.
2. [x] Browser verification (dev server, light/dark, 1440 + 390 widths) vs baseline screenshots in `/tmp/tim/opencode/timeline-*.png`.
3. [ ] Commit (conventional), merge into main, push, cleanup worktree/branch, verify deployed page.

## Current context
- node_modules set up in worktree.
- Theme has NO `primary` token (old `border-primary` was a no-op). Accent = project blue convention (`blue-600` / `dark:blue-500`); upcoming = neutral-300/600. Done and browser-verified.
