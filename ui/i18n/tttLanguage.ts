import { createSignalObject } from "#ui/utils/createSignalObject.js"

/** UI language for ttt translations; defaults to German. Use "en" for the original (English) strings. */
export const tttLanguage = createSignalObject<"de" | "en">("de")
