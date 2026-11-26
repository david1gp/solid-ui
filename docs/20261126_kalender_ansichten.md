# Kalender: Ansichten Heute / Tag / Woche / Monat

## Goal
In `src/demos/modules/DemoKalender.tsx` (Demo: https://adaptive-solid-ui.pages.dev/modules/DemoKalender) the view-switch fieldset "Kalenderansicht" (Heute, Tag, Woche, Monat) switches the rendered grid. Tag/Heute/Woche use a time grid with hour labels on the left (like Google/Outlook/Apple Calendar).

## Current state (facts)
- State: `src/demos/modules/kalender/kalenderStateCreate.ts` — signals `today`, `month`, `cursor` (reference date), `view` (init "Monat"); `days()` builds cells via `kalenderRangeCreate(cursor, view)`; `changeMonth(±1)` steps via `kalenderDateShift`; events for current ±1 month are generated; `dayTasks` sorted with `kalenderTasksSort` (all-day first, then start, then end).
- Grid: `DemoKalender.tsx` — KW column (58px) + day columns; Tag/Woche currently list task tiles stacked in a tall cell (`min-h-80`) using `KalenderEvent` per task (`src/demos/modules/kalender/KalenderEvent.tsx`). "+" / empty-cell click opens create dialog (`?termin=YYYY-MM-DD`), edit via `?terminBearbeiten=`, toast undo.
- `KalenderTask`: `allDay`, `start`/`end` as `HH:MM`. Native `Date`; no new date lib.

## Decisions
- **Monat**: unchanged (cells with first event + "N weitere" popover).
- **Heute**: Tag for today, Heute pressed; prev/next → Tag with shifted date.
- Prev/next step: Monat ±1 month, Woche ±7 days, Tag ±1 day. Labels: month / "KW n · range" / full date.
- **Time grid for Tag/Heute/Woche** (replaces the stacked-list cells):
  - Header row: left 58px column (clock + "MEZ" as now); per day column the weekday + date number (today highlighted violet as now) and the existing "+" button.
  - "Ganztägig" lane below the header: left label column shows "Ganztägig" (small, neutral), per day the all-day tasks as compact tiles.
  - Body: only the needed hours (see "Compact hours" below), fixed hour height (e.g. 48px/h), left column shows hour labels ("08:00", text-xs, neutral-500, aligned to the hour line like Google Calendar), horizontal hour lines (+ subtle half-hour lines) across day columns, vertical day separators.
  - Timed tasks absolutely positioned: top = start minutes × px/min, height = (end − start) × px/min with a minimum (~20px); short tiles show title + time on one line. Overlapping tasks within a day are laid out side by side (columns per overlap cluster). Tile styling identical to existing tiles (colored left border, neutral bg, dark variants, color marker, edit button/aria-label "Termin „…“ (hh:mm–hh:mm) bearbeiten").
  - Current-time line updates every minute when today is visible: strong violet with a dot in today's column, translucent across the other day columns, and a violet HH:MM label in the hour column. It does not intercept clicks.
  - **Compact hours** (user feedback: full 24h grid looks broken/empty): the body shows only hours that matter for the visible days, no inner vertical scroll, no initial scroll logic.
    - Range = floor(earliest timed start) minus one hour … ceil(latest timed end) plus one hour across all visible days (Tag: 1 day, Woche: 7 days), clamped to 00:00–24:00. Show at least four hours, extending the end or, at midnight, the start. All-day tasks don't count.
    - Between tasks, runs of ≥ 2 consecutive full hours without any timed task (across all visible days) collapse into a thin gap row (~16px, subtle dashed/neutral band, label like "10:00–13:00" or "…" in the hour column). A single empty hour and boundary padding stay normal height.
    - No timed tasks in view: show a compact default range 08:00–12:00 (so slot click still works), unless today's current hour supplies the range.
    - Pixel mapping is piecewise (segments: visible hour blocks + collapsed gaps); a pure helper `kalenderHourSegmentsCreate` (tasks → segments with startMinute, endMinute, collapsed, top, height) + `minute → y` / `y → minute` mapping, unit-tested.
    - When today is visible, include the current hour as occupied in range and gap calculations, so the now-line always lies in a non-collapsed segment. No line or time label appears otherwise.
    - Slot click only in non-collapsed segments; maps y → minute via segments (half-hour rounding as now). Creating a task outside the range via "+"/"Neuer Termin" expands the range automatically (reactive).
  - Click on an empty slot opens the create dialog for that day with start = clicked hour (rounded to half hour), end = +1h if the form API allows; otherwise default start. Keyboard path stays via "+".
  - Woche keeps `min-w-[1000px]` with horizontal scroll on mobile; Tag fills width.
- Keep all existing design tokens/classes (neutral/violet, dark mode), aria attributes, URL dialog params, undo logic. No new dependencies. Pure helpers (time → minutes, overlap layout) in their own files under `src/demos/modules/kalender/` (one export per file) with unit tests.

## Tasks
1. View switching (Heute/Tag/Woche/Monat), navigation, labels, range helpers + tests. — status: done
2. Browser verification of view switching. — status: done
3. Time grid for Tag/Heute/Woche as described (`KalenderTimeGrid.tsx`, `kalenderTimeGridStateCreate.ts`, `kalenderOverlapLayout.ts` + tests). — status: done
4. Browser verification of time grid. — status: done
5. Compact hours for Tag/Heute/Woche as described above. — status: open
