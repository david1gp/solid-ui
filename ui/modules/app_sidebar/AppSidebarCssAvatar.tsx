/** Decorative, size-adaptive CSS avatar. Set its size through class. Always uses the light palette, independent of the color scheme. */
export function AppSidebarCssAvatar(p: { class?: string }) {
  return (
    <span
      aria-hidden={true}
      class={`relative block size-full overflow-hidden rounded-full bg-gradient-to-br from-sky-200 to-indigo-300 ${p.class ?? ""}`}
    >
      <span class={"absolute left-[32%] top-[19%] size-[36%] rounded-full bg-white/80"} />
      <span class={"absolute left-[17%] top-[62%] h-[48%] w-[66%] rounded-t-full bg-white/80"} />
    </span>
  )
}
