import { useCallback, useEffect, useRef, useState } from "react";
import { processMessage } from "./lib/lingohq";

type Status = "idle" | "loading" | "error";

export function App({ client }: { client: ZAFClient }) {
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<Awaited<ReturnType<typeof processMessage>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sessionId = useRef(crypto.randomUUID());
  const settingsRef = useRef<{ api_url?: string }>({});

  useEffect(() => {
    client.metadata().then((meta) => {
      settingsRef.current = meta.settings as { api_url?: string };
    });
  }, [client]);

  const handleTranslate = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      // ZAF ticket_sidebar apps read the customer's latest comment this way;
      // verify against Zendesk's current ticket_sidebar location docs before shipping.
      const data = await client.get<{ "ticket.latestComment": { value: string } }>(
        "ticket.latestComment",
      );
      const text = data["ticket.latestComment"].value;
      const response = await processMessage(client, settingsRef.current, text, sessionId.current);
      setResult(response);
      setStatus("idle");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }, [client]);

  const handleInsert = useCallback(async () => {
    if (!result) return;
    await client.set("ticket.comment.text", result.suggestion);
  }, [client, result]);

  return (
    <div style={{ padding: 12, fontFamily: "sans-serif", fontSize: 13 }}>
      <button type="button" onClick={handleTranslate} disabled={status === "loading"}>
        {status === "loading" ? "Analyzing…" : "Translate & suggest reply"}
      </button>

      {error && <p style={{ color: "#c0392b", marginTop: 8 }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 12 }}>
          <p>
            <strong>Language:</strong> {result.language} ({result.language_code})
          </p>
          <p>
            <strong>Intent:</strong> {result.intent}
          </p>
          <p>
            <strong>Translation:</strong> {result.translation}
          </p>
          <p>
            <strong>Suggested reply:</strong> {result.suggestion}
          </p>
          <button type="button" onClick={handleInsert}>
            Insert into reply
          </button>
        </div>
      )}
    </div>
  );
}
