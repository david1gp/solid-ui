# CMS products: drag & drop reordering (list + tiles)

## Goal
In the CMS demo (`/modules/DemoCMS`, Content Types → Article), products in the **list** view
(`CmsProductList.tsx`) and the **tiles** view (`CmsProductTiles.tsx`) can be reordered via drag & drop,
with a visible drag-handle (grip) icon. The `#position` shown updates accordingly.

Files (all under `src/demos/modules/cms/views/content-types/products/` unless noted):
- `cmsProducts.ts` (static data, has `position`), `cmsProductsSorted.ts`
- `CmsProductList.tsx`, `CmsProductTiles.tsx`
- parent: `../CmsContentTypesView.tsx`, state: `../cmsContentTypesStateCreate.ts`

## Decisions
- **No new dependency.** Use native HTML5 drag & drop (like `src/demos/modules/cms/ui/CmsKanban.tsx`) plus pointer/keyboard fallbacks where cheap.
- **Shared order state**: product positions live in the upstream `cmsProducts` signal. List and tiles share the in-memory order across tab switches.
- **Reorder semantics ("tauschen")**: during a drag, a local preview order and CSS ordering keep DOM nodes stable while showing live changes. Dropping on an item or container commits positions; dragend without a drop reverts the preview. Keyboard moves commit positions immediately. Positions are renumbered 1..n (`#N` reflects visual order).
- Pure logic in separate, unit-tested functions (one export per file, project code style): e.g. `cmsProductsMove(ids, fromIndex, toIndex)` and `cmsProductsSwap(ids, a, b)` returning new arrays.
- **Drag handle**: grip icon from `@adaptive-ds/mdi` (e.g. `mdiDragVertical` / `mdiDrag`), rendered inline-svg like other icons. Handle is a `<button>` with German aria-label `Verschieben: <name>`, cursor `grab`/`grabbing`. In the list: left of the thumbnail. In tiles: top-left overlay corner on the card.
- **Keyboard a11y**: focused handle + `ArrowUp/ArrowDown` (list) and `ArrowLeft/Right/Up/Down` (tiles, Up/Down may just be ±1) moves the item by one; an `aria-live="polite"` region announces e.g. "Studio One auf Position 2 verschoben".
- **Visual feedback**: dragged item reduced opacity; drop target highlighted with `--dashboard-accent` ring/outline; light + dark mode consistent with existing Tailwind classes.
- Existing behaviour (Bearbeiten button, Top badge, tabs, fields tab) must not break.

## Verification
- Unit tests only for new pure functions: `bun test --isolate --conditions=browser --conditions=development <specific test file>` (do not run full suite until final step).
- `bunx tsc --noEmit -p .` and `bunx biome format` on changed files.
- UI checked by a browser subagent on the local dev server.

## Current context
- Order state: product positions in the upstream `cmsProducts` signal, with a local drag preview.
- Pure fns: `cmsProductsMove(items, from, to)`, `cmsProductsSwap(items, a, b)`; tests in `test/cmsProductsReorder.test.ts`.
- Bun in worktree needs writable `BUN_TMPDIR` and `BUN_INSTALL_CACHE_DIR`.
- Drag/keyboard logic: `products/cmsProductReorderStateCreate.ts`; edit dialog position via `cmsProductEditStateCreate.ts`.
- Demo URL: `/modules/DemoCMS` → Inhaltstypen → Artikel → Liste/Kacheln (tiles: `?view=content-types&id=article:tiles`).
- `src/routeTree.gen.ts` is generated (gitignored) (dev server / router plugin) and needed for `tsc`.

## Tasks
1. [x] Order state + pure move/swap functions + unit tests; list & tiles render from shared order with renumbered positions.
2. [x] Drag handle icon + native DnD + keyboard reorder + live region in list and tiles views.
3. [x] Browser verification (list, tiles, cross-view consistency, keyboard, dark mode).
4. [x] Final checks, commits, merge into main, cleanup.
