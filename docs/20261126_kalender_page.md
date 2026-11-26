# Kalender page (Modules › Seiten)

## Goal
A full-width demo page "Kalender" in the **Modules** catalog, category **Seiten**, showing a month-view Aufgabenplanung without a sidebar.

## Decisions
- `DemoKalender` is registered in `src/app/demos/demoList.ts` and displayed as "Kalender" via `DemoViews.tsx`.
- Calendar components and state live in `src/demos/modules/kalender/`; reuse existing popover, icons, and avatar components without new dependencies.
- All visible interface text, accessible labels, and tooltips are in German; brand names remain unchanged.
- Tailwind styling supports dark and light modes, with violet accents and a horizontally scrollable grid on narrow screens.
- Demo data is deterministic and starts in April 2020.

## Features
1. Header: "Aufgabenplanung", "10 Aufgaben für heute geplant", avatar stack, filter and search controls, German month label with previous/next controls, and Heute | Tag | Woche | Monat toggle.
2. Monday-first grid with MEZ, Woche labels, short weekday names, and day number badges.
3. Event cards show a brand, duration, and a colored marker with a German tooltip. "N weitere" opens a closable popover with the full German date and task list.
4. Previous/next changes month; the view toggle changes its selected state while retaining the month grid.
