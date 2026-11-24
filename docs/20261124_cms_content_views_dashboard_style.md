# CMS "Inhalte" views – align visuals with the Dashboard

## Goal

Make the CMS demo views **Beiträge** (`?view=posts`, incl. Tabelle/Kacheln/Kanban/Kalender, quick-create dialog, create form `&id=new`, detail `&id=1`), **Medien** (`?view=media`, incl. Raster/Liste, picker dialog) and **Inhaltstypen** (`?view=content-types`, incl. editor `&id=article`) look like the **Dashboard** (`?view=dashboard`). Light + dark mode. Visual only: no behavior, data, routing, i18n text or feature changes.

Route: `/modules/DemoCMS?view=...`. Code: `src/demos/modules/cms/`. Live: https://adaptive-solid-ui.pages.dev. Baseline screenshots: `/tmp/tim/opencode/baseline-cms/*.png`.

## Dashboard design language (source of truth)

Files: `src/demos/modules/cms/views/dashboard/*`.

- Card: `rounded-2xl border border-gray-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900/60`
- Muted panel (statistics): `rounded-2xl border border-gray-200 bg-gray-50/70 p-5 dark:border-neutral-800 dark:bg-neutral-900/70`
- Page title: `text-2xl font-semibold tracking-tight`; section heading: `font-semibold` (mb-4); card title: `text-base font-semibold`
- List row: `flex items-center gap-3 py-3`, icon circle `flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[var(--dashboard-accent)] dark:bg-neutral-800`, title `text-sm font-medium`, meta `mt-0.5 text-xs text-gray-500 dark:text-neutral-400`, rows divided by subtle borders
- Neutral pill: `rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-neutral-800 dark:text-neutral-300`; success pill: `rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400`
- Accent icon circle: `bg-[color-mix(in_oklab,var(--dashboard-accent)_12%,transparent)] text-[var(--dashboard-accent)]`
- Tabs: underline style, active `border-b-2 border-[var(--dashboard-accent)] pb-3 text-sm font-semibold text-[var(--dashboard-accent)]`, inactive muted gray
- Link: `text-sm font-medium text-[var(--dashboard-accent)] hover:underline`
- Select/input: `rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100` (global select chevron rule in `src/tailwind.css` stays)
- Grid gaps: `gap-6`/`gap-8`, section spacing `space-y-8`

## Decisions

- `--dashboard-accent` is currently defined only on `CmsDashboardView` root. Define it once at the CMS layout/shell root (same value: `var(--app-sidebar-accent, var(--color-blue-600))`) so every CMS view can use it; keep the dashboard working (remove the duplicate there only if identical).
- Shared class constants go in `src/demos/modules/cms/ui/` as small files, one export per file (e.g. `cmsCardClass.ts`, `cmsMutedPanelClass.ts`, `cmsPillClass.ts`, `cmsButtonClass.ts` (secondary), `cmsPrimaryButtonClass.ts`, `cmsInputClass.ts`, `cmsIconCircleClass.ts`). Reuse them in dashboard only if trivially identical; do not refactor dashboard otherwise.
- Shared CMS components (`PageHeader`, `CmsDataTable`, `CmsKanban`, `CmsCalendar`) are restyled in place. This intentionally also changes Benutzer and Audit-Protokoll (they use `CmsDataTable`) and every view using `PageHeader` – consistent with the dashboard; verify they don't break.
- Buttons: secondary = `rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800`; primary (main CTA per page, e.g. "Beitrag erstellen", "Bilder auswählen") = accent background `bg-[var(--dashboard-accent)] text-white hover:opacity-90`, same shape. Keep focus-visible outlines (accent).
- View-mode switchers (Tabelle/Kacheln/Kanban/Kalender, Raster/Liste) become dashboard-style underline tabs or a compact segmented control with accent active state – pick one and use it consistently for both.
- Status values (Veröffentlicht/Entwurf/Archiviert) render as pills: Veröffentlicht = success pill, Entwurf = neutral pill, Archiviert = neutral muted pill. Table titles: no underline, `font-medium`, accent on hover.
- Use only existing deps; no new icon libs (reuse icons/SVG paths already used in the CMS/dashboard).

## Tasks

1. **Foundations** – accent var at CMS root, shared class constants, restyle `PageHeader` (title `tracking-tight`), restyle `CmsDataTable` (card container, header cells `text-xs font-medium uppercase tracking-wide text-gray-500`, row hover, inputs/buttons/column-menu with shared classes, status-like cells untouched unless renderer is in posts), `CmsKanban` (columns = muted panel, cards = card `rounded-xl p-4`), `CmsCalendar` (card container, subtle grid lines, entries as accent-tinted chips).
2. **Beiträge** – `views/posts/CmsPostsView.tsx` (+ store only if needed for class mapping): header buttons, view-mode switcher, status pills in table, tiles as dashboard cards (icon circle + title + meta + pill), quick-create dialog surface, create form and detail sections as cards, tabs like dashboard tabs.
3. **Medien** – `views/media/*`: dropzone (rounded-2xl dashed, accent icon circle, primary button), folders column inside a card with accent-tinted active item, search input + Raster/Liste switcher, empty state (icon circle + muted text) inside a card, grid/list items and details panel as cards, picker dialog surface.
4. **Inhaltstypen** – `views/content-types/*`: type cards like dashboard cards (icon circle, title, "n Felder" pill, hover), editor fields panel as card with dashboard-like rows.
5. **Final verification + deploy** – browser check of all views incl. Benutzer/Audit-Protokoll/Dashboard light+dark, fix issues, deploy.

## Status

- Task 1: done (origin/main 0da335c). Constants in `src/demos/modules/cms/ui/`: `cmsCardClass`, `cmsMutedPanelClass`, `cmsPillClass` (neutral), `cmsButtonClass`, `cmsPrimaryButtonClass`, `cmsInputClass`, `cmsIconCircleClass` (accent-tinted). `--dashboard-accent` now set at CMS root (`DemoCMS.tsx`).
- Task 2: done (7ab9175)
- Task 3: done (8b08c5e). Open: folder card stretches to full height when details panel is open (should be `self-start`); results area has no card surface when images exist; picker dialog close after "Auswählen" unverified.
- Task 4: done (50d1b08, dark primary button fix f7f90f7)
- Task 5: in progress
