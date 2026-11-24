# DemoCMS – Admin-Panel-Vorlage

## Goal
Turn `/modules/DemoCMS` (https://adaptive-solid-ui.pages.dev/modules/DemoCMS) into a complete **admin panel / CMS backend template**.
It is a **demo**: everything is mock data held in client-side signals. No real auth, no backend, no network calls.
Buttons may change local state (add row, toggle, open dialog), but auth/login/register never "really" authenticate.

## Design rules (strict)
- Follow the simple look of the existing `CmsSidebar` (`src/demos/modules/cms/CmsSidebar.tsx`): neutral colours, thin borders, `rounded-xl/2xl`, small text, MDI icons, existing accent colour, Tailwind `dark:` variants as already used.
- The content area keeps the existing layout: `flex-1 min-w-0 p-8 overflow-y-auto`, headings `text-2xl font-semibold`, cards `p-4 rounded-2xl border`.
- Sidebar **visuals stay unchanged**. Only its groups/items (navigation content) change.
- Reuse library components first (`#ui/...`): Table, Input, SelectSingle, Checkbox, SwitchSingle, Textarea, CorvuDialog, CorvuPopover, TabsTop, Badge, CardWrapper, Details, Button, Icon (`@adaptive-ds/mdi`).
- **No new npm dependencies.** Missing pieces are built lightweight and demo-local under `src/demos/modules/cms/`. Do not add new library components under `ui/`.
- Responsive: usable on mobile (the existing mobile collapse/drawer must keep working).

## Out of scope (do NOT build)
- Editorial workflow: versions, diff, restore, approval status, scheduling
- SEO fields, redirects
- Reports/analytics pages (date range filter, charts, export). Small mini-charts on the dashboard are allowed.
- State/error templates: empty states, skeletons, "no results" pages, 404/403/500/offline pages, toasts/inline alerts/progress templates as dedicated features (existing toast usage may stay)
- Command palette (⌘K), new light/dark/white-label theming features (the existing appearance settings stay as is), keyboard/a11y work beyond normal semantic HTML
- Multi-tenant/organisations, billing/subscription

## Decisions
- **Navigation is state + URL query.** `?view=<key>` (optional `&id=<id>`) on `/modules/DemoCMS`. It is read client-side only (guard `typeof window`) and written with `history.pushState`/`replaceState`, with `popstate` handled. The prerendered static page stays the same, so it works on Cloudflare Pages. The route files (`src/routes/$.tsx`) are not changed.
- **Language:** the UI supports DE (default) and EN. The existing language selector in the appearance settings plus a header switch drive a shared `cmsLocale` signal. Shell strings live in `cms/i18n/`; **each view keeps its own small `{ de, en }` text object in its own folder** to avoid merge conflicts. Dates and numbers use `Intl` with the current locale.
- The old main nav items (Projekte, ISO 27001, Ablauf, Protokolle, Kunden) are replaced by the new structure. The existing settings screens (Profil, Konto & Sicherheit, Erscheinungsbild) are kept and extended.
- File layout:
  - `cms/shell/`: header, breadcrumbs, view registry, URL sync, auth/fullscreen layouts
  - `cms/ui/`: demo-local primitives
  - `cms/views/<area>/`: one folder per area
  - `cms/data/`: mock data
  - Code style: subject-first names, named exports, small files (see `/home/tim/.agents/skills/code-style/SKILL.md`; stay consistent with the existing cms files).

## Navigation structure (sidebar groups → view keys)
- **Übersicht:** `dashboard`
- **Inhalte:** `pages` (page tree + block editor), `posts` (generic CRUD showcase), `media`, `menus`, `content-types`, `translations`
- **Verwaltung:** `users`, `roles`, `teams`
- **System:** `settings-general` (Allgemein, Branding, E-Mail, Sprachen), `integrations` (integrations + webhooks), `api-keys`, `audit-log`, `notifications`, `import-export`, `backups`, `system-status`, `trash` (Papierkorb)
- **Vorlagen (Auth):** `auth-login`, `auth-register`, `auth-forgot`, `auth-reset`, `auth-2fa`, `auth-verify-email`, `auth-invite`, `auth-session-expired`. Rendered in the auth layout (centred card, no sidebar) with a small "← Zurück zum Admin" link.
- The existing user menu/settings entry opens the existing settings (profile, account, appearance) and the new profile sections.

## Tasks
Status: `todo` / `wip` / `done`

1. **[done] Shell foundation:**
   - View registry, `?view` URL sync, new sidebar groups, placeholder view per key (title + "TODO")
   - App-shell header: breadcrumbs, search field (filters nav, visual), notifications dropdown, user menu, DE/EN switch
   - Auth layout and fullscreen layout wrappers
   - `cmsLocale` + shell i18n + `Intl` format helpers
   - Primitives in `cms/ui/`: PageHeader (title, description, actions), Breadcrumbs, Dropdown menu, Drawer (right side), ConfirmDialog (on CorvuDialog)
   - Remove the old main nav content; keep the settings working.
2. **[done] Data primitives (`cms/ui/`):**
   - `CmsDataTable`: sort, filter, search, pagination, column picker, row multi-select + bulk actions bar, CSV export (client-side download), saved views (local)
   - `CmsKanban` (native HTML5 drag & drop), `CmsCalendar` (month grid with events), `CmsTree` (expand/collapse, drag reorder), `CmsRichText` (contenteditable + toolbar: bold, italic, heading, list, link), `CmsMiniChart` (inline SVG line/bar sparkline)
   - Generic, typed, with a quick example in a scratch view only if needed. Do not touch the shell files from task 1.
3. **[done] Posts = CRUD showcase (`views/posts`):**
   - List with view switcher (Table / Grid / Kanban / Calendar)
   - Detail view: header with status + actions, tabs (Übersicht, Verlauf/Aktivität, Verknüpfungen), side info column
   - Edit/create form: sections + tabs, validation, unsaved-changes warning, autosave indicator, draft/publish toggle (no version history)
   - Step wizard for create, quick-create drawer, delete/archive/restore confirms
   - `trash` view
4. **[done] Content (`views/pages`, `views/media`, `views/menus`):**
   - Page tree + fullscreen block editor: add/reorder blocks by DnD, block settings panel, rich text block, desktop/tablet/mobile preview
   - Media library: upload dropzone using local object URLs, folders, search, grid/list, detail panel with alt text, focus point and simple crop frame, reusable media picker dialog
   - Menu editor: tree with DnD
5. **[done] Content-type builder + translations (`views/content-types`, `views/translations`):**
   - Field builder: text, number, date, relation, media, repeater group; field settings
   - Translations: language switch + side-by-side source/target editing
6. **[done] Dashboard (`views/dashboard`):** KPI cards with mini charts, recent activity, quick actions, tasks list (checkable).
7. **[done] Users & roles (`views/users`, `views/roles`, `views/teams` + profile extensions):**
   - Users list/detail/invite drawer
   - Role × resource × action permission matrix
   - Teams
   - Profile additions in settings: password change, 2FA setup (QR placeholder), active sessions, personal API tokens
8. **[done] System (`views/settings-general`, `integrations`, `api-keys`, `audit-log`, `notifications`, `import-export`, `backups`, `system-status`):**
   - Settings page with left sub-nav and grouped forms; integrations as cards with connect toggles; webhooks list + create dialog
   - API keys create/revoke (masked)
   - Audit log in CmsDataTable; notification centre (read/unread)
   - Import (file drop + mapping preview) / export; backups list (create/restore demo); system status (service health list)
9. **[done] Auth templates (`views/auth`):** login (email/password + SSO/OAuth buttons), register, forgot password, reset password, 2FA code, verify e-mail, accept invite, session expired. Visual only, no real logic.
10. **[done] Final integration:** consistent look across all views, DE/EN completeness, mobile check, `tsc` + biome clean, full browser walkthrough. Must cover:
   - full flows of dashboard, auth (all 8 screens + linking), users/roles/teams
   - the sidebar "Einstellungen" entry actually opening settings (`?view=settings&id=<section>`)
   - CSV export content
   - mobile interactions of kanban/calendar/tree
   - the demo notice in the shell must be translated in EN; the menu selector label in the menus view must not truncate at 390px
   - at 390px the sidebar must not cramp the content (collapsed rail/drawer by default on mobile, as before)

Order: 1 ∥ 2 → 3–9 in parallel waves → 10.

11. **[wip] Release:** commits, merge into `main`, push, Cloudflare Pages deploy, cleanup, production check.

## Verification rules for subagents
- Work only in the worktree `/tmp/solidui-cms-nIf7/repo` (branch `feat/democms-admin`). If bun install/cache hits EROFS, point `TMPDIR`/`BUN_INSTALL_CACHE_DIR` to a writable `/tmp` dir.
- Typecheck: `bunx tsc --noEmit -p .` (`src/routeTree.gen.ts` must exist; start the dev server once if it is missing). Fix only errors in your own files and report others.
- Format: `bunx biome format --write <your changed files>`.
- Do **not** run `bun run test` / `bun run check` per task; only in task 10.
- UI: start your own dev server on a free port, verify your view via a `browser` subagent (desktop + one mobile width, DE + EN), then stop the server.
- Do not commit. The main agent handles commits.

## Current context
- Worktree: `/tmp/solidui-cms-nIf7/repo`, branch `feat/democms-admin` from `main@93c619e`.
- Shell contract: `cms/shell/` has `cmsViewRegistry` (key → { group, icon, label {de,en}, component, layout }), and views get an optional `id` prop. Navigate with `cmsNavigate(view, id?)` and read the locale with `cmsLocale.get()`; Intl helpers are in `cms/i18n/`. Each view key has a placeholder in `cms/views/<area>/`: replace your own placeholder(s) and keep the export name/signature. Extra primitives: `cms/ui/{PageHeader,Breadcrumbs,Dropdown,Drawer,ConfirmDialog}.tsx`.
- Parallel wave: tasks 3–9 run at the same time in one worktree. Touch only your own `cms/views/<area>/` folders (put mock data inside them too). Shared files (`cms/ui/*`, `cms/shell/*`, `DemoCMS.tsx`, settings files) are off limits unless your task says so. If a shared primitive has a bug, report it instead of editing it (small additive props are ok if unavoidable, and must be reported). Ignore tsc errors in other tasks' folders.
- Integration state: all views are implemented. Fixes done: mobile sidebar collapse, settings entry, EN shell texts, opaque content background (the shapes come from `DemoShapesBackdrop`), ConfirmDialog action labels, STRICT_READ_UNTRACKED in the data table. Final QA runs in 4 small parallel browser batches.
- Primitive APIs (`cms/ui/`): CmsDataTable(rows, columns, rowId, bulkActions?, labels?, storageKey?, csvFilename?, pageSize?); CmsKanban(columns, items, itemId, itemColumn, renderItem, onMove, labels?) controlled; CmsCalendar(events, eventDate, renderEvent, initialDate?, locale?, labels?); CmsTree(items, itemId, itemChildren, renderItem, onMove, labels?) controlled; CmsRichText(value, onChange, labels?) outputs HTML; CmsMiniChart(values, type?, label?, class?). Read the source for exact types.
- Main files: `src/demos/modules/DemoCMS.tsx` (718 lines, signals `active`, `settingsOpen`, `settingsPage`), `src/demos/modules/cms/*`.
