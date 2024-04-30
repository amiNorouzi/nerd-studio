interface OpenAiCompletionSchemaInput {
  model: "gpt-3.5-turbo-0125";
  messages: OpenAiMessage[];
  temperature: number;
  max_tokens: number;
  stream: boolean;
  top_p?: number;
  frequency_penalty: number;
  presence_penalty: number;
  document_name: string;
  workspace_id: number;
}

interface OpenAiMessage {
  role: "user" | "system";
  content: string;
}
