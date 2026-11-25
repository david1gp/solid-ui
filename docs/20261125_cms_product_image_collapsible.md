# CMS product edit: collapsible "Produktbild" preview column

## Goal
On the DemoCMS product edit page (`?view=content-types&id=article:<product-id>`), the left grid column "Produktbild" (tile preview + media buttons) can optionally be collapsed to the left (toward the CMS sidebar), so the "Produktdetails"/"FAQ" column gets the full width. Expanded is the default.

## Context
- File: `src/demos/modules/cms/views/content-types/products/CmsProductEdit.tsx`
  - Layout wrapper (~line 28): `<div class="grid items-start gap-6 lg:grid-cols-2">`
  - First child: `<section>` with `<h2>Produktbild</h2>` (~lines 29–94), second child: `<div class="space-y-6">` (details + FAQ).
- State: `cmsProductEditStateCreate.ts` (FAQ open state already lives there, local signal, not persisted).
- Existing patterns to mirror:
  - Sidebar collapse `src/demos/modules/cms/CmsSidebar.tsx:87–118` (`mdiChevronLeft`, rotates when closed, `w-56`↔`w-12` rail, aria-label/title "Sidebar schließen/öffnen" via `ttt`).
  - FAQ disclosure `CmsProductEdit.tsx:184–202` (`aria-expanded`, `aria-controls`, `inert`, transitions).
- Product editor strings are inline German JSX; keep that style.

## Decisions
- Toggle button in the "Produktbild" section header (right side of the `h2` row), icon `mdiChevronLeft` (same `Icon` component as sidebar), `aria-expanded`, `aria-controls`, aria-label/title "Produktbild einklappen" / "Produktbild ausklappen".
- Desktop (`lg+`) collapsed: grid columns switch from `lg:grid-cols-2` to a narrow rail (e.g. `lg:grid-cols-[3rem_minmax(0,1fr)]`); the section renders as a slim vertical rail (same card styling) containing only the expand button (chevron rotated 180°) and a vertical "Produktbild" label (`[writing-mode:vertical-rl]` + rotate-180). Tile preview and media buttons are hidden (`inert`/not rendered) while collapsed. Smooth transition if trivial (`transition-[grid-template-columns]`), no layout jank.
- Mobile (< `lg`, single column): the same toggle collapses the section vertically to just its header row (chevron points down/up there is not required; reuse the same button, content hidden).
- State: new local signal `imageCollapsed` in `cmsProductEditStateCreate.ts`, default `false`, not persisted (consistent with FAQ state).
- No new libraries; use `@mdi/js` icons and existing `Icon` component already used in the file.
- Dark mode classes must match existing section styling.

## Tasks
1. Implement collapse state + UI in `CmsProductEdit.tsx` / `cmsProductEditStateCreate.ts`. Verify `bunx tsc --noEmit`, `bunx biome format` on changed files, browser check (expanded, collapsed, re-expanded, desktop 1280px and mobile 390px, light + dark, keyboard toggle). Status: done (branch `feat/cms-product-image-collapse`, commit cc1a5bf)
2. Merge to main, push, deploy (`bun run deploy`), live browser verification, cleanup worktree/branch. Status: done
