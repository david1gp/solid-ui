import { Match, Switch } from "solid-js"

/** Brand mark for a social sign-in provider. */
export function RegisterCiSocialIcon(p: { provider: "Google" | "Apple" | "Microsoft" }) {
  return (
    <Switch>
      <Match when={p.provider === "Google"}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M21.6 12.23c0-.74-.07-1.46-.19-2.15H12v4.07h5.38a4.6 4.6 0 0 1-2 3.02v2.64h3.24c1.9-1.75 2.98-4.33 2.98-7.58Z"
          />
          <path
            fill="#34A853"
            d="M12 22c2.7 0 4.97-.9 6.62-2.43l-3.24-2.64c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.13H3.07v2.72A10 10 0 0 0 12 22Z"
          />
          <path
            fill="#FBBC05"
            d="M6.41 13.76A6.02 6.02 0 0 1 6.1 12c0-.61.1-1.2.31-1.76V7.52H3.07A10 10 0 0 0 2 12c0 1.61.39 3.14 1.07 4.48l3.34-2.72Z"
          />
          <path
            fill="#EA4335"
            d="M12 6.11c1.47 0 2.79.5 3.82 1.5l2.87-2.87A9.62 9.62 0 0 0 12 2a10 10 0 0 0-8.93 5.52l3.34 2.72C7.2 7.87 9.4 6.11 12 6.11Z"
          />
        </svg>
      </Match>
      <Match when={p.provider === "Apple"}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.05 12.54c.02-2.12 1.74-3.14 1.82-3.19a3.9 3.9 0 0 0-3.08-1.67c-1.29-.13-2.54.77-3.2.77-.68 0-1.7-.76-2.8-.74a4.1 4.1 0 0 0-3.44 2.1c-1.49 2.58-.38 6.37 1.05 8.45.72 1.02 1.55 2.16 2.65 2.12 1.08-.04 1.48-.68 2.78-.68 1.29 0 1.67.68 2.79.65 1.15-.02 1.88-1.02 2.57-2.05a8.5 8.5 0 0 0 1.18-2.4 3.69 3.69 0 0 1-2.32-3.36ZM14.95 6.31a3.75 3.75 0 0 0 .86-2.69 3.81 3.81 0 0 0-2.48 1.28 3.56 3.56 0 0 0-.88 2.59 3.17 3.17 0 0 0 2.5-1.18Z" />
        </svg>
      </Match>
      <Match when={p.provider === "Microsoft"}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#f35325" d="M2 2h9.45v9.45H2z" />
          <path fill="#81bc06" d="M12.55 2H22v9.45h-9.45z" />
          <path fill="#05a6f0" d="M2 12.55h9.45V22H2z" />
          <path fill="#ffba08" d="M12.55 12.55H22V22h-9.45z" />
        </svg>
      </Match>
    </Switch>
  )
}
