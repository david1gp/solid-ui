# DemoCMS: Team, Rolle und Status von Benutzern bearbeiten

## Goal

On `/modules/DemoCMS?view=users&id=<id>` (user detail view) the user can edit **Rolle** and **Status** (Team is removed entirely) (Aktiv / Deaktiviert). "Deaktiviert" means the user can no longer access the CMS — in this demo this is **display only** (no auth enforcement).

## Decisions (agreed with user)

1. **Edit mode:** fields are editable inline in the detail view; a Save/Discard bar appears when the form is dirty (same pattern as the settings forms' `SaveBar` in `src/demos/modules/DemoCMS.tsx` ~L868-889).
2. **Status control:** same as other statuses in the CMS → **native `<select>`** styled with `cmsInputClass` (like the post editor status select in `src/demos/modules/cms/views/posts/CmsPostsView.tsx` ~L258-269). Options: `Aktiv`, `Deaktiviert`; if the user's saved status is `Eingeladen`, `Eingeladen` is also shown as an option (so it stays representable) — you can deactivate an invited user, but you cannot set `Eingeladen` manually on an Aktiv/Deaktiviert user.
3. **Deactivation effect:** display only. Red/danger status pill "Deaktiviert" in list and detail; in detail view a hint text "Kein Zugriff auf das CMS" when status is Deaktiviert. Saving a change to Deaktiviert asks for confirmation via existing `ConfirmDialog` (`src/demos/modules/cms/ui/ConfirmDialog.tsx`).
4. **Last-admin guard:** the last remaining *active* user with role `Administrator` can neither be deactivated, get another role, nor be removed (single/bulk removal rejected with toast). The corresponding select options are disabled and a short hint explains why. Guard logic lives in a pure function with a unit test.
5. **Teams removed:** remove Team completely from the CMS users area (list column, detail field, invite form select, `team` in mock data/state, other references to the user team field). Only Rolle + Status are editable.
6. **Persistence:** in-memory only (existing signal in `cmsUsersStateCreate.ts`); reset on reload. Never use localStorage. After save show a toast via `toastAdd` (`#ui/interactive/toast/toastAdd.js`) like the settings forms.
7. **List filter by status:** `CmsDataTable` already supports per-column `filterable` selects (status is filterable). Ensure "Deaktiviert" appears as filter option and works; no new filter UI unless that is broken.

## Approach

- Keep language consistent with the users view (German values: Aktiv, Eingeladen, Deaktiviert; labels as in existing view).
- Follow repo code style (`code-style` skill: one export per file, subject-first names, view-only `.tsx`, logic in `*StateCreate.ts`/pure functions).
- Move `SaveBar` out of `DemoCMS.tsx` into `src/demos/modules/cms/ui/CmsSaveBar.tsx` (exported), use it in DemoCMS settings forms (behavior unchanged) and in the user detail view.
- Add a danger pill class file next to `cmsPillClass.ts` / `cmsSuccessPillClass.ts` (e.g. `cmsDangerPillClass.ts`) using existing theme tokens.
- Add an explicit user status type (`"Aktiv" | "Eingeladen" | "Deaktiviert"`) and a user update function in the users state (`userUpdate(id, { role, team, status })`).
- Detail edit state (draft values, dirty, discard, save) in a state creator, not in the `.tsx`.
- Use only existing dependencies; no new packages.

## Verification

- Unit: `bun test --isolate --conditions=browser --conditions=development ./test/<file>.test.ts` for new tests only; full `bun run check` only at the end.
- UI: browser subagent against local `bun run dev` (free port).
- No e2e suite exists. Final validation: deploy preview `ops/deploy.bash --branch=<name>` / production after merge, then browser check on https://adaptive-solid-ui.pages.dev/modules/DemoCMS?view=users&id=1.

## Tasks

1. [x] Implement: remove Team, status type + danger pill, `userUpdate` + last-admin guard (pure fn + unit test), `CmsSaveBar` extraction, editable detail view with confirm on deactivation + toast, pills in list/detail. Run unit test + `bun run check`.
2. [x] Browser verification locally (edit/save/discard, deactivate confirm, last-admin guard, list pill + status filter, settings SaveBar still works).
3. [ ] Commit, merge to main, deploy, verify on pages.dev, cleanup worktree/branch.

## Context

- Worktree: `/tmp/solid-ui-cms-user-edit-3Pfm` (branch `feat/cms-user-edit`).
