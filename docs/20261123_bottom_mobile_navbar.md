# Bottom-Mobile-Navbar module page

## Goal
New page under "Modules": `/modules/Bottom-Mobile-Navbar` (menu label "Bottom-Mobile-Navbar"), showing an Instagram-like mobile bottom navigation bar: icons only, exactly 5 items, built from the same UI building blocks as `/modules/DemoAppSidebar`.

## Decisions
- Slug / registry key: `"Bottom-Mobile-Navbar"` (quoted key in `modules` of `src/app/demos/demoList.ts`). If the label logic in `src/app/demos/DemoViews.tsx` mangles it, add a display-label override "Bottom-Mobile-Navbar". Add to `fullscreenDemos` only if needed for the phone-frame layout (follow how DemoAppSidebar is rendered).
- Reusable component in `ui/modules/bottom_navbar/` (mirrors `ui/modules/app_sidebar/` conventions: one export per file, PascalCase components, camelCase helpers, `Icon` component with `@adaptive-ds/mdi` path imports, existing class/theme utilities). Export it the same way app_sidebar components are exported (check package exports / index files, if any).
- Demo: `src/demos/modules/DemoBottomMobileNavbar.tsx`, exported `DemoBottomMobileNavbar`, lazy-loaded like `DemoAppSidebar`.
- Items (icons only, aria-label on each, max 5 enforced by type/doc): Home, Search, Create (+ square), Reels (video/play), Profile (round avatar reusing `AppSidebarAvatar`/`AppSidebarCssAvatar` from app_sidebar).
- Active item shows filled mdi variant (e.g. `mdiHome` vs `mdiHomeOutline`), inactive outline; profile avatar gets ring when active. No text labels.
- Bar: fixed to bottom of its container, full width, evenly spaced, border-top, background matching theme (light/dark), `padding-bottom: env(safe-area-inset-bottom)`, touch targets >= 44px, `role="navigation"`/`nav` with `aria-current="page"` on active.
- Demo layout: on desktop, a phone-sized frame (~390x780, rounded) centered, with placeholder feed content scrolling above the bar; on small viewports the frame fills the screen. Clicking icons switches active state and the placeholder screen title/content.
- Use only existing dependencies from package.json. No new libraries.

## Tasks
1. Implement component + demo + registry entry; run `bun run check` (tsc + biome + unit tests). Status: done
2. Browser verification (desktop + mobile viewport, light/dark, DemoAppSidebar still works). Status: done (global demo notice offset above navbar via `data-demo-notice` + CSS in src/tailwind.css)
3. Commits, merge to main, cleanup worktree, push, verify on preview/deployed site. Status: pending

## Context
- Worktree: /tmp/solid-ui-bottomnav-72Dv, branch `feat/bottom-mobile-navbar` from `main`. Dev: `bun dev`.
