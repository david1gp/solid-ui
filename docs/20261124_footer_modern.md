# Footer-Modern — viewport-filling immersive footer template

## Goal

New demo page **"Footer-Modern"** in category **Modules → Navigation UI** (next to "Footer-Simple").
A modern, viewport-filling closing section inspired by a reference design:

- Full-viewport scene (`min-h-svh`) whose "background image" is drawn **purely with CSS and simple shapes** (no image files, no video, no canvas/WebGL).
  Reference scene: dusky blue-grey sky with a subtle gradient, a large planet/moon disc rising behind a horizon (radial gradient + soft terminator shadow, faint surface texture via layered radial gradients), soft rolling cloud banks (blurred ellipses / layered rounded shapes in off-white), a green-grey grassy hill foreground, and a tiny standing figure silhouette (a few rounded divs) as a focal point. Calm, cinematic, muted palette.
- Centered big headline, e.g. **"Wöchentliche News. Ohne Schnickschnack."** (large, light/medium weight, tight tracking, white with soft text-shadow).
- Below the headline a **pill-shaped newsletter input with embedded button** (glass: translucent + backdrop-blur, rounded-full, button inside on the right, label "Abonnieren"). Reuse validation/state from `footerSimpleNewsletterStateCreate.ts` if its API fits; otherwise create a small own state helper in the new module.
- Bottom: a **glass panel** (rounded-2xl, translucent dark tint, `backdrop-blur`, subtle border + inset top highlight) floating over the scene's lower part, containing:
  - brand (logo mark + "Astria"-like brand name, demo uses German copy) + short description (left)
  - 3 link columns (e.g. "Entdecken", "Über das Projekt", "Support") (right)
  - divider, then bottom row: credit/copyright left, "Folge uns:" + social icons right.

## Decisions

- Demo-module only (like Footer-Simple), lives in `src/demos/modules/footerModern/` + `src/demos/modules/DemoFooterModern.tsx`. Not exported under `ui/`.
- No video background. No raster images. Scene = CSS only (Tailwind classes and/or a co-located `.css` file like `FooterSimpleBackdrop.css`). All decorative elements `aria-hidden="true"`.
- Copy in German (consistent with Footer-Simple demo).
- Reuse data types / pieces from `src/demos/modules/footerSimple/` where it fits (e.g. `FooterSimpleColumn`, `FooterSimpleLink`, `FooterSimpleSocialLink` types, `footerSimpleDemoSocialLinks`) — import, don't copy. New visuals get their own files.
- The scene looks the same in light and dark mode (it is an illustration); the glass panel text must stay readable (contrast ≥ WCAG AA for links: use white/70+ on the dark tint, not white/40).
- Responsive: on mobile, headline scales down (clamp), input stacks fine, glass panel columns stack (brand on top, columns in 2-col grid), scene still fills at least the viewport; nothing overflows horizontally.
- `prefers-reduced-motion`: any optional subtle animation (e.g. slow cloud drift) must be disabled. Animation is optional; keep it subtle if added.
- Layout of the page: like DemoFooterSimple — a short placeholder `<main>` with h1 "Footer-Modern" and placeholder text, then the immersive footer section (so it is clearly a footer at the end of a page).

## Code style

- One export per file, subject-first names (`FooterModern`, `FooterModernScene`, `FooterModernNewsletterPill`, `FooterModernGlassPanel`, `footerModernGlassSurfaceClass`, `footerModernDemoColumns`…).
- Tailwind utility strings, `classArr` from `#ui/utils/classArr.js` for longer class lists; import paths use `#src/...jsx|js` style like existing code.
- Use only existing dependencies from package.json; do not add packages.

## Registration (all required)

- `src/app/demos/demoList.ts`: lazy import `DemoFooterModern` + map `"Footer-Modern"` in the modules catalog (analogous to Footer-Simple, lines ~73–76 and ~291). Check whether `generateDemoList.cli.ts` generates this file; if so, keep the generated output consistent (run `bun run generateDemoList` or edit matching its output).
- `src/app/demos/demoSubcategories.ts`: add `"Footer-Modern"` after `"Footer-Simple"` in `"Navigation UI"`.
- `src/app/demos/DemoViews.tsx`: add `"Footer-Modern"` to `fullscreenDemos`.
- `src/lib/prerenderPages.ts`: map `"modules/DemoFooterModern"` → `"Footer-Modern"`.
- Tests: update `test/demoGroupsCreate.test.ts` and `test/prerenderPages.test.ts` analogously.

## Verification

- Typecheck: `tsc --noEmit -p .` ; format: `bunx biome format --write src ui test` (only changed files ok).
- Tests: only `bun test --isolate --conditions=browser --conditions=development ./test/demoGroupsCreate.test.ts ./test/prerenderPages.test.ts` during implementation; full `bun run test` once at the end.
- Visual: browser subagent on `bun dev` (free port), route `/modules/Footer-Modern`, desktop 1440×900 and mobile 390×844, light + dark; check Footer-Simple still renders.

## Tasks

1. Implement module + registration + tests (worktree branch `feat/footer-modern`). — done
2. Visual verification via browser subagent; fix findings. — done
3. Commits (conventional), merge into main, push, cleanup worktree/branch. — done
