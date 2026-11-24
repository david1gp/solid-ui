import { mdiAccountGroup } from "@adaptive-ds/mdi/mdiAccountGroup.js"
import { mdiClipboardTextOutline } from "@adaptive-ds/mdi/mdiClipboardTextOutline.js"
import { mdiFolderMultipleOutline } from "@adaptive-ds/mdi/mdiFolderMultipleOutline.js"

export const cmsDashboardQuickActions = [
  {
    view: "posts",
    icon: mdiClipboardTextOutline,
    count: 128,
    label: { de: "Neuer Beitrag", en: "New post" },
    countLabel: { de: "Beiträge", en: "posts" },
  },
  {
    view: "media",
    icon: mdiFolderMultipleOutline,
    count: 846,
    label: { de: "Medien hochladen", en: "Upload media" },
    countLabel: { de: "Medien", en: "media" },
  },
  {
    view: "users",
    icon: mdiAccountGroup,
    count: 18,
    label: { de: "Benutzer", en: "Users" },
    countLabel: { de: "Benutzer", en: "users" },
  },
] as const
