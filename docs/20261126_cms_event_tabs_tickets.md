# CMS Event Edit: Details / Tickets tabs

## Goal

In the demo CMS event edit form (`src/demos/modules/cms/views/content-types/events/CmsEventEdit.tsx`), split the "Veranstaltungsdetails" section into two tabs:

- **Details**: Titel, Position in der Liste, Ort, Hervorgehoben (Top-Veranstaltung), Beschreibung
- **Tickets**: Termine (the list of schedule entries plus "+ Termin hinzufügen"). Each Termin gets its own **Plätze**, **Preis normal**, and **Preis ermäßigt**.

## Decisions

- Keep the section card and the `Veranstaltungsdetails` heading. Put the tabs directly below the heading.
- Use the existing `ui/interactive/tabs/TabsTop.tsx`. Do not build a custom tablist. Do not add new libraries.
- Tab labels: `Details`, `Tickets`. The default tab is `Details`.
- Plätze moves from the event level to each schedule entry. Remove event-level `capacity` from the model and its form. Migrate the demo data so each schedule entry gets a `capacity` (copy the old event capacity into every entry).
- Prices are per schedule entry: `priceRegular` and `priceReduced`, numbers in EUR. Both are optional (empty means no price). Inputs are `type="number" min="0" step="0.01"`, labelled "Preis normal (€)" and "Preis ermäßigt (€)". Plätze uses `type="number" min="0" step="1"`.
- Seats appear only in the edit form and data model. Where the list/preview read the event-level `capacity`, adapt them (sum of entry capacities).
- Preview card: show the lowest ticket price of the event as `ab {preis} €`. This is the minimum over all schedule entries and both `priceRegular` and `priceReduced`, ignoring empty values. Use German number formatting (`Intl.NumberFormat('de-DE')`, no decimals for whole amounts, otherwise 2 decimals, e.g. `ab 9,50 €`). If no price is set, show nothing. Put the min-price computation in its own pure function file with a unit test.
- Layout per Termin row: Datum + Uhrzeit (as today), then Plätze, Preis normal, Preis ermäßigt. Use a responsive container-query grid consistent with the existing `@min-[28rem]:grid-cols-2` style. Keep the existing accessible labels and ids pattern, and the existing German date/time validation.
- All UI text is German, inline, matching the existing style.

## Data model

`CmsEventScheduleEntry` becomes `{ date, time, capacity?: number, priceRegular?: number, priceReduced?: number }`. The edit-state schedule rows gain matching signals or fields.

## Tasks

1. [x] Model + state + form tabs implementation (in worktree), update/extend unit tests in `test/cmsEvent*.test.ts`
2. [x] Browser verification of the edit form (tabs switch, Termine fields, add Termin, validation still works, light/dark, narrow width)
3. [x] Preview card "ab xx €" min price
4. [x] Termin row layout polish: each Termin is a small bordered group with heading "Termin N" (remove button in the header). Row 1: Datum + Uhrzeit side by side. Row 2: Plätze, Preis normal, Preis ermäßigt in 3 columns. Stack only on really narrow containers (below ~20rem). Keep the new-row date/time prefill suggestion.
5. [x] Commits, merge to main, cleanup worktree

## Verification

- Unit: `bun test --isolate --conditions=browser --conditions=development ./test/cmsEvent*` (only the event tests, not the full suite until the end)
- Typecheck/build: use the repo's existing typecheck script, or `bunx tsc --noEmit` if none exists
- UI: browser subagent against a local `bun dev` server
