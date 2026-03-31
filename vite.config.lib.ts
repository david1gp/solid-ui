import tailwindcss from "@tailwindcss/vite"
import { glob } from "glob"
import { resolve } from "path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import solid from "vite-plugin-solid"

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    solid(),
    tailwindcss(),
    dts({
      include: ["ui/**/*"],
      outDir: "out",
      // Use your tsconfig.lib.json for proper configuration
      tsconfigPath: "./tsconfig.lib.json",
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      // Entry point(s) for your library
      // entry: resolve(__dirname, "ui/**/*.{ts,tsx}"),
      entry: glob.sync(resolve(__dirname, "ui/**/*.{ts,tsx}"), {
        ignore: ["**/*.test.ts", "**/*.test.tsx"],
      }),
      // Output formats - ESM is standard for modern libraries
      formats: ["es"],
    },
    outDir: "dist",
    // Don't minify library code - let consumers decide
    minify: false,
    sourcemap: true,
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled
      external: [
        "solid-js",
        "solid-js/web",
        "solid-js/store",
        "@adaptive-ds/utils",
        "@mdi/js",
        "@solid-primitives/keyed",
        "@solid-primitives/scheduled",
        "@solidjs/router",
        "clsx",
        "dayjs",
        "tailwind-merge",
        "valibot",
        /^node:.*$/, // Externalize all node imports
        /^bun:.*$/, // Externalize all bun imports
      ],
      output: {
        // Preserve module structure for better tree-shaking
        preserveModules: true,
        preserveModulesRoot: "ui",
      },
    },
  },
})
