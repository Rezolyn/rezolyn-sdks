import { build, context } from "esbuild";

const watch = process.argv.includes("--watch");

// The widget is compiled and served from a CDN, so its default API URL is
// baked in at build time from VITE_API_URL (falls back to production .io).
// A page can still override per-embed with data-api-url. Move domains by
// rebuilding with a different env, not by editing source.
const apiUrl = process.env.VITE_API_URL ?? "https://api.rezolyn.com";

const options = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  target: "es2019",
  format: "iife",
  outfile: "dist/widget.js",
  legalComments: "none",
  define: {
    __REZOLYN_API_URL__: JSON.stringify(apiUrl),
  },
};

if (watch) {
  const ctx = await context(options);
  await ctx.watch();
  console.log("watching…");
} else {
  const result = await build({ ...options, metafile: true });
  const bytes = result.metafile.outputs["dist/widget.js"].bytes;
  console.log(`dist/widget.js: ${(bytes / 1024).toFixed(1)}KB (uncompressed)`);
}
