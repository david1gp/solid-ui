# CMS Demo: Benachrichtigungen-Seite aufwerten

## Goal

Make the CMS demo notifications page (`/modules/DemoCMS?view=notifications`) worth its own page: more than a copy of the bell dropdown. Only the page itself changes. Required side effect: the bell badge/dropdown reflect the shared read status.

## Out of scope (user decision)

- Sidebar entry "Benachrichtigungen" stays; route stays; no slide-over panel.
- No notification preferences/settings, no moving inquiries/payments into other sections.
- Dashboard alerts card keeps showing the 5 current alerts (unchanged look/behavior).
- No new dependencies.

## Current state

- `src/demos/modules/cms/views/notifications/CmsNotificationsView.tsx`: PageHeader + "Alle als gelesen markieren" button + list of `cmsDashboardAlerts` with a LOCAL unread signal, per-row toggle read/unread, "Neu" pill.
- `src/demos/modules/cms/views/dashboard/cmsDashboardAlerts.ts`: 5 alerts `{ id, type: "payment"|"error"|"message", title{de,en}, subtitle{de,en}, amount? }` (`as const`).
- `CmsDashboardAlertIcon.tsx` (icon by type), `CmsDashboardAlertsCard.tsx` (dashboard card), `shell/CmsShellHeader.tsx` + `shell/cmsShellHeaderStateCreate.ts` (bell `<details>` dropdown, badge = all alerts count).
- State conventions: Solid signals / `createSignalObject`, module-level stores for shared data (e.g. `shell/cmsNavigation.ts`), locale `i18n/cmsLocale.ts`, formatters `i18n/cmsDateFormat.ts`, relative time via `Intl.RelativeTimeFormat` (see `cmsDashboardStateCreate.ts:120`). Views own inline `{ de, en }` text. CMS uses native buttons + Tailwind (see CMS button class helpers used in `CmsUsersView.tsx`).

## Decisions

- Single source of truth: notification data lives in one data file; the 5 existing alerts keep ids/texts exactly; add `createdAt` (relative offsets from "now" computed at module load, e.g. minutes/hours ago) to all.
- History: add ~4 older notifications (initially read), plausible for the CMS (e.g. "Backup erfolgreich" (message/info -> use existing types only: payment|error|message), older payment "Rechnung #1038 bezahlt", older inquiry, "Formular wieder erreichbar"). Dashboard card + dropdown keep showing only the 5 current alerts (filter by an `isCurrent`/history flag or by id list — implementer picks the simplest clean way; dashboard output must not change).
- Shared module-level store `cmsNotificationsStore` (one export per file): read state per id, dismissed ids, actions `markRead(id)`, `toggleRead(id)`, `markAllRead()`, `dismiss(id)`, derived `unreadCount`. In-memory only (resets on reload).
- Bell: badge = unread count (hidden when 0); dropdown lists unread non-dismissed notifications (newest first); empty-state text when none. Dashboard card unchanged.
- Page features:
  1. Read status: unread rows visually highlighted (keep dot + "Neu" pill), clicking row body marks read; per-row toggle read/unread kept.
  2. "Alle als gelesen markieren" (disabled when nothing unread).
  3. Time per row: relative ("vor 5 Min.", "vor 3 Std.", "gestern") for < 7 days, else localized date; `<time datetime>` with full date in `title`.
  4. Type filter: Alle / Ungelesen / Fehler / Zahlungen / Nachrichten with counts, as accessible segmented buttons (`aria-pressed`) — native buttons + Tailwind like other CMS views; horizontally scrollable on mobile.
  5. Inline actions per type (demo, no backend): error backup -> "Backup erneut starten", form error -> "Formular-Log ansehen", message/contact -> "Anfrage öffnen", payment -> "Rechnung ansehen". Feedback via existing toast mechanism if CMS demo already uses one (`ui/interactive/toast/`), else a short inline status text. Triggering an action marks the item read.
  6. Dismiss per row ("Ausblenden", icon button with aria-label) removes it from list.
  7. Empty states: "Keine Benachrichtigungen" vs. "Keine Einträge für diesen Filter".
  8. Optional grouping headers "Heute" / "Früher" if clean.
- All texts de + en. Light/dark mode, mobile width 390px must look good. Use mdi icons already used in CMS.
- Logic (filtering, counts, relative time) in plain `.ts` files (view-only `.tsx`), with unit tests in `test/` for store + filter/relative-time helpers.

## Tasks

1. Data + store + bell integration + page features (one increment, single implementer), unit tests, `bun run check`.
2. Browser verification (dev server): page features, bell badge sync, dashboard card unchanged, de/en, dark, mobile.
3. Merge to main, push, deploy (`bun run deploy`), verify production.

## Status

- Task 1: done
- Task 2: done
- Task 3: done
