# DemoCMS: Fade-in start animation per subpage

## Goal
Every DemoCMS subpage (https://adaptive-solid-ui.pages.dev/modules/DemoCMS) shows a small, gentle start animation: the page content fades in slowly when the subpage is first shown and every time the user switches to another subpage.

## Context
- Demo shell: `src/demos/modules/DemoCMS.tsx`; views selected via `cmsNavigation` signal + `?view=` query param (`src/demos/modules/cms/shell/cmsNavigate.ts`, `cmsNavigationSync.ts`), registry in `src/demos/modules/cms/shell/cmsViewRegistry.ts`.
- App views (dashboard, posts, media, content-types, users, roles, api-keys, audit-log, notifications, backups, system-status, trash) render in the app layout `<main>` via `viewContent()`.
- Auth views (auth-*) render via `src/demos/modules/cms/shell/CmsFullscreenLayout.tsx`.
- Settings pages (profile, account, appearance) are handled separately in `DemoCMS.tsx`.
- Tailwind v4 (`src/tailwind.css`), no tailwindcss-animate / solid-transition-group dependency. Do not add new dependencies.

## Decisions
- Scope: all app views, all auth views, all settings pages.
- Animate only the content area (not sidebar/header), so navigation chrome stays stable.
- Effect: opacity 0 -> 1, plus a subtle translateY(6px -> 0); duration ~450ms, ease-out. CSS keyframe animation (no JS timers).
- Retrigger on every subpage change by keying the content wrapper on the current view id (e.g. Solid `<Show keyed>` / keyed wrapper so the element remounts), not on every reactive update within a page.
- `prefers-reduced-motion: reduce` -> no animation (content visible immediately).
- Content must never stay invisible: use `animation-fill-mode: both` only with keyframes that end at opacity 1; no initial `opacity-0` class that relies on JS.
- Implement as one small reusable wrapper component/class inside the cms shell folder (follow repo code-style: one export per file), applied at the 2–3 render points above.

## Tasks
1. Implement the fade-in wrapper and apply it to app views, auth views and settings pages; `bun run check` passes; verify in browser (dev server) that switching views fades content in, chrome does not animate, reduced motion disables it, and no regressions (navigation, mobile collapse). — status: open
2. Commit (conventional commits), merge into main, deploy (`ops/deploy.bash` / `deploy` script), verify on https://adaptive-solid-ui.pages.dev/modules/DemoCMS in browser, clean up worktree/branch/dev servers. — status: open
