# @lingohq/widget

The embeddable web chat widget. Zero runtime dependencies — vanilla TypeScript, esbuild, Shadow DOM. Deploys to Cloudflare Pages as `cdn.lingohq.io/widget.js`.

## Embed

```html
<script
  src="https://cdn.lingohq.io/widget.js"
  data-key="ld_pub_..."
  data-project="proj_..."
  defer
></script>
```

Use the **publishable key** (process-only permissions), never the secret key — this script is public.

## Hard constraints

- **Zero dependencies.** No React, no Vue, no lodash. Vanilla TS only.
- **Bundle size < 15KB gzipped.** `npm run size` builds and prints the gzipped byte count.
- **Shadow DOM only.** All CSS lives in `src/styles.ts`, injected into the shadow root — the widget never leaks styles onto the host page.
- **No localStorage, no cookies.** Session id is `crypto.randomUUID()`, held in memory, gone on refresh.

## Development

```bash
npm install
npm run dev      # esbuild --watch
npm run build    # one-shot build to dist/widget.js
npm run size      # build + report gzipped size
npm run typecheck
```
