import type { ProcessResponse } from "../../../shared/process-types";

/**
 * Calls Rezolyn through the FDK's request.invokeTemplate — never raw
 * fetch(). The "processMessage" template (requests.json) has the
 * Authorization header pre-filled with the secure `api_key` iparam server
 * side; the real key never reaches this iframe's JS.
 */
export async function processMessage(
  client: FreshworksClient,
  text: string,
  sessionId: string,
): Promise<ProcessResponse> {
  const { response } = await client.request.invokeTemplate("processMessage", {
    body: JSON.stringify({ text, channel: "freshdesk", session_id: sessionId }),
  });
  return JSON.parse(response) as ProcessResponse;
}
