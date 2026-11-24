import type { Element as JSXElement } from "solid-js"

export function CmsAuthLayout(p: { children: JSXElement; backLabel: string; onBack: () => void }) {
  return (
    <main class="flex min-h-dvh w-full flex-col items-center justify-center bg-neutral-50 p-6 dark:bg-[#222326]">
      <div class="w-full max-w-md">
        <button
          type="button"
          onClick={p.onBack}
          class="mb-4 text-sm text-neutral-500 hover:text-neutral-950 dark:hover:text-white"
        >
          ← {p.backLabel}
        </button>
        <div class="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-white/10 dark:bg-neutral-900">
          {p.children}
        </div>
      </div>
    </main>
  )
}
