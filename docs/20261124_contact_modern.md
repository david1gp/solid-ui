# Contact-modern page demo

## Goal

New demo page **"Contact-modern"** under navigation Modules → Seiten (Pages): a modern contact form based on a reference design (dark glass sign-up layout). The bridge photo background from the reference is **not** used.

## Reference design (translate to contact form)

- Two-column fullscreen layout on desktop (stacks on mobile, < md):
  - Left: large headline (e.g. "Fragen? Lass uns reden." / "Got Questions? Let's Talk.") + 2-line intro text, vertically centered, light font weight, white text.
  - Right: a frosted-glass panel (backdrop-blur, semi-transparent dark, full height of the right half in the reference; on our page a tall panel/right half) containing:
    - Heading "Kontakt" / "Contact" (large, light weight).
    - Underline-only inputs (no box, only bottom border 1px white/40%, placeholder as label, trailing icon at the right, muted): Name (account icon), E-Mail (email icon), Betreff/Subject (tag/subject icon), Nachricht/Message as auto-growing textarea (message icon).
    - Square outlined checkbox: "Ich stimme der **Datenschutzerklärung** zu" / "I agree to the **Privacy Policy**" (bold words).
    - Row: pill outlined button "Senden  >" / "Send  >" (rounded-full, 1px white border, hover fills subtly) + underlined text link "Lieber anrufen?" / "Prefer to call?" (tel: link).
- Background instead of photo: dark slate/night gradient (deep blue-grey, matching the photo mood) with a few soft blurred color blobs (subtle warm amber + cool blue light glows, reminiscent of city lights) — pure CSS, no image assets. Glass panel must visibly show blur over the blobs.
- Light theme: provide a sensible light variant (light grey-blue gradient, dark text, glass panel white/50%) via the app's dark/light mechanism (as other fullscreen demos do).

## Decisions

- Demo key: `ContactModern`, component `DemoContactModern` in `src/demos/modules/DemoContactModern.tsx`; helper files in `src/demos/modules/contactModern/` (CSS, texts, state). Display name override "Contact-modern" in `DemoViews.tsx`. Register in `fullscreenDemos` (floating home/theme controls like Contact-Simple). Lands in "Seiten" group automatically (unassigned key).
- Follow the existing Contact-Simple implementation (`src/demos/modules/DemoContact.tsx` + `src/demos/modules/contact/*`) for patterns: de/en text dictionary, state/validation module, FieldError, page-scoped CSS. Reuse its message limits / validation logic where sensible (import, don't duplicate), but keep the new visual design separate.
- Validation: name required, valid email, message required (min/max as Contact-Simple), privacy checkbox required. Errors shown under fields after submit/blur. On valid submit: show success state in the panel (no backend; simulate short loading like Contact-Simple does if it does).
- Icons: `@adaptive-ds/mdi` individual imports (existing dependency). No new dependencies.
- Accessibility: real `<label>` (visually hidden ok) per field, aria-invalid, focus-visible styles, button type submit.
- Code style: one export per file, named exports, `.tsx` view-only (logic in `.ts`).

## Tasks

1. Implement page + registration (DemoContactModern, contactModern/*, demoList.ts, DemoViews.tsx). Verify `bun run check` (tsc + biome + unit tests).
2. Visual verification in browser (desktop dark/light, mobile width, validation errors, success state), fix issues.
3. Commit, merge to main, cleanup worktree.

## Status

- Done
