export type WidgetConfig = {
  publishableKey: string;
  projectId: string;
  apiUrl: string;
};

export type ProcessResponse = {
  language: string;
  language_code: string;
  confidence: number;
  translation: string;
  intent: string;
  intent_confidence: number;
  entities: Record<string, unknown>;
  suggestion: string;
  suggestion_source: string;
  deflectable: boolean;
  deflection_requires: string[];
};

export type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};
