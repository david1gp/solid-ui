# DemoCMS Dashboard Redesign

## Goal

Replace the current DemoCMS dashboard (`?view=dashboard`) with a layout modelled on a "finance dashboard" reference (dark glassy cards, 3 columns), adapted to CMS content and to the existing CMS design (light + dark mode, selectable accent color).

Reference layout (desktop, ~1440px):

```
+------------------------------------------------+----------------------+
| Willkommen, Max                                |                      |
+--------------------+---------------------------+  Statistik           |
| Seiten-Info        | Schnellaktionen (More)    |  (Ring: Besucher     |
| (card, logo,       | [tile][tile][tile][tile]  |   gesamt 12.480)     |
|  name, url)        |                           |                      |
+--------------------+---------------------------+  Kennzahlen (4 small)|
| Alerts             | Entwürfe | Letzte Aktiv.  |                      |
| (list)             | Sort: Datum/Name  (list)  |  Bar chart + toggles |
+--------------------+---------------------------+----------------------+
```

The right "Statistik" column is a full-height panel (in the reference it has a slightly different surface than the left area).

## Decisions

- Replace the existing dashboard content entirely. Removed: 4 metric cards row, "Letzte Aktivitäten" panel (moves into a tab of the Entwürfe card), "Schnellaktionen" button list (becomes tiles), "Aufgaben" panel.
- Keep the existing CMS shell (sidebar, header with bell + profile, nav search). NO new search field on the dashboard.
- Support light AND dark mode. Use existing CMS tokens/classes (gray borders, `rounded-2xl` cards, existing text colors, accent color from CMS settings — check how other CMS views/sidebar consume the accent, reuse it). Subtle glass/shadow/gradient effects only in dark mode (`dark:` variants). No hardcoded new palette.
- All data is mock/demo data, defined in separate state/data files (not inline in .tsx).
- All texts bilingual (DE/EN) using the same mechanism as `cmsDashboardStateCreate.ts`. German examples below.
- Icons: `@adaptive-ds/mdi` per-icon imports, as in `cmsViewRegistry.ts`.
- Charts: hand-built SVG/HTML (like `CmsMiniChart.tsx`), no new chart library.
- Responsive: 3 columns on xl, stack sensibly on md/mobile (statistics below).
- Follow the `code-style` skill (/home/tim/.agents/skills/code-style/SKILL.md): one export per file, view-only .tsx, logic in state files.

## Sections

1. **Header**: "Willkommen, Max" (EN: "Welcome, Max"), optional short subtitle.
2. **Seiten-Info** (replaces "My Card"): card styled like the reference credit card (gradient/glass in dark, accent-tinted in light). Shows logo ("Atlas." brand mark as in sidebar), name "Atlas", URL `www.max-mustermann.de`, status badge "Online". Not editable.
3. **Schnellaktionen** (replaces "Category"): 4 tiles, each round icon + label + small count, clickable → navigate to view via existing CMS navigation:
   - Neue Seite → `pages` (count: 24 Seiten)
   - Neuer Beitrag → `posts` (128 Beiträge)
   - Medien hochladen → `media` (846 Medien)
   - Benutzer → `users` (18 Benutzer)
   Header link "Mehr" is optional (may navigate to pages or be omitted).
4. **Alerts** (replaces "Send money"): list with type icon + color per type, title, subtitle/date, optional amount:
   - Zahlungseingang (green, e.g. "Rechnung #1042 bezahlt", +1.240,00 €)
   - Fehler (red, e.g. "Formular-Versand fehlgeschlagen", "Backup fehlgeschlagen")
   - Nachricht / E-Mail-Anfrage (accent, e.g. "Anfrage über Kontaktformular – Anna Schmidt")
   ~5 items. Click (item or header "Alle") → `notifications` view.
5. **Entwürfe** (replaces "Transaction"): tabs "Entwürfe" | "Letzte Aktivitäten".
   - Entwürfe tab: unpublished page drafts built in the page builder (mock), each: icon, page name, "zuletzt bearbeitet" date/time, badge "Entwurf". Sort select: Datum / Name (functional). Click → `pages` view.
   - Letzte Aktivitäten tab: the 4 former activity items (Beitrag veröffentlicht – vor 15 Minuten, Startseite aktualisiert – vor 2 Stunden, Neue Medien hinzugefügt – gestern, Benutzer eingeladen – vor 3 Tagen).
6. **Statistik** (replaces "Statistics", right column):
   - Big ring/donut (neumorphic in dark) with "Besucher gesamt" + value (e.g. 12.480), value changes with selected range/metric.
   - 4 small metric rows/chips: Beiträge 128, Seiten 24, Medien 846, Benutzer 18 (with +x% trend, green).
   - Bar chart of visitors: metric select "Besucher" / "Seitenaufrufe", range toggle "Monat" / "Woche" / "Tag", vertical rounded bars (accent/gradient colors), x labels, highlighted bar with value bubble (hover or current period). Functional toggles with mock data.

## Files (existing)

- `src/demos/modules/cms/views/dashboard/CmsDashboardView.tsx` (replace)
- `src/demos/modules/cms/views/dashboard/cmsDashboardStateCreate.ts` (rework)
- `src/demos/modules/cms/ui/CmsMiniChart.tsx` (may reuse)
- `src/demos/modules/cms/shell/cmsNavigate.ts` (navigation)
- New components go into `src/demos/modules/cms/views/dashboard/` (one component per file).

## Verification

- Typecheck: `bunx tsc --noEmit` (note: `src/routeTree.gen.js` is generated by vite; run `bun run build` or start `bun dev` once to generate it before typechecking).
- Formatting: biome as used in `check` script, only on changed files.
- Do NOT run the full test suite per task; only `bun test test/demoCmsMobileCollapseCreate.test.ts` if shell files are touched.
- UI: browser subagent checks `http://localhost:<port>/modules/DemoCMS?view=dashboard` in light + dark, desktop 1440 + mobile 390.

## Tasks

1. [x] Data + state: mock data files and state (alerts, drafts, activities, quick actions, site info, visitor series for month/week/day × visitors/pageviews), i18n texts, sort/tab/range/metric signals.
2. [x] UI: new dashboard components + layout replacing `CmsDashboardView.tsx`.
3. [x] Visual verification (browser) + fixes.
4. [ ] Commit, merge to main, deploy, verify on https://adaptive-solid-ui.pages.dev/modules/DemoCMS?view=dashboard.

## Current context

Worktree: `/tmp/solid-ui-dashboard-gtny`, branch `feat/cms-dashboard-redesign`.
Task 1 data/state files exist in `src/demos/modules/cms/views/dashboard/` (cmsDashboard{SiteInfo,QuickActions,Alerts,Drafts,Activities,Metrics,VisitorSeries}.ts, cmsDashboardStateCreate.ts; tab synced to `dashboardTab` query param). Task 2 done: components CmsDashboard{SiteInfoCard,QuickActionTiles,AlertsCard,DraftsCard,StatisticsPanel}.tsx; DemoCMS.tsx now sets the accent CSS variable on the content wrapper. Task 3 done (chart: 7 periods per range, thin gradient bars; site card logo bubble). Tests must run with the package `test` script conditions (browser/development).
