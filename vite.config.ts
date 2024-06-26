// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: "lib",
    lib: {
      entry: {
        observus: resolve(__dirname, "src/observus.ts"),
        helpers: resolve(__dirname, "src/helpers.ts"),
        tags: resolve(__dirname, "src/tags.ts"),
        "svg-tags": resolve(__dirname, "src/svg-tags.ts"),
      },
      name: "observus",
    },
  },
  plugins: [
    dts({
      entryRoot: "src",
      exclude: "**/*.test.ts",
    }),
  ],
});
