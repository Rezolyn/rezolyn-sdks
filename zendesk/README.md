# @rezolyn/zendesk

Ticket-sidebar app for Zendesk Support (ZAF v2). React + TypeScript, built with Vite.

## Constraints (non-negotiable)

- Total `assets/` output must stay **under 200KB uncompressed** — check `npm run build` output size, PurgeCSS aggressively if styling grows.
- `manifest.json` sets `signedUrls: true`. The `api_key` app setting is `secure: true` — never plain-text it, never read it into JS.
- All calls to the Rezolyn API go through `client.request({..., secure: true, headers: {Authorization: "Bearer {{setting.api_key}}"}})` in `src/lib/rezolyn.ts` — **never** raw `fetch()`, which would expose the key in the iframe's network requests.

## Development

```bash
npm install
npm run dev         # Vite dev server (Zendesk Local Testing / ngrok tunnel needed to preview inside a real ticket)
npm run build        # builds to assets/
npm run package       # builds + zips manifest.json + assets/ for Marketplace/manual upload
npm run typecheck
```

## Known gaps

- `client.get("ticket.latestComment")` / `client.set("ticket.comment.text", …)` in `src/App.tsx` are the standard ZAF v2 ticket_sidebar location paths but haven't been verified against a live Zendesk sandbox — confirm against Zendesk's current ticket_sidebar API reference before shipping.
- No icon/branding assets yet (`assets/icon.png` etc. — required for Marketplace submission, not for local testing).
- **Bundle size risk:** the current build is ~196KB uncompressed (React + ReactDOM runtime dominates), right against the 200KB ceiling with almost no app code yet. Any further UI growth will blow the budget — before adding features, either switch to `preact` + `preact/compat` (drop-in React API, ~10KB) or drop React entirely for this app in favor of vanilla DOM like the widget. Flagging now rather than after the budget is already blown.
