import { classArr } from "#ui/utils/classArr.js"

/**
 * Decorative CSS banner (profile header cover) in the colors of CmsSidebarCssAvatar. Fills its parent.
 * With accentColor, the gradient is tinted from that CSS color.
 * Always uses the light palette, independent of the color scheme.
 */
export function CmsSidebarCssBanner(p: { class?: string; accentColor?: string }) {
  return (
    <span
      aria-hidden="true"
      style={p.accentColor ? { "--app-banner-accent": p.accentColor } : undefined}
      class={classArr(
        "relative block size-full overflow-hidden bg-gradient-to-br transition-colors duration-300 motion-reduce:transition-none",
        p.accentColor
          ? [
              "from-[color-mix(in_oklab,var(--app-banner-accent)_20%,white)]",
              "via-[color-mix(in_oklab,var(--app-banner-accent)_35%,white)]",
              "to-[color-mix(in_oklab,var(--app-banner-accent)_55%,white)]",
            ].join(" ")
          : "from-sky-200 via-indigo-200 to-indigo-300",
        p.class,
      )}
    >
      <span class={"absolute -left-[5%] -top-[60%] h-[140%] w-[35%] rounded-full bg-white/40 blur-2xl"} />
      <span
        class={classArr(
          "absolute right-[10%] -bottom-[70%] h-[150%] w-[40%] rounded-full blur-2xl",
          p.accentColor ? "bg-[color-mix(in_oklab,var(--app-banner-accent)_40%,transparent)]" : "bg-indigo-400/40",
        )}
      />
      <span class={"absolute left-[45%] top-[20%] size-16 rounded-full bg-white/30 blur-xl"} />
    </span>
  )
}
