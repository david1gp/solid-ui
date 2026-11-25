import { cmsEventDateParts } from "./cmsEventDateParts.js"

export function CmsEventDateBadge(props: { date: string; color: string; large?: boolean }) {
  const parts = () => cmsEventDateParts(props.date)
  return (
    <div
      class={`flex shrink-0 flex-col items-center justify-center rounded-lg text-white ${props.large ? "size-32" : "size-16"}`}
      style={{ "background-color": props.color }}
      aria-hidden="true"
    >
      <span class={`font-bold leading-none ${props.large ? "text-5xl" : "text-xl"}`}>{parts().day}</span>
      <span class={`mt-1 uppercase tracking-wide opacity-80 ${props.large ? "text-base" : "text-xs"}`}>
        {parts().month}
      </span>
    </div>
  )
}
