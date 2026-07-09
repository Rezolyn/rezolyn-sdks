import { build, context } from "esbuild";

const watch = process.argv.includes("--watch");

const options = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  target: "es2019",
  format: "iife",
  outfile: "dist/widget.js",
  legalComments: "none",
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
