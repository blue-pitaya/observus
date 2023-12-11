// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: {
        "observus-core": resolve(__dirname, "src/observus-core.ts"),
        "observus-helpers": resolve(__dirname, "src/observus-helpers.ts"),
        "observus-tags": resolve(__dirname, "src/observus-tags.ts"),
        "observus-attributes": resolve(__dirname, "src/observus-attributes.ts"),
        "observus-svg-tags": resolve(__dirname, "src/observus-svg-tags.ts"),
        "observus-svg-attributes": resolve(
          __dirname,
          "src/observus-svg-attributes.ts",
        ),
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
