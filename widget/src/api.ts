import type { ProcessResponse, WidgetConfig } from "./types";

export async function sendMessage(
  config: WidgetConfig,
  sessionId: string,
  text: string,
): Promise<ProcessResponse> {
  const res = await fetch(`${config.apiUrl}/v1/process`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.publishableKey}`,
    },
    body: JSON.stringify({
      text,
      channel: "widget",
      session_id: sessionId,
    }),
  });

  if (!res.ok) {
    throw new Error(`Rezolyn widget: request failed (${res.status})`);
  }
  return res.json();
}
