import { join } from "node:path"

export function serializeDemoComponentImport(path: string, baseDir: string, importPrefix: string) {
  const name =
    path
      .split("/")
      .at(-1)
      ?.replace(/\.tsx?$/, "") || ""

  const replacements = [
    [join(baseDir, "src"), importPrefix],
    [join(baseDir, "lib"), "~ui"],
  ] as const

  let importPath = path.replace(/\.tsx$/, ".jsx").replace(/\.ts$/, ".js")
  for (const [search, replace] of replacements) {
    importPath = importPath.replaceAll(search, replace)
  }
  // console.log("import:", path, "->", importPath)

  return `
  const ${name} = lazy(async () => {
    const c = await import("${importPath}")
    return { default: c.${name} }
  })
  `
}
