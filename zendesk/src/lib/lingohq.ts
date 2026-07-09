import type { ProcessResponse } from "../../../shared/process-types";

/**
 * Calls LingoHQ through ZAF's client.request({secure: true}) — never raw
 * fetch(). secure:true makes ZAF inject the api_key secure parameter
 * server-side; the key never appears in this iframe's network requests.
 */
export async function processMessage(
  client: ZAFClient,
  settings: { api_url?: string },
  text: string,
  sessionId: string,
): Promise<ProcessResponse> {
  const apiUrl = settings.api_url || "https://api.lingohq.io";
  return client.request<ProcessResponse>({
    url: `${apiUrl}/v1/process`,
    type: "POST",
    contentType: "application/json",
    // {{setting.api_key}} is substituted server-side by ZAF from the secure
    // "api_key" manifest parameter — the real value never reaches this iframe.
    headers: { Authorization: "Bearer {{setting.api_key}}" },
    data: JSON.stringify({ text, channel: "zendesk", session_id: sessionId }),
    secure: true,
  });
}
