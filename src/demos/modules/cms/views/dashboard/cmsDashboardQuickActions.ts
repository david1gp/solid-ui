import { mdiAccountGroup } from "@adaptive-ds/mdi/mdiAccountGroup.js"
import { mdiFileDocumentOutline } from "@adaptive-ds/mdi/mdiFileDocumentOutline.js"
import { mdiFolderMultipleOutline } from "@adaptive-ds/mdi/mdiFolderMultipleOutline.js"
import { mdiClipboardTextOutline } from "@adaptive-ds/mdi/mdiClipboardTextOutline.js"

export const cmsDashboardQuickActions = [
  {
    view: "pages",
    icon: mdiFileDocumentOutline,
    count: 24,
    label: { de: "Neue Seite", en: "New page" },
    countLabel: { de: "Seiten", en: "pages" },
  },
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
