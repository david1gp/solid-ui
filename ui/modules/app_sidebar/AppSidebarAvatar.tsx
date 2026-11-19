import { createSignal, type JSXElement, Show } from "solid-js"

/** Shared avatar: custom content takes precedence over a URL, then initials. */
export function AppSidebarAvatar(p: { userAvatar?: JSXElement; userImageUrl?: string; userInitials?: string }) {
  const [failedUrl, setFailedUrl] = createSignal<string>()
  return (
    <Show when={p.userAvatar || p.userImageUrl || p.userInitials}>
      <span
        class={
          "flex items-center justify-center size-8 shrink-0 overflow-hidden rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold"
        }
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
