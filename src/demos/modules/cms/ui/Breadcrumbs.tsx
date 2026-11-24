import { For, Show } from "solid-js"

/** Navigation trail; the final item identifies the current page. */
export function Breadcrumbs(p: { items: { label: string; href?: string; onClick?: () => void }[]; label?: string }) {
  return (
    <nav aria-label={p.label ?? "Breadcrumb"}>
      <ol class="flex flex-wrap items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
        <For each={p.items}>
          {(item, index) => (
            <li class="flex items-center gap-2">
              <Show when={index() > 0}>
                <span aria-hidden="true">/</span>
              </Show>
              <Show
                when={index() < p.items.length - 1 && (item.href || item.onClick)}
                fallback={
                  <span
                    aria-current={index() === p.items.length - 1 ? "page" : undefined}
                    class="text-neutral-900 dark:text-neutral-100"
                  >
                    {item.label}
                  </span>
                }
              >
                <Show
                  when={item.href}
                  fallback={
                    <button type="button" class="hover:underline" onClick={item.onClick}>
                      {item.label}
                    </button>
                  }
                >
                  <a href={item.href} class="hover:underline" onClick={item.onClick}>
                    {item.label}
                  </a>
                </Show>
              </Show>
            </li>
          )}
        </For>
      </ol>
    </nav>
  )
}
