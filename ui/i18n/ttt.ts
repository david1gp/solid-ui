import { tttDictionaryDe } from "#ui/i18n/tttDictionaryDe.js"
import { tttLanguage } from "#ui/i18n/tttLanguage.js"

export function ttt(s: string): string {
  if (tttLanguage.get() === "de") return tttDictionaryDe[s] ?? s
  return s
}

export function ttt1(s: string, x1: string): string {
  return ttt(s).replace("[X]", x1)
}
