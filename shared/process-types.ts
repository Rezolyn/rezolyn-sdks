// Shared between zendesk/ and freshdesk/ — both call the same
// POST /v1/process endpoint on rezolyn-platform. See app/schemas/process.py.
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
