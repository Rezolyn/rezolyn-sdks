# @lingohq/freshdesk

Ticket-sidebar app for Freshdesk (Freshworks FDK). Same feature set as `../zendesk/`, ported to the Freshworks SDK.

## Constraints (mirrors the Zendesk app)

- The API key is a **secure iparam** (`config/iparams.json`, `"secure": true`) — never plain-text it, never read it into JS.
- All calls to the LingoHQ API go through `client.request.invokeTemplate("processMessage", …)` (`src/lib/lingohq.ts`), which uses the request template in `requests.json` — the template's `Authorization: Bearer <%= iparam.api_key %>` header is filled in server-side by Freshworks, so the real key never reaches this iframe. **Never** raw `fetch()`.

## Development

```bash
npm install
npm run dev         # Vite dev server — full FDK preview needs the Freshworks CLI (`fdk run`)
npm run build        # builds to dist/
npm run typecheck
```

## Known gaps

- **Packaging is not wired up.** `vite build` outputs to `dist/`, but the Freshworks CLI (`fdk pack`/`fdk validate`) expects `index.html` alongside `manifest.json` at the project root per FDK conventions — copying `dist/` into that shape is a follow-up, not yet scripted here.
- `client.data.get("ticket")` in `src/App.tsx` is the standard FDK ticket_sidebar data contract but hasn't been verified against a live Freshworks sandbox — confirm field names (`description_text` etc.) against Freshworks' current docs before shipping.
- No "insert into reply" action yet (the Zendesk app has one via `client.set("ticket.comment.text", …)`) — Freshworks' equivalent editor-insertion API wasn't confident enough to guess at; needs to be looked up against live FDK docs, not fabricated.
- No icon/branding assets yet (`icon.svg`, required by `manifest.json`).
