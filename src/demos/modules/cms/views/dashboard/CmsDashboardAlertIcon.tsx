import { mdiAlertCircleOutline } from "@adaptive-ds/mdi/mdiAlertCircleOutline.js"
import { mdiCash } from "@adaptive-ds/mdi/mdiCash.js"
import { mdiEmailOutline } from "@adaptive-ds/mdi/mdiEmailOutline.js"
import { Icon } from "#ui/static/icon/Icon.jsx"

export function CmsDashboardAlertIcon(props: { type: "payment" | "error" | "message" }) {
  return (
    <span
      aria-hidden="true"
      class={
        props.type === "payment"
          ? "flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
          : props.type === "error"
            ? "flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
            : "flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
      }
    >
      <Icon
        path={props.type === "payment" ? mdiCash : props.type === "error" ? mdiAlertCircleOutline : mdiEmailOutline}
        class="size-5"
      />
    </span>
  )
}
