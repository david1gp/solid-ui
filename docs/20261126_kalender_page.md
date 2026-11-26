# Kalender page (Modules › Seiten)

## Goal
New demo page "Kalender" in the demo catalog, tab **Modules**, category **Seiten**. Full-page layout:
left = the existing "Sidebar-Simple" (`AppSidebar` from `ui/modules/app_sidebar/AppSidebar.tsx`, as used in
`src/demos/modules/DemoAppSidebar.tsx`), right = a month-view "Task scheduling board" modelled on the reference screenshot
(`docs/20261126_kalender_reference.png`).

## Decisions
- Demo name `DemoKalender`, file `src/demos/modules/DemoKalender.tsx`, registered in `src/app/demos/demoList.ts` (`modules`, lazy import like the others).
  Display name override `DemoKalender: "Kalender"` in the `demoDisplayNames` map (`src/app/demos/DemoViews.tsx`, check `demoSearch.ts` uses the same map).
  Not added to the Navigation UI list in `demoSubcategories.ts` → lands in Seiten automatically.
- Calendar-specific sub-components/helpers go into `src/demos/modules/kalender/` (one export per file, subject-first names, view-only .tsx, logic in .ts) – mirror the `cms/` folder pattern.
- Reuse existing repo pieces first (no new dependencies): `AppSidebar`, `Button*`, `ToggleButton`, `CorvuPopover`, Material icons as used in the repo, Monday-first grid logic similar to `src/demos/modules/cms/ui/cmsDatePickerDays.ts`.
- UI text in English like the screenshot (title "Task scheduling board", weekday names, "Today/Day/Week/Month", "N More"). Sidebar entries may use calendar-relevant items, the "Kalender"/Calendar item active.
- Styling: Tailwind; must look right in dark mode (screenshot reference: near-black #1e1f22-ish surfaces, subtle grid borders, violet accent for active toggle and "More" dots) and remain usable in light mode via theme tokens + `dark:` variants (like DemoCMS).
- Static demo data (fixed month, e.g. starting from a Monday-first grid, ~5 weeks), deterministic – no `new Date()` dependent rendering at module load beyond state.

## Screenshot features to reproduce
1. Header: title "Task scheduling board" + subtitle "10 task scheduled for the day"; right side: overlapping avatar stack with "+4", filter icon, search icon, current date label with prev/next chevrons, segmented toggle Today | Day | Week | Month (one active, violet).
2. Grid: left gutter column with clock icon + "PST" in header and "Week 1..5" labels per row; columns Mon–Sun; the current weekday header (e.g. Fri) highlighted in violet; day number badges in cell top-left; empty/outside-month cells.
3. Event cards: dark card, left colored border, title (brand name), meta line "Card02-150 | PT- 45 Min", small colored square top-right (tooltip on hover with color name, e.g. "Cyan color for Estee Lauder"); a "• N More" link under the card.
4. "N More" opens a popover listing all tasks of that day ("Friday 3") with colored squares, title and meta, closable via X.
5. Prev/next changes month; Today/Day/Week/Month toggle switches state (Month view is the fully implemented view; others may show the same month grid or a simple week grid – keep minimal).
6. Responsive: horizontal scroll for the grid on narrow screens, sidebar collapses per AppSidebar behaviour.

## Tasks
1. Implement page + registration (status: done – DemoKalender.tsx, kalender/kalenderStateCreate.ts, demoList.ts, DemoViews.tsx)
2. Polish: collapsed sidebar rail, varied card colors/meta, code-style split, light mode, browser re-check (status: in progress)
3. Final checks, commits, merge to main, cleanup (status: todo)

## Context
- Worktree: /tmp/solid-ui-kalender-p7UI (branch feat/kalender-page). Dev: `bun dev` (vite, default port 3031 – use a free port if busy).
- Baseline `tsc` already has 4 errors (missing generated `src/routeTree.gen.js` etc.) – do not count those; introduce no new ones.
- Only run targeted checks (tsc, biome on changed files). No full test suites unless asked.
