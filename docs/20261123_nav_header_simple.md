# NavHeader-Simple module

## Goal

New catalog subpage under **modules** titled **NavHeader-Simple**: a reusable, sticky top navigation header for SolidJS apps, plus a fullscreen demo page.

Worktree: `/tmp/solid-ui-navheader-Brka` (branch `feat/nav-header-simple`). All work happens there, never in `/adaptive/solid-ui`.

## Decisions

- Reusable component lives in `ui/modules/nav_header/`; demo in `src/demos/modules/DemoNavHeader.tsx`.
- Reuse existing module pieces from `ui/modules/app_sidebar/` instead of re-implementing:
  - `AppSidebarAvatar` (avatar button content)
  - `AppSidebarUserMenu` (popover body of the user menu, with sections + logout)
  - `AppSidebarCssAvatar` (demo avatar)
  - `AppSidebarNavItem` type shape as reference (header gets its own small `NavHeaderNavItem` type: `id?`, `label`, `icon?`, `href?`, `isActive?`, `onClick?`)
  - `appSidebarNavButtonClass` / `AppSidebarAccentBar` as styling reference for the active state (accent color prop)
- Primitives: `Icon` from `#ui/static/icon/Icon.jsx` with `@adaptive-ds/mdi/<name>.js` paths, `buttonVariant` from `ui/interactive/button/buttonCva.ts`, popover via `@corvu-next/popover` the same way `AppSidebar` opens its user menu, `ThemeButton` from `ui/interactive/theme/ThemeButton.tsx`, `classArr` for classes, `createSignalObject` for state. No new dependencies.
- Code style: PascalCase component files, camelCase helpers/types, one primary export per file, `#ui/...` imports with `.jsx`/`.js` extensions, Tailwind utility classes, light + dark mode.
- Demo registration mirrors `DemoAppSidebar`: lazy import + `modules` entry in `src/app/demos/demoList.ts`; in `src/app/demos/DemoViews.tsx` add `DemoNavHeader` to `fullscreenDemos` and `demoDisplayNames` (`DemoNavHeader: "NavHeader-Simple"`).
- Demo texts in German (like other module demos).

## Component spec (`NavHeader`)

Props (`NavHeaderProps extends MayHaveClass`):
- `logo: JSXElement`, `brand: JSXElement` (left, clickable via optional `onBrandClick`)
- `items: NavHeaderNavItem[]` (desktop: inline links; active item highlighted with `accentColor`)
- `accentColor?: string`
- `showThemeToggle?: boolean` (default true, renders `ThemeButton`)
- Logged-out: `loginLabel?: string`, `onLogin?: () => void` → login button
- Logged-in: `userName?`, `userInitials?`, `userImageUrl?`, `userAvatar?`, `userMenu?: JSXElement` → avatar button opening popover with `userMenu` content
- `actions?: JSXElement` optional extra right-side slot

Behavior:
- `sticky top-0 z-…` with backdrop blur and bottom border; full width, inner content max-width container.
- Below `md`: nav links + actions collapse into a hamburger button (`aria-expanded`, `aria-controls`) that opens a panel below the header with the nav items (vertical) and login/user section; panel closes on item click and on Escape.
- Keyboard accessible, `nav` landmark with `aria-label`, active link `aria-current="page"`.

Files (suggested): `NavHeader.tsx`, `NavHeaderNavItem.ts`, `NavHeaderMobilePanel.tsx`, `navHeaderLinkClass.ts` (only if helpful).

## Demo spec (`DemoNavHeader`)

- Brand "Atlas." style like the sidebar demo, nav items e.g. Start, Produkte, Preise, Blog, Kontakt; clicking sets active item.
- Toggle in the demo to switch logged-in / logged-out state (logged-in uses `AppSidebarUserMenu` with name Max Mustermann, theme section via `themeSet(theme, true)`, logout → logged-out).
- Placeholder content below (hero + several sections) long enough to show sticky scrolling; content reflects active item title.

## Tasks

1. Implement `ui/modules/nav_header/*` component — status: done (`NavHeader.tsx`, `NavHeaderNavItem.ts`, `navHeaderStateCreate.ts`)
2. Implement `DemoNavHeader` + registration in `demoList.ts` / `DemoViews.tsx` — status: done (category list now uses display names)
3. Verify: `bun run check` passes (generate `src/routeTree.gen` first, e.g. via `bun run build` or a short dev-server start, if missing); browser check desktop + mobile, light + dark, existing module demos still work — status: done
4. Commit (conventional commits), merge into `main`, push, clean up worktree/branch — status: done

## Verification notes

- Dev server port 3031 (`strictPort`) — if occupied, start with another free port.
- No e2e tests in repo; unit tests via `bun test` only. Do not run unrelated heavy tasks repeatedly.
- `src/routeTree.gen.*` is generated; baseline `check` fails without it.
