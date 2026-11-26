# Kalender: Ansichten Heute / Tag / Woche / Monat

## Goal
In `src/demos/modules/DemoKalender.tsx` (Demo: https://adaptive-solid-ui.pages.dev/modules/DemoKalender) the view-switch fieldset "Kalenderansicht" (Heute, Tag, Woche, Monat) currently only sets `state.view()`; the grid always renders the month. Make the grid actually render the selected view.

## Current state (facts)
- State: `src/demos/modules/kalender/kalenderStateCreate.ts` — signals `today`, `month`, `view` (init "Monat"), `days()` builds month cells, `changeMonth(±1)`, `selectView`, "Heute" resets month to today.
- Grid: `DemoKalender.tsx` ~L76–127, `grid-cols-[58px_repeat(7,minmax(0,1fr))]` (KW column + 7 weekdays), day cells render `KalenderEvent` (first event + "N weitere" popover), "+" / empty-cell click opens create dialog (`?termin=YYYY-MM-DD`), edit via `?terminBearbeiten=`, toast undo.
- Tasks keyed by `YYYY-MM-DD`; `KalenderTask` has `allDay`, `start`/`end` as `HH:MM`. Native `Date` used; no new date lib.

## Decisions
- One reference date signal (`cursor` / selected date) drives all views; `month` derived/kept consistent with it so existing month logic and event generation (seeded per month in `kalenderEventsCreate.ts`) keep working — when the visible range spans another month, events for that month must be available too.
- **Monat**: unchanged existing grid (default view stays "Monat").
- **Woche**: one row of 7 days (Mon–Sun) of the week containing the reference date, same KW column + header style; cells are taller and list **all** tasks of the day (no "weitere" truncation needed, or generous limit), sorted (allDay first, then start time).
- **Tag**: single day (reference date) — header with weekday + date, full list of that day's tasks (allDay first, then by start), with the same create ("+"/empty click) and edit interactions.
- **Heute**: same rendering as Tag but locked to today: sets reference date = today, and is the pressed button (`view = "Heute"`). Keeps existing reset behavior (clears open popover, closes dialog).
- Prev/next buttons step by the active view: Monat ±1 month, Woche ±7 days, Tag ±1 day; in Heute, prev/next switches to Tag with the shifted date. Title/label next to the arrows reflects the range (month name / "KW n · date range" / full date), German locale as existing.
- Keep all existing design tokens/classes (neutral/violet, dark mode), aria attributes, URL dialog params, undo logic. No new dependencies.
- Pure date/range helpers in their own files under `src/demos/modules/kalender/` (one export per file), unit-testable.

## Tasks
1. Implement state (reference date, view-aware range/days, navigation step, labels) + view-aware rendering in DemoKalender (Tag/Heute/Woche), add unit tests for range helpers in `test/`. — status: open
2. Browser verification of all 4 views, navigation, create/edit dialog, dark mode, mobile width. — status: open
