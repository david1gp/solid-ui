import { For } from "solid-js"
import { footerSimpleDemoSocialLinks } from "#src/demos/modules/footerSimple/footerSimpleDemoSocialLinks.js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { footerModernDemoColumns } from "./footerModernDemoColumns.js"

export function FooterModernGlassPanel() {
  return (
    <div
      class={
        "rounded-2xl border border-white/20 bg-[#152a34]/85 p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.15),0_20px_60px_rgb(0_0_0/0.15)] backdrop-blur-2xl sm:p-10"
      }
    >
      <div class={"grid gap-10 lg:grid-cols-[1fr_1.3fr]"}>
        <div>
          <div class={"flex items-center gap-3 text-xl font-semibold tracking-tight"}>
            <span
              aria-hidden={"true"}
              class={"flex size-9 items-center justify-center rounded-full border border-white/70 text-lg"}
            >
              ✦
            </span>
            Astria
          </div>
          <p class={"mt-4 max-w-xs text-sm leading-relaxed text-white/80"}>
            Für alle, die neugierig bleiben und die Welt mit anderen Augen sehen möchten.
          </p>
        </div>
        <div class={"grid grid-cols-2 gap-8 sm:grid-cols-3"}>
          <For each={footerModernDemoColumns}>
            {(column) => (
              <nav aria-label={column.title}>
                <h3 class={"mb-4 text-sm font-semibold"}>{column.title}</h3>
                <ul class={"space-y-3"}>
                  <For each={column.links}>
                    {(link) => (
                      <li>
                        <a
                          class={
                            "text-sm text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          }
                          href={link.href}
                        >
                          {link.label}
                        </a>
                      </li>
                    )}
                  </For>
                </ul>
              </nav>
            )}
          </For>
        </div>
      </div>
      <div
        class={"mt-10 flex flex-col gap-4 border-t border-white/20 pt-5 sm:flex-row sm:items-center sm:justify-between"}
      >
        <p class={"text-xs text-white/80"}>© {new Date().getFullYear()} Astria. Alle Rechte vorbehalten.</p>
        <div class={"flex items-center gap-3 text-xs text-white/80"}>
          <span>Folge uns:</span>
          <ul class={"flex gap-1"} aria-label={"Social Media"}>
            <For each={footerSimpleDemoSocialLinks}>
              {(link) => (
                <li>
                  <a
                    href={link.href}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    aria-label={link.label}
                    title={link.label}
                    class={
                      "flex size-9 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
                    }
                  >
                    <Icon path={link.icon} class={"size-5"} />
                  </a>
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </div>
  )
}
