import { cmsLocale } from "./cmsLocale.js"

export function cmsDateFormat(value: Date | number, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(cmsLocale.get(), options).format(value)
}
