import { createUniqueId } from "solid-js"

export function CmsHeadphonesIllustration(props: {
  colorway: { background: string; band: string; cup: string; cushion: string }
}) {
  const id = createUniqueId()
  return (
    <svg viewBox="0 0 320 370" class="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-bg`} cx="50%" cy="30%" r="80%">
          <stop stop-color={props.colorway.band} stop-opacity=".48" />
          <stop offset="1" stop-color={props.colorway.background} />
        </radialGradient>
        <linearGradient id={`${id}-band`} x1="0" y1="0" x2="1" y2="1">
          <stop stop-color={props.colorway.cup} />
          <stop offset=".45" stop-color={props.colorway.band} />
          <stop offset="1" stop-color={props.colorway.cushion} />
        </linearGradient>
        <linearGradient id={`${id}-cup`} x1="0" y1="0" x2="1" y2="1">
          <stop stop-color={props.colorway.cup} />
          <stop offset=".6" stop-color={props.colorway.band} />
          <stop offset="1" stop-color={props.colorway.cushion} />
        </linearGradient>
        <filter id={`${id}-shadow`}>
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>
      <rect width="320" height="370" fill={`url(#${id}-bg)`} />
      <ellipse cx="160" cy="300" rx="100" ry="13" fill="#000" opacity=".24" filter={`url(#${id}-shadow)`} />
      <path
        d="M66 195 V151 C66 20 254 20 254 151 V195"
        fill="none"
        stroke="#101817"
        stroke-opacity=".4"
        stroke-width="30"
        stroke-linecap="round"
        transform="translate(0 5)"
      />
      <path
        d="M66 195 V151 C66 20 254 20 254 151 V195"
        fill="none"
        stroke={`url(#${id}-band)`}
        stroke-width="25"
        stroke-linecap="round"
      />
      <path
        d="M80 150 C80 44 240 44 240 150"
        fill="none"
        stroke={props.colorway.cushion}
        stroke-width="9"
        stroke-linecap="round"
      />
      <path d="M67 155 V205 M253 155 V205" stroke={props.colorway.cup} stroke-width="9" stroke-linecap="round" />
      <path d="M68 175 V203 M252 175 V203" stroke="#fff" stroke-opacity=".35" stroke-width="2" />
      <g transform="rotate(-8 77 226)">
        <rect x="48" y="176" width="58" height="103" rx="27" fill={props.colorway.cushion} />
        <rect x="42" y="181" width="52" height="92" rx="24" fill={`url(#${id}-cup)`} />
        <path
          d="M55 199 Q48 228 56 254"
          fill="none"
          stroke="#fff"
          stroke-opacity=".3"
          stroke-width="2"
          stroke-linecap="round"
        />
      </g>
      <g transform="rotate(8 243 226)">
        <rect x="214" y="176" width="58" height="103" rx="27" fill={props.colorway.cushion} />
        <rect x="226" y="181" width="52" height="92" rx="24" fill={`url(#${id}-cup)`} />
        <path
          d="M238 195 Q230 227 238 258"
          fill="none"
          stroke="#fff"
          stroke-opacity=".3"
          stroke-width="2"
          stroke-linecap="round"
        />
      </g>
    </svg>
  )
}
