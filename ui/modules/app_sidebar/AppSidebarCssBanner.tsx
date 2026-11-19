import { classArr } from "#ui/utils/classArr.js"

/**
 * Decorative CSS banner (profile header cover) in the colors of AppSidebarCssAvatar. Fills its parent.
 * With accentColor, the gradient is tinted from that CSS color (light and dark mode).
 */
export function AppSidebarCssBanner(p: { class?: string; accentColor?: string }) {
  return (
    <span
      aria-hidden={true}
      style={p.accentColor ? { "--app-banner-accent": p.accentColor } : undefined}
      class={classArr(
        "relative block size-full overflow-hidden bg-gradient-to-br transition-colors duration-300 motion-reduce:transition-none",
        p.accentColor
          ? [
              "from-[color-mix(in_oklab,var(--app-banner-accent)_20%,white)]",
              "via-[color-mix(in_oklab,var(--app-banner-accent)_35%,white)]",
              "to-[color-mix(in_oklab,var(--app-banner-accent)_55%,white)]",
              "dark:from-[color-mix(in_oklab,var(--app-banner-accent)_45%,black)]",
              "dark:via-[color-mix(in_oklab,var(--app-banner-accent)_30%,black)]",
              "dark:to-[color-mix(in_oklab,var(--app-banner-accent)_18%,black)]",
            ].join(" ")
          : "from-sky-200 via-indigo-200 to-indigo-300 dark:from-sky-900 dark:via-indigo-900 dark:to-indigo-950",
        p.class,
      )}
    >
      <span
        class={classArr(
          "absolute -left-[5%] -top-[60%] h-[140%] w-[35%] rounded-full bg-white/40 blur-2xl",
          p.accentColor
            ? "dark:bg-[color-mix(in_oklab,var(--app-banner-accent)_20%,transparent)]"
            : "dark:bg-sky-400/20",
        )}
      />
      <span
        class={classArr(
          "absolute right-[10%] -bottom-[70%] h-[150%] w-[40%] rounded-full blur-2xl",
          p.accentColor
            ? "bg-[color-mix(in_oklab,var(--app-banner-accent)_40%,transparent)] dark:bg-[color-mix(in_oklab,var(--app-banner-accent)_30%,transparent)]"
            : "bg-indigo-400/40 dark:bg-indigo-500/30",
        )}
      />
      <span class={"absolute left-[45%] top-[20%] size-16 rounded-full bg-white/30 blur-xl dark:bg-white/10"} />
    </span>
  )
}
