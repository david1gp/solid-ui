import { mdiLogout } from "@adaptive-ds/mdi/mdiLogout.js"
import { mdiPencilOutline } from "@adaptive-ds/mdi/mdiPencilOutline.js"
import { createSignal, type JSXElement, Show } from "solid-js"
import { AppSidebarAvatar } from "#ui/modules/app_sidebar/AppSidebarAvatar.jsx"
import { Icon } from "#ui/static/icon/Icon.jsx"
import { classArr } from "#ui/utils/classArr.js"

export interface AppSettingsProfileHeaderProps {
  name?: string
  email?: string
  userInitials?: string
  userImageUrl?: string
  userAvatar?: JSXElement
  /** Custom cover content, e.g. <AppSidebarCssBanner />; takes precedence over bannerImageUrl. */
  banner?: JSXElement
  bannerImageUrl?: string
  editProfileLabel?: string
  onEditProfile?: () => void
  logoutLabel?: string
  onLogout?: () => void
  class?: string
}

const actionButton = classArr(
  "inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg cursor-pointer text-sm font-medium whitespace-nowrap", // layout
  "border border-neutral-200 bg-white hover:bg-neutral-100 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10", // look
  "transition-colors",
)

/**
 * Profile card for the top of a settings page: cover banner, large avatar overlapping it, name, email
 * and optional actions. Container-query responsive: centered when narrow (e.g. in AppSettingsSidebar),
 * left-aligned with actions on the right when wide.
 */
export function AppSettingsProfileHeader(p: AppSettingsProfileHeaderProps) {
  const [failedBannerUrl, setFailedBannerUrl] = createSignal<string>()
  const hasActions = () => p.editProfileLabel || p.logoutLabel
  return (
    <section
      class={classArr(
        "@container overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 dark:border-white/5 dark:bg-[#292A2D]",
        p.class,
      )}
    >
      <div
        class={
          "h-20 @md:h-28 bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800"
        }
      >
        <Show
          when={p.banner}
          fallback={
            <Show when={p.bannerImageUrl && failedBannerUrl() !== p.bannerImageUrl}>
              <img
                src={p.bannerImageUrl}
                alt={""}
                class={"size-full object-cover"}
                onError={() => setFailedBannerUrl(p.bannerImageUrl)}
              />
            </Show>
          }
        >
          {p.banner}
        </Show>
      </div>
      <div
        class={classArr(
          "flex flex-col items-center gap-3 px-4 pb-4 text-center", // narrow: centered stack
          "@md:flex-row @md:items-start @md:gap-4 @md:text-left", // wide: row
        )}
      >
        <AppSidebarAvatar
          userAvatar={p.userAvatar}
          userImageUrl={p.userImageUrl}
          userInitials={p.userInitials}
          class={classArr(
            "size-18 -mt-9 @md:size-20 @md:-mt-10 text-xl", // size + overlap with banner
            "ring-4 ring-neutral-50 dark:ring-[#292A2D] bg-neutral-100 dark:bg-neutral-700",
          )}
        />
        <div class={"flex flex-col min-w-0 w-full @md:w-auto @md:flex-1 @md:pt-3"}>
          <Show when={p.name}>
            <h2 class={"text-lg font-semibold truncate"}>{p.name}</h2>
          </Show>
          <Show when={p.email}>
            <span class={"text-sm text-neutral-500 dark:text-neutral-400 truncate"}>{p.email}</span>
          </Show>
        </div>
        <Show when={hasActions()}>
          <div class={"flex flex-wrap items-center justify-center gap-2 @md:pt-3.5 @md:shrink-0"}>
            <Show when={p.editProfileLabel}>
              <button type={"button"} onClick={() => p.onEditProfile?.()} class={actionButton}>
                <Icon path={mdiPencilOutline} class={"size-4"} />
                <span>{p.editProfileLabel}</span>
              </button>
            </Show>
            <Show when={p.logoutLabel}>
              <button
                type={"button"}
                onClick={() => p.onLogout?.()}
                class={classArr(actionButton, "text-red-600 dark:text-red-400")}
              >
                <Icon path={mdiLogout} class={"size-4"} />
                <span>{p.logoutLabel}</span>
              </button>
            </Show>
          </div>
        </Show>
      </div>
    </section>
  )
}
