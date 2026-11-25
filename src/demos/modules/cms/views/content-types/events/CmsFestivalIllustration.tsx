import { createUniqueId } from "solid-js"

export function CmsFestivalIllustration(props: { color: string }) {
  const id = createUniqueId()
  return (
    <svg viewBox="0 0 320 370" preserveAspectRatio="xMidYMid slice" class="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0.8" y2="1">
          <stop stop-color={props.color} />
          <stop offset="1" stop-color="#101520" />
        </linearGradient>
        <radialGradient id={`${id}-glow`}>
          <stop stop-color="#f9bb83" stop-opacity=".42" />
          <stop offset="1" stop-color={props.color} stop-opacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#ffe5ae" stop-opacity=".45" />
          <stop offset="1" stop-color="#ffe5ae" stop-opacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-stage`} x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#42515a" />
          <stop offset="1" stop-color="#161a25" />
        </linearGradient>
        <linearGradient id={`${id}-crowd`} x1="0" y1="0" x2="0" y2="1">
          <stop stop-color="#26303a" />
          <stop offset="1" stop-color="#090d16" />
        </linearGradient>
      </defs>
      <path fill={`url(#${id}-sky)`} d="M0 0h320v370H0z" />
      <ellipse cx="160" cy="175" rx="165" ry="150" fill={`url(#${id}-glow)`} />
      <g fill="#fff0d3" opacity=".8">
        <circle cx="40" cy="77" r="1.4" />
        <circle cx="93" cy="55" r="1" />
        <circle cx="235" cy="65" r="1.5" />
        <circle cx="282" cy="95" r="1" />
        <path d="M151 47l1.5 4.5L157 53l-4.5 1.5L151 59l-1.5-4.5L145 53l4.5-1.5zM263 133l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" />
      </g>
      <path d="M-10 52 Q72 112 163 82 T330 49" fill="none" stroke="#f5d9aa" stroke-opacity=".45" stroke-width="1.3" />
      <g fill="#ffd798">
        <circle cx="15" cy="67" r="2.4" />
        <circle cx="40" cy="78" r="2.4" />
        <circle cx="67" cy="85" r="2.4" />
        <circle cx="94" cy="88" r="2.4" />
        <circle cx="121" cy="88" r="2.4" />
        <circle cx="148" cy="85" r="2.4" />
        <circle cx="175" cy="79" r="2.4" />
        <circle cx="202" cy="73" r="2.4" />
        <circle cx="229" cy="67" r="2.4" />
        <circle cx="256" cy="62" r="2.4" />
        <circle cx="283" cy="57" r="2.4" />
        <circle cx="309" cy="51" r="2.4" />
      </g>
      <path d="M44 80l10 2-4 12zM104 89l10-1-4 12zM205 73l10-3-3 12zM267 60l10-2-3 12z" fill="#ef9b8e" opacity=".8" />
      <path d="M76 157L12 278h112l-31-121zM227 157l-31 121h112l-64-121z" fill={`url(#${id}-beam)`} />
      <path d="M61 157l99-54 99 54v9H61z" fill="#1a202b" stroke="#687079" stroke-width="2" />
      <path d="M72 164h176v104H72z" fill={`url(#${id}-stage)`} stroke="#849092" stroke-opacity=".5" stroke-width="2" />
      <path d="M82 176h156v82H82z" fill="#121824" />
      <path d="M91 253V182h138v71" fill="none" stroke="#e7a77e" stroke-opacity=".55" stroke-width="3" />
      <path d="M104 246V190M216 246V190" stroke="#d0c5bb" stroke-opacity=".14" stroke-width="2" />
      <circle cx="160" cy="205" r="20" fill="#f4a985" opacity=".22" />
      <circle cx="160" cy="209" r="6" fill="#f5c6a1" />
      <path d="M152 216q8-5 16 0l4 30h-24z" fill="#e4b29c" />
      <path d="M154 222l-13 13m25-13 14 10" stroke="#e4b29c" stroke-width="4" stroke-linecap="round" />
      <path d="M65 157h190M76 162v95m168-95v95" stroke="#a6a8a2" stroke-opacity=".65" stroke-width="3" />
      <g fill="#ffd99e">
        <circle cx="92" cy="163" r="3" />
        <circle cx="125" cy="163" r="3" />
        <circle cx="160" cy="163" r="3" />
        <circle cx="195" cy="163" r="3" />
        <circle cx="228" cy="163" r="3" />
      </g>
      <path
        d="M0 307q15-16 30-7 12-25 28-7 12-18 26-5 16-22 31 0 14-17 29-4 17-24 34-2 17-16 31 1 17-21 32-3 15-18 31-3 14-17 28-4v101H0z"
        fill={`url(#${id}-crowd)`}
      />
      <g fill="none" stroke="#18232c" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M55 313l-9-27-8-10m8 10 2-12M91 304l-8-29 3-12m-3 12-9-8M229 305l9-32-3-12m3 12 9-8M270 312l7-26 9-10m-9 10-2-12" />
      </g>
      <path
        d="M0 336q16-17 32-2 14-22 31-5 16-19 32-3 15-20 32-3 16-20 33-2 16-20 32-2 16-19 32-2 16-16 32 0 16-17 32 0 16-15 32-1v54H0z"
        fill="#0a1019"
        opacity=".88"
      />
      <path d="M0 290h320v80H0z" fill="#070c14" opacity=".22" />
    </svg>
  )
}
