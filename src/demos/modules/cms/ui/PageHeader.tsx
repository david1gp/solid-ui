import type { JSX } from "@solidjs/web"

/** Heading and optional actions for a CMS view. */
export function PageHeader(p: { title: string; description?: string; actions?: JSX.Element }) {
  return (
    <header class="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div class="min-w-0">
        <h1 class="text-2xl font-semibold">{p.title}</h1>
        {p.description && <p class="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{p.description}</p>}
      </div>
      {p.actions && <div class="flex flex-wrap items-center gap-2">{p.actions}</div>}
    </header>
  )
}
