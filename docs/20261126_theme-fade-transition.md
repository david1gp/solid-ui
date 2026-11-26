# Theme fade transition

Worktree: `/tmp/solid-ui-theme-fade-WrtL/repo` (branch `feat/theme-fade-transition`)

## Goal

Switching Light / Dark / System should cross-fade (~300ms) instead of switching instantly.

## Decisions (from user)

- Simple cross-fade (no circular reveal).
- Duration ~300ms.
- Applies to ALL explicit theme changes (AppSettingsPanel tiles, ThemeButton incl. Alt+S rotate, ThemeSwitch, demo floating button) AND to OS `prefers-color-scheme` changes while theme is `os`.
- NOT configurable / no opt-out option.
- No fade for: initial load (`themeInit`, no-flash script in `src/routes/__root.tsx`), cross-tab `storage` sync.
- Instant fallback when `document.startViewTransition` is unavailable, or `prefers-reduced-motion: reduce` matches, or SSR (no `document`).

## Approach

- Use the View Transitions API: `document.startViewTransition(update)`.
- New helper `ui/interactive/theme/themeTransitionRun.ts` (one export per file, see code-style skill): `themeTransitionRun(update: () => void): void` — runs `update` inside a view transition or directly as fallback.
- `update` must contain BOTH the signal set (`themeSignal.set`) and the DOM apply (`setThemeToBrowser`) so the "old" snapshot is taken before any reactive UI change.
- Use it in `themeSet` (`ui/interactive/theme/themeSignal.ts`) and in the OS media-query change listener. localStorage write can stay outside.
- 300ms duration must work for library consumers without requiring them to add CSS. Check how the library ships CSS (is `src/tailwind.css` demo-only?). Preferred: set duration in JS (e.g. on `transition.ready`, `document.documentElement.animate(..., { duration: 300, pseudoElement: "::view-transition-old(root)" / "new(root)" })`) or ensure equivalent CSS is shipped with the lib. Keep it minimal; document the choice.
- Rapid repeated clicks: browser skips the previous transition; must not throw (catch rejected `ready`/`finished` promises).
- No new dependencies.
- Known limitation (accepted): during the 300ms fade Chromium hit-tests the view-transition overlay (`<html>`), so mouse clicks within that window are not delivered to controls; `::view-transition { pointer-events: none }` does not change this. Keyboard (Alt+S) is unaffected. Not worked around (would require a different, lower-quality technique).

## Tasks

1. Implement helper + wire into `themeSet` and OS listener; typecheck; small unit test for fallback paths if test setup permits (run only that test file). — status: done (helper injects temporary 300ms linear CSS override for root view-transition pseudo-elements, removed on `finished`)
2. Browser verification in demo app (fade visible, all toggles work, aria-pressed correct, reduced-motion instant, no console errors). — status: done
3. Full `bun run check`, commits, merge to main, cleanup. — status: todo
