import { createSignalObject } from "#ui/utils/createSignalObject.js"
import type { CmsViewKey } from "./CmsViewKey.js"

export const cmsNavigation = createSignalObject<{ view: CmsViewKey; id?: string }>({ view: "dashboard" })
