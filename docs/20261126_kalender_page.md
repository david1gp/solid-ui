# Kalender page (Modules › Seiten)

## Goal
A full-width demo page "Kalender" in the **Modules** catalog, category **Seiten**, showing a month-view Aufgabenplanung without a sidebar.

## Decisions
- `DemoKalender` is registered in `src/app/demos/demoList.ts` and displayed as "Kalender" via `DemoViews.tsx`.
- Calendar components and state live in `src/demos/modules/kalender/`; reuse existing popover, icons, and avatar components without new dependencies.
- Interface text, accessible labels, and tooltips are in German.
- Tailwind styling supports dark and light modes, with violet accents and a horizontally scrollable grid on narrow screens.
- Local current date is resolved on mount to avoid server/client hydration differences. The initial server and client render has an empty calendar until mounting.
- Generic appointments are generated deterministically using a year/month seed; returning to a month reproduces its appointments.

## Features
1. The header shows the number of today's appointments, a German month label and navigation. Heute returns to the current month.
2. The Monday-first grid uses ISO calendar week labels and highlights today and its weekday in the current month.
3. Event cards show a title, time, duration, and colored marker with a German tooltip. "N weitere" opens a closable popover with all appointments for that day.
4. Previous/next changes month across years; the other view toggles retain the month grid.
