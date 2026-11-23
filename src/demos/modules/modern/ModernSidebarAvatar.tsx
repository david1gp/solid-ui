import { createSignal, type Element as JSXElement, Show } from "solid-js"

/** Shared avatar: custom content takes precedence over a URL, then initials. */
export function ModernSidebarAvatar(p: {
  userAvatar?: JSXElement
  userImageUrl?: string
  userInitials?: string
  /** Replaces the default size and text size (size-8 text-xs). */
  class?: string
}) {
  const [failedUrl, setFailedUrl] = createSignal<string>()
  return (
    <Show when={p.userAvatar || p.userImageUrl || p.userInitials}>
      <span
        class={`flex items-center justify-center shrink-0 overflow-hidden rounded-full bg-black/5 dark:bg-white/10 font-semibold ${p.class ?? "size-8 text-xs"}`}
      >
        <Show
          when={p.userAvatar}
          fallback={
            <Show when={p.userImageUrl && failedUrl() !== p.userImageUrl} fallback={p.userInitials}>
              <img
                src={p.userImageUrl}
                alt={""}
                class={"size-full object-cover"}
                onError={() => setFailedUrl(p.userImageUrl)}
              />
            </Show>
          }
        >
          {p.userAvatar}
        </Show>
      </span>
    </Show>
  )
}
