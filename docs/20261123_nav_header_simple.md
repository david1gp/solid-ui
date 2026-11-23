# NavHeader-Simple module

## Goal

Reusable sticky top navigation in `ui/modules/nav_header/`, demonstrated at `/modules/DemoNavHeader` with German content and a long scrolling page.

## Component

- `logo` accepts a complete logo/link slot; optional `brand` and `onBrandClick` retain the separate clickable brand API.
- Navigation items support `href` links, active `aria-current="page"`, optional icons and click handlers. Active styling uses semantic muted/foreground tokens; `accentColor` optionally overrides the active text color.
- Header, popover and links use global semantic theme tokens. Below `lg`, navigation and actions collapse into a hamburger panel, closable by Escape or item selection.
- Logged out: optional theme toggle, ghost login and (when `onRegister` is supplied) primary register button. Labels are configurable via `loginLabel` and `registerLabel`.
- Logged in: avatar and optional user-menu popover; the header theme toggle is hidden, with theme selection available in the user menu.
- Reuses sidebar avatar and user menu, button variants, popover and theme components.

## Demo

- Uses the global `LogoImageText` logo. The logo returns to the intro view with no active item.
- Navigation: Produkte, Preise, Blog, Kontakt, rendered as links.
- Demo login/register and logout switch the account state. The user menu provides Hell, Dunkel and System appearance choices.

## Verification

Run `bun run check` and `bun run build`. Generate the route tree via the dev server if needed. Verify desktop and mobile, light and dark appearance, menu interactions, sticky scrolling and existing module demos.
