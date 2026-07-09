import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Zendesk app packaging expects manifest.json at the zip root alongside an
// assets/ directory — build straight into assets/ so `npm run package` can
// zip manifest.json + assets/ with no extra copy step.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "assets",
    assetsDir: ".",
  },
});
