// Minimal typing for the Freshworks Crayons/FDK client SDK, loaded globally
// via app.js in index.html — no official @types package exists.
declare global {
  interface FreshworksInvokeTemplateOptions {
    body?: string;
    context?: Record<string, unknown>;
  }

  interface FreshworksInvokeTemplateResponse<T> {
    response: string;
    // Freshworks returns the raw response body as a JSON string in `response`;
    // callers parse it. Kept as unknown here so App.tsx does the parsing.
    status: number;
  }

  interface FreshworksClient {
    data: {
      get<T = unknown>(key: string): Promise<T>;
    };
    request: {
      invokeTemplate<T = unknown>(
        templateName: string,
        options: FreshworksInvokeTemplateOptions,
      ): Promise<FreshworksInvokeTemplateResponse<T>>;
    };
    instance: {
      resize(options: { height: string }): Promise<void>;
    };
  }

  interface FreshworksApp {
    initialized(): Promise<FreshworksClient>;
  }

  interface Window {
    app: FreshworksApp;
  }
}

export {};
