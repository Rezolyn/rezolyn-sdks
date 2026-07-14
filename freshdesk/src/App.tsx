import { useCallback, useRef, useState } from "react";
import { processMessage } from "./lib/rezolyn";

type Status = "idle" | "loading" | "error";

export function App({ client }: { client: FreshworksClient }) {
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<Awaited<ReturnType<typeof processMessage>> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sessionId = useRef(crypto.randomUUID());

  const handleTranslate = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      // Standard FDK ticket_sidebar data path; verify against Freshworks'
      // current ticket data contract before shipping.
      const ticket = await client.data.get<{ ticket: { description_text: string } }>("ticket");
      const text = ticket.ticket.description_text;
      const response = await processMessage(client, text, sessionId.current);
      setResult(response);
      setStatus("idle");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }, [client]);

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
        </div>
      )}
    </div>
  );
}
