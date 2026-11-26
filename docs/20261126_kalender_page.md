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
- Every appointment has a stable id starting with its date key (`2026-11-26-g2` generated, `…-n1` created). Created, edited, and deleted appointments are kept in memory per day (a changed day replaces its generated list); they survive month navigation but not a reload.
- The open dialog is stored in search params (valibot-validated, `history.replaceState`): `?termin=2026-11-26` for a new appointment, `?terminBearbeiten=2026-11-26-g2` for editing. Opening such a URL shows that month with the dialog; unknown values are removed.
- Each create/save/delete shows a toast with "Rückgängig" for 6 seconds, restoring the previous state.

## Features
1. The header shows the number of today's appointments, a German month label and navigation. Heute returns to the current month.
2. The Monday-first grid uses ISO calendar week labels and highlights today and its weekday in the current month.
3. Event cards show a title, time, duration, and colored marker with a German tooltip. "N weitere" opens a closable popover with all appointments for that day.
4. Previous/next changes month across years; the other view toggles retain the month grid.
5. Clicking a day's free area or its "+" button (shown on hover and keyboard focus, always on touch devices) opens "Neuer Termin": free-text title with suggestions, "Ganztägig" switch, Beginn/Ende in 15-minute steps (default: next half hour today, otherwise 09:00; one hour long; moving Beginn keeps the duration), and a people search with team suggestions (↑/↓/Enter, Backspace removes the last chip) or external people by e-mail.
6. Clicking an appointment card or an entry in the "N weitere" popover opens "Termin bearbeiten" with Speichern and Löschen. Cards and the popover show "mit …"; all-day appointments are listed first as "Ganztägig".
