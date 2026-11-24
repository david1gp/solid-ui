import { For } from "solid-js"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { footerModernDemoColumns } from "./footerModernDemoColumns.js"
import { footerModernDemoSocialLinks } from "./footerModernDemoSocialLinks.js"

const linkClass =
  "text-sm text-muted-foreground hover:text-foreground hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"

/** Solid footer card on the footer ground: brand, link columns, copyright and social links in theme colors. */
export function FooterModernPanel() {
  return (
    <div class={"rounded-2xl border border-border bg-background p-6 shadow-sm sm:p-10"}>
      <div class={"grid gap-10 lg:grid-cols-[1fr_1.3fr]"}>
        <div>
          <a
            href={"/"}
            class={
              "inline-flex items-center gap-2.5 rounded-md text-xl font-semibold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
            }
          >
            <img src={"/logo.svg"} alt={""} class={"size-8"} />
            adaptive-solid-ui
          </a>
          <p class={"mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground"}>
            Komponenten und Vorlagen für Solid.js und Tailwind CSS – für moderne Web-Apps in hell und dunkel.
          </p>
        </div>
        <div class={"grid grid-cols-2 gap-8 sm:grid-cols-3"}>
          <For each={footerModernDemoColumns}>
            {(column) => (
              <nav aria-label={column.title}>
                <h3 class={"mb-4 text-sm font-semibold text-foreground"}>{column.title}</h3>
                <ul class={"space-y-3"}>
                  <For each={column.links}>
                    {(link) => (
                      <li>
                        <a class={linkClass} href={link.href}>
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
        class={"mt-10 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between"}
      >
        <p class={"text-xs text-muted-foreground"}>
          © {new Date().getFullYear()} adaptive-solid-ui. Alle Rechte vorbehalten.
        </p>
        <div class={"flex items-center gap-3 text-xs text-muted-foreground"}>
          <span>Folge uns:</span>
          <ul class={"flex gap-1"} aria-label={"Social Media"}>
            <For each={footerModernDemoSocialLinks}>
              {(link) => (
                <li>
                  <a
                    href={link.href}
                    target={"_blank"}
                    rel={"noopener noreferrer"}
                    aria-label={link.label}
                    title={link.label}
                    class={
                      "flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-foreground/10 hover:text-foreground focus-visible:outline-2 focus-visible:outline-foreground"
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
