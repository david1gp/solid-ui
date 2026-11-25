# CMS Inhaltstypen "Artikel" – product tiles view + product edit page

## Goal

On `/modules/DemoCMS?view=content-types&id=article` (content type editor "Artikel / Article", file `src/demos/modules/cms/views/content-types/CmsContentTypesView.tsx`) offer, besides the existing list ("Felder" list), a **Kacheln** (tiles) view showing demo articles as **product tiles** (headphones), styled after the user's reference screenshot. Each tile has a **"Bearbeiten"** button that navigates to a product edit subpage where price, image, quantity, description and an optional FAQ can be edited. Demo only: nothing is persisted.

Reference screenshot (`/home/tim/.t3code-tim/userdata/attachments/ac98a220-1bb6-4d49-b0a4-b5086293fa42-448a1f1b-e064-4cd6-9390-6fa129a6cad8.png`): tall rounded card, product image fills the card on a dark tinted gradient background, product title bottom-left in white, price below it (accent/green), bottom-right a translucent pill button with icon ("Buy Now" → here "Bearbeiten").

## Decisions

- Only the `article` content type gets the Liste/Kacheln switch. Other types (`event`) unchanged.
- Switcher: dashboard-style underline tabs "Liste" / "Kacheln" (same pattern as posts view tabs in `views/posts/CmsPostsView.tsx`), placed under the page header. "Liste" = the current Felder editor, **unchanged**. Default tab: Liste. Tab state may be local (no URL param needed).
- Product images are **pure CSS/SVG illustrations of headphones** (no image files, no external URLs), one reusable component with props for colorway (e.g. band/cup/cushion colors) and background tint, so every product looks distinct (e.g. midnight black, sand, sky blue, forest green, coral, silver). Inline SVG with gradients is allowed (counts as "CSS illustration"); keep it in its own component file.
- Demo data: ~8 headphone products, German content, prices in € formatted with `Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" })`. Fields: `id`, `title` (full), `shortTitle` (optional; tile shows shortTitle ?? title, truncated with ellipsis), `price`, `quantity` (Menge), `description`, `faq: {question, answer}[]` (some empty), `colorway`.
- Tile layout: responsive grid (`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`), card `rounded-2xl overflow-hidden`, aspect ~3/4, illustration centered on per-product dark gradient background, bottom gradient overlay for text contrast, title white `font-semibold`, price under title bottom-left (light accent, e.g. emerald-300 or accent tint), "Bearbeiten" pill bottom-right (`rounded-full border border-white/25 bg-white/10 backdrop-blur text-white text-sm` + pencil icon, hover `bg-white/20`, accent focus-visible outline). Same tile look in light and dark mode (it's image-based); in light mode add a subtle shadow, in dark mode a `border-neutral-800` edge. Keyboard accessible.
- Edit subpage routing: use the existing CMS navigation (`src/demos/modules/cms/shell/cmsNavigate.ts`, `cmsNavigationSync.ts`), `view=content-types` with an `id` that encodes type + product, e.g. `id=article:product-1` (verify parsing in CmsContentTypesView; follow posts' `${id}:edit` precedent). Breadcrumb/back link "← Artikel / Article" returns to the article page with the Kacheln tab active (pass via id or local state; acceptable if it returns to Liste – but prefer Kacheln).
- Edit page (dashboard card style using `src/demos/modules/cms/ui/` constants `cmsCardClass`, `cmsInputClass`, `cmsButtonClass`, `cmsPrimaryButtonClass`, `cmsPillClass`, `cmsIconCircleClass`): PageHeader with product title; left: image card (large illustration preview, buttons "Aus Mediathek wählen" and "Neues Bild hochladen" – placeholders, non-functional: no-op or show a small "Demo – nicht verfügbar" hint); right/below: fields Preis (€ number input), Menge (number input), Beschreibung (textarea); FAQ section card: list of question/answer input pairs, button "+ Frage hinzufügen" appends an empty pair, each pair removable; footer "Speichern" (primary) and "Abbrechen" (secondary). Edits live in local component state only; "Speichern" shows a brief demo notice and/or navigates back; reload resets everything. Nothing written to stores/localStorage.
- All UI text German. Use only existing deps. Code style: one export per file, small files in `src/demos/modules/cms/views/content-types/` (e.g. `products/` subfolder).

- Shop position (added later): product data gets `position` (1..n, defines Kacheln order) and `featured` (boolean, a few true). Kacheln sorted by `position`; featured tiles show a small "Top" badge top-left (translucent pill, same style family as the Bearbeiten pill). Edit page "Produktdetails" card gets a select "Position im Shop" (options "1 von N" … "N von N") with hint "Bestimmt die Reihenfolge in der Produktübersicht." and a toggle/checkbox "Hervorgehoben (Top-Produkt)"; the image preview shows live a "#<pos>" pill and the "Top" badge. Local state only, nothing persisted, Kacheln order not changed by edits. No drag & drop.

- Field settings panel removed (acc16fb).
- Tabs on the article page become **Liste | Kacheln | Felder**. "Liste" shows the same products as Kacheln (same order by `position`) as rows inside a `cmsCardClass` card: small headphone illustration thumbnail (rounded, own gradient bg), title (shortTitle) + muted full title/description line, price (formatted), Menge, "#position", "Top" pill if featured, "Bearbeiten" button → same editor route. Responsive (on mobile stack meta under title). "Felder" tab holds the former field list card unchanged. Back/Abbrechen from the editor returns to the tab it came from if easily possible (`article:tiles`, `article:list` default, `article:fields`), otherwise Kacheln. Event type keeps only its field editor (no tabs).

## Tasks

1. **Tiles**: product data, headphone illustration component, price formatter, Liste/Kacheln tabs on article page, tile grid with "Bearbeiten" navigating to the edit route (route may render a temporary placeholder until task 2).
2. **Edit page**: product edit subpage per decisions above, back navigation, unknown product id → fallback to article page.
3. **Verify + deploy**.

## Status

- Task 1: done (9afb593, 014e66e). Files in `src/demos/modules/cms/views/content-types/products/`. Route `id=article:<productId>` currently renders a placeholder; back returns to Liste.
- Task 2: done (8b89fc6, dc91268, bcf53ff, 2daa5c4). Routes: `id=article:<productId>` editor, `id=article:tiles` Kacheln tab.
- Task 3: done (016ad55, deployed 382d092)
- Task 4 (shop position + featured): done (a943c91)
- Task 5 (product Liste + Felder tab): in progress
