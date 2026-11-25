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
- Desktop (`lg+`) collapsed: the column shrinks to a narrow rail (~3rem); the section renders as a slim vertical rail (same card styling) containing only the expand button (chevron rotated 180°) and a vertical "Produktbild" label (`[writing-mode:vertical-rl]` + rotate-180). Tile preview and media buttons are visually hidden and `inert`/`aria-hidden` while collapsed.
- Desktop collapsed rail keeps the SAME HEIGHT as the expanded section (tile + buttons) — it must not shrink vertically. Preferred approach: keep the content mounted (clipped via overflow-hidden, faded out, inert) so the height is preserved naturally; alternatively measure/lock height. Height must stay correct across viewport resizes.
- Animation: collapse/expand uses the SAME animation as the CMS sidebar (`CmsSidebar.tsx`): same transitioned property type (width), same duration and easing classes, same chevron rotation transition. The details column grows/shrinks smoothly in sync (no jumps). Respect `motion-reduce` if the sidebar does.
- Mobile (< `lg`): collapses vertically to the header row (unchanged behaviour); animate smoothly with the same duration/easing if trivial.
- Mobile (< `lg`, single column): the same toggle collapses the section vertically to just its header row (chevron points down/up there is not required; reuse the same button, content hidden).
- State: new local signal `imageCollapsed` in `cmsProductEditStateCreate.ts`, default `false`, not persisted (consistent with FAQ state).
- No new libraries; use `@mdi/js` icons and existing `Icon` component already used in the file.
- Dark mode classes must match existing section styling.

## Tasks
1. Implement collapse state + UI in `CmsProductEdit.tsx` / `cmsProductEditStateCreate.ts`. Verify `bunx tsc --noEmit`, `bunx biome format` on changed files, browser check (expanded, collapsed, re-expanded, desktop 1280px and mobile 390px, light + dark, keyboard toggle). Status: done (branch `feat/cms-product-image-collapse`, commit cc1a5bf)
2. Merge to main, push, deploy (`bun run deploy`), live browser verification, cleanup worktree/branch. Status: done (main `104af1b`)
3. Follow-up: collapsed rail keeps expanded height + sidebar-identical collapse/expand animation (see Decisions). Status: done (main `e62e8af`)
5. Apply the identical collapsible behaviour (same rail, same height preservation, same sidebar animation, same a11y) to the "Vorschau" column of the other content-type editors (e.g. event editor with "Hörtest-Abend" tile, and any other editor using the same preview-column + `lg:grid-cols-2` layout). Prefer extracting a shared component/helper from the product implementation instead of duplicating. Labels use the section title ("Vorschau einklappen" / "Vorschau ausklappen"). The product editor's section title "Produktbild" is renamed to "Vorschau" as well (heading, rail label, aria labels). Status: done (main `c408b3c`)
4. Merge, push, deploy, live verify, cleanup for task 3. Status: done (main `e62e8af`; deployed and live verified)
