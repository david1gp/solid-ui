# DemoCMS Auth views using the Register-Simple module design

## Goal
The DemoCMS "Auth" views (`/modules/DemoCMS?view=auth-*`) should preview the existing
**Register-Simple** module template design (`src/demos/modules/DemoRegisterLogin.tsx` +
`DemoRegisterLogin.css`) instead of the current generic CMS card design
(`cms/views/auth-login/CmsAuthTemplate.tsx` inside `cms/shell/CmsAuthLayout.tsx`).

## Decisions
- Source design = Register-Simple (`DemoRegisterLogin`), as requested ("simple" templates). Register-Modern (`DemoRegisterCi`) stays untouched.
- Views with a direct template counterpart use that design 1:1 (layout, header w/ logo, fields, social buttons, links, footer):
  - `auth-login` -> Register-Simple login mode
  - `auth-register` -> Register-Simple register mode
  - `auth-forgot` -> Register-Simple password-reset flow (as a standalone screen)
- Views without counterpart get new screens built in the same Register-Simple visual language (same CSS classes / tokens, same header/footer/card): `auth-reset` (new password), `auth-2fa` (6-digit code), `auth-verify-email`, `auth-invite`, `auth-session-expired`.
- The standalone `DemoRegisterLogin` module page must look and behave exactly as before (no regressions). Reuse via extraction of shared pieces (e.g. shell/header/footer, CSS) rather than copy-paste where reasonable; do not add new libraries.
- Navigation between auth screens keeps using `cmsNavigate` (query `view`), e.g. login -> forgot/register, forgot -> login, verify/session-expired -> login. A way back to the CMS admin (dashboard) must remain available.
- Locale: CMS auth screens follow `cmsLocale` (DE/EN) — the template's own locale toggle may switch `cmsLocale` instead of local state when used inside CMS.
- Demo only: no real authentication; submit = validate + navigate/feedback like today.
- The auth view registry entries/keys in `cms/shell/cmsViewRegistry.ts` stay the same (URLs unchanged). If Register-Simple is a full-page design, auth views may bypass/replace `CmsAuthLayout` so there is no double wrapper.

## Approach
1. Make Register-Simple reusable: factor its page shell (header/logo/locale toggle, main card area, footer) and form pieces into exported components with props (mode, locale source, navigation callbacks), keeping `DemoRegisterLogin` as a thin composition with identical output.
2. Re-implement CMS auth views on top of those pieces; add the extra screens in the same style.
3. Remove `CmsAuthTemplate`/`CmsAuthLayout` only if they become unused.

## Verification
- `bunx tsc --noEmit` (baseline already has 4 pre-existing errors — do not add new ones), `bunx biome check` on changed files, `bun run test` once at the end.
- Browser check of all 8 `?view=auth-*` views (light/dark, DE/EN, mobile) and of the standalone Register-Simple module page for regressions.

## Tasks
1. [x] Extract reusable Register-Simple pieces; keep `DemoRegisterLogin` unchanged visually.
2. [x] CMS auth views login/register/forgot use the Register-Simple design.
3. [x] CMS auth views reset/2fa/verify-email/invite/session-expired in Register-Simple style.
4. [x] Browser verification + fixes.
5. [ ] Commits, merge to main, cleanup, deploy/preview check.

## Context
- Worktree: `/tmp/solid-ui-wt-h2Npkq`, branch `feat/cms-auth-simple-templates`, base `7895770`.
- Reusable pieces: `src/demos/modules/registerLogin/` (`RegisterLoginShell`, `RegisterLoginHeading`, `RegisterLoginField`, `RegisterLoginPasswordInput`, `RegisterLoginSubmit`, `RegisterLoginSocial`, `RegisterLoginSwitch`, `RegisterLoginResetDialog`, `RegisterLoginDemoForm`).
