/** Decorative CSS banner (profile header cover) in the colors of AppSidebarCssAvatar. Fills its parent. */
export function AppSidebarCssBanner(p: { class?: string }) {
  return (
    <span
      aria-hidden={true}
      class={`relative block size-full overflow-hidden bg-gradient-to-br from-sky-200 via-indigo-200 to-indigo-300 dark:from-sky-900 dark:via-indigo-900 dark:to-indigo-950 ${p.class ?? ""}`}
    >
      <span
        class={"absolute -left-[5%] -top-[60%] h-[140%] w-[35%] rounded-full bg-white/40 blur-2xl dark:bg-sky-400/20"}
      />
      <span
        class={
          "absolute right-[10%] -bottom-[70%] h-[150%] w-[40%] rounded-full bg-indigo-400/40 blur-2xl dark:bg-indigo-500/30"
        }
      />
      <span class={"absolute left-[45%] top-[20%] size-16 rounded-full bg-white/30 blur-xl dark:bg-white/10"} />
    </span>
  )
}
