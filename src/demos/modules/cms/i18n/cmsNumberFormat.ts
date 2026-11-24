import { cmsLocale } from "./cmsLocale.js"

export function cmsNumberFormat(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(cmsLocale.get(), options).format(value)
}
