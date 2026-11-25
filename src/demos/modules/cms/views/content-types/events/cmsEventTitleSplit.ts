export function cmsEventTitleSplit(title: string) {
  const separator = / [–-] /.exec(title)
  if (!separator) return { eyebrow: "", title }
  return { eyebrow: title.slice(0, separator.index), title: title.slice(separator.index + separator[0].length) }
}
