import { For } from "solid-js"

const stars: [number, number, number][] = [
  [42, 64, 1.1],
  [128, 38, 0.8],
  [262, 52, 1],
  [300, 150, 0.9],
  [22, 212, 0.8],
  [58, 330, 1.2],
  [286, 300, 0.8],
  [190, 402, 1],
  [96, 420, 0.7],
  [306, 418, 1.1],
  [150, 96, 0.6],
  [236, 120, 0.7],
]

/** Space-themed CMS workspace illustration with the brand logo centred at the bottom. */
export function RegisterCiArtwork(p: { label: string }) {
  return (
    <aside class="rc-art" aria-label={p.label}>
      <svg class="rc-art-scene" viewBox="0 0 320 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id="rcOrbLarge" cx="35%" cy="30%" r="75%">
            <stop offset="0" stop-color="#e8f1fb" />
            <stop offset="0.45" stop-color="#9fb6cf" />
            <stop offset="1" stop-color="#2c3644" />
          </radialGradient>
          <radialGradient id="rcOrbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stop-color="#a9c4e2" stop-opacity="0.35" />
            <stop offset="1" stop-color="#a9c4e2" stop-opacity="0" />
          </radialGradient>
          <linearGradient id="rcStreak" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#ffffff" stop-opacity="0.9" />
            <stop offset="1" stop-color="#ffffff" stop-opacity="0" />
          </linearGradient>
          <linearGradient id="rcCard" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#2a2e34" stop-opacity="0.92" />
            <stop offset="1" stop-color="#1b1e22" stop-opacity="0.92" />
          </linearGradient>
          <linearGradient id="rcHero" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#3a4656" />
            <stop offset="1" stop-color="#222a33" />
          </linearGradient>
          <pattern id="rcGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="#ffffff" stroke-opacity="0.035" stroke-width="0.6" />
          </pattern>
        </defs>

        <rect width="320" height="460" fill="url(#rcGrid)" />

        <For each={stars}>{([cx, cy, r]) => <circle class="rc-star" cx={cx} cy={cy} r={r} fill="#d7dde5" />}</For>

        <rect x="52" y="54" width="1.4" height="90" rx="0.7" fill="url(#rcStreak)" />
        <circle cx="52.7" cy="54" r="1.6" fill="#fff" />
        <rect x="276" y="196" width="1.4" height="84" rx="0.7" fill="url(#rcStreak)" />
        <circle cx="276.7" cy="196" r="1.6" fill="#fff" />

        <circle cx="248" cy="58" r="22" fill="url(#rcOrbGlow)" />
        <circle cx="248" cy="58" r="7" fill="url(#rcOrbLarge)" />

        {/* CMS editor window */}
        <g class="rc-art-cms">
          <rect
            x="62"
            y="118"
            width="196"
            height="212"
            rx="10"
            fill="url(#rcCard)"
            stroke="#ffffff"
            stroke-opacity="0.08"
          />
          <circle cx="75" cy="131" r="2.2" fill="#ffffff" fill-opacity="0.35" />
          <circle cx="83" cy="131" r="2.2" fill="#ffffff" fill-opacity="0.2" />
          <circle cx="91" cy="131" r="2.2" fill="#ffffff" fill-opacity="0.12" />
          <rect x="198" y="126" width="48" height="10" rx="5" fill="#9fb6cf" fill-opacity="0.85" />
          <rect x="62" y="143" width="196" height="0.8" fill="#ffffff" fill-opacity="0.07" />

          {/* sidebar */}
          <rect x="70" y="152" width="44" height="170" rx="5" fill="#ffffff" fill-opacity="0.03" />
          <rect x="76" y="160" width="32" height="5" rx="2.5" fill="#ffffff" fill-opacity="0.3" />
          <rect x="76" y="172" width="26" height="4" rx="2" fill="#ffffff" fill-opacity="0.14" />
          <rect x="76" y="182" width="30" height="4" rx="2" fill="#ffffff" fill-opacity="0.14" />
          <rect x="74" y="191" width="36" height="9" rx="3" fill="#9fb6cf" fill-opacity="0.18" />
          <rect x="78" y="193.5" width="22" height="4" rx="2" fill="#cfdceb" fill-opacity="0.6" />
          <rect x="76" y="206" width="24" height="4" rx="2" fill="#ffffff" fill-opacity="0.14" />
          <rect x="76" y="216" width="28" height="4" rx="2" fill="#ffffff" fill-opacity="0.14" />

          {/* hero block */}
          <rect x="122" y="152" width="128" height="62" rx="6" fill="url(#rcHero)" />
          <path d="M130 206l22-22 14 13 10-9 20 18z" fill="#ffffff" fill-opacity="0.1" />
          <circle cx="232" cy="166" r="5" fill="#ffffff" fill-opacity="0.18" />

          {/* text lines */}
          <rect x="122" y="222" width="92" height="6" rx="3" fill="#ffffff" fill-opacity="0.32" />
          <rect x="122" y="233" width="124" height="4" rx="2" fill="#ffffff" fill-opacity="0.12" />
          <rect x="122" y="241" width="110" height="4" rx="2" fill="#ffffff" fill-opacity="0.12" />
          <rect x="122" y="249" width="70" height="4" rx="2" fill="#ffffff" fill-opacity="0.12" />

          {/* content cards */}
          <rect
            x="122"
            y="262"
            width="61"
            height="52"
            rx="5"
            fill="#ffffff"
            fill-opacity="0.04"
            stroke="#ffffff"
            stroke-opacity="0.06"
          />
          <rect x="128" y="268" width="49" height="22" rx="3" fill="#ffffff" fill-opacity="0.06" />
          <rect x="128" y="296" width="36" height="4" rx="2" fill="#ffffff" fill-opacity="0.2" />
          <rect x="128" y="304" width="26" height="3" rx="1.5" fill="#ffffff" fill-opacity="0.1" />
          <rect
            x="189"
            y="262"
            width="61"
            height="52"
            rx="5"
            fill="#ffffff"
            fill-opacity="0.04"
            stroke="#ffffff"
            stroke-opacity="0.06"
          />
          <rect x="195" y="268" width="49" height="22" rx="3" fill="#ffffff" fill-opacity="0.06" />
          <rect x="195" y="296" width="30" height="4" rx="2" fill="#ffffff" fill-opacity="0.2" />
          <rect x="195" y="304" width="38" height="3" rx="1.5" fill="#ffffff" fill-opacity="0.1" />
        </g>

        <circle cx="236" cy="300" r="54" fill="url(#rcOrbGlow)" />
        <circle class="rc-art-orb" cx="236" cy="300" r="22" fill="url(#rcOrbLarge)" />
      </svg>
      <div class="rc-art-logo">
        <img src="/logo.svg" alt="" width="22" height="22" />
        <span>adaptive</span>
      </div>
    </aside>
  )
}
