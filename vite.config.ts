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
        "observus-core": resolve(__dirname, "src/core.ts"),
        "observus-dom": resolve(__dirname, "src/dom.ts"),
        "observus-helpers": resolve(__dirname, "src/helpers.ts"),
        "observus-tags": resolve(__dirname, "src/tags.ts"),
        "observus-svg-tags": resolve(__dirname, "src/svg-tags.ts"),
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
