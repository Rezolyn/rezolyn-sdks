// Minimal typing for the Zendesk App Framework SDK, loaded globally via
// zaf_sdk.min.js in index.html — no official @types package exists.
declare global {
  type ZAFRequestOptions = {
    url: string;
    type?: "GET" | "POST" | "PUT" | "DELETE";
    contentType?: string;
    headers?: Record<string, string>;
    data?: string;
    secure?: boolean;
  };

  interface ZAFClient {
    request<T = unknown>(options: ZAFRequestOptions): Promise<T>;
    get<T = unknown>(path: string): Promise<T>;
    set(path: string, value: unknown): Promise<void>;
    invoke(method: string, ...args: unknown[]): Promise<unknown>;
    metadata(): Promise<{ settings: Record<string, unknown> }>;
  }

  interface Window {
    ZAFClient: { init(): ZAFClient };
  }
}

export {};
