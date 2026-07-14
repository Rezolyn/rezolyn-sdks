# rezolyn-integrations

Three distribution surfaces for Rezolyn, each an independent deployable in its own subdirectory. All three talk to [rezolyn-platform](https://github.com/rezolyn/rezolyn-platform)'s `POST /v1/process` and nothing else — no shared runtime, no shared package (beyond the type-only `shared/process-types.ts`).

| Directory | What it is | Stack | Deploys to |
|---|---|---|---|
| [`widget/`](widget/) | Embeddable web chat widget | Vanilla TypeScript, esbuild, zero deps | Cloudflare Pages → `cdn.rezolyn.com/widget.js` |
| [`zendesk/`](zendesk/) | Ticket-sidebar app | React + ZAF SDK v2, Vite | Zendesk Marketplace |
| [`freshdesk/`](freshdesk/) | Ticket-sidebar app | React + Freshworks FDK, Vite | Freshworks Marketplace |

Each has its own `package.json`, build, and (see `.github/workflows/ci.yml`) its own CI job — a change to one never rebuilds another.

## Status

All three: real UI, real typed call into `/v1/process`, real build verified locally (typecheck + build passing, widget under its 15KB gzip budget). See each subdirectory's README for surface-specific known gaps — mainly: exact ZAF/FDK data-access API paths need verification against live sandboxes before Marketplace submission, and neither Marketplace package has branding assets (icons) yet.

## Shared types

`shared/process-types.ts` — the `ProcessResponse` shape, hand-written against `rezolyn-platform`'s `app/schemas/process.py`. `widget/` has its own copy (built and verified before this existed); `zendesk/` and `freshdesk/` import it directly via relative path.
