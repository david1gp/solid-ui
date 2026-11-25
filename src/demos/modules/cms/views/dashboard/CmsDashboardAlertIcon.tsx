import { mdiAlertCircleOutline } from "@adaptive-ds/mdi/mdiAlertCircleOutline.js"
import { mdiCash } from "@adaptive-ds/mdi/mdiCash.js"
import { mdiCheckCircleOutline } from "@adaptive-ds/mdi/mdiCheckCircleOutline.js"
import { mdiEmailOutline } from "@adaptive-ds/mdi/mdiEmailOutline.js"
import { Icon } from "#ui/static/icon/Icon.jsx"

export function CmsDashboardAlertIcon(props: {
  type: "payment" | "error" | "message" | "success"
  size?: "small" | "default"
}) {
  return (
    <span
      aria-hidden="true"
      class={`flex shrink-0 items-center justify-center rounded-full ${props.size === "small" ? "size-5" : "size-10"} ${
        props.type === "payment" || props.type === "success"
          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
          : props.type === "error"
            ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
            : "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
      }`}
    >
      <Icon
        path={
          props.type === "payment"
            ? mdiCash
            : props.type === "success"
              ? mdiCheckCircleOutline
              : props.type === "error"
                ? mdiAlertCircleOutline
                : mdiEmailOutline
        }
        class={props.size === "small" ? "size-2.5" : "size-5"}
      />
    </span>
  )
}
