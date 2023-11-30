// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: {
        "observus-core": resolve(__dirname, "src/lib/observus-core.ts"),
        "observus-helpers": resolve(__dirname, "src/lib/observus-helpers.ts"),
        "observus-tags": resolve(__dirname, "src/lib/observus-tags.ts"),
        "observus-attributes": resolve(__dirname, "src/lib/observus-attributes.ts"),
        "observus-svg-tags": resolve(__dirname, "src/lib/observus-svg-tags.ts"),
        "observus-svg-attributes": resolve(
          __dirname,
          "src/lib/observus-svg-attributes.ts",
        ),
      },
      name: "observus",
    },
  },
  plugins: [dts({
    entryRoot: "src/lib",
    exclude: "**/*.test.ts"
  })],
});
