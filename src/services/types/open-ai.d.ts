interface OpenAiCompletionSchemaInput {
  model: "gpt-3.5-turbo-0125";
  messages: OpenAiMessage[];
  temperature: number;
  max_tokens: number;
  stream: boolean;
  top_p?: number;
}

interface OpenAiMessage {
  role: "user";
  content: string;
}
