export type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-4';

export interface ChatBody {
  inputCode: string;
  model: OpenAIModel;
  apiKey?: string | undefined;
}


export interface ChatMessage {
  name: string;
  text: string;
}


export type ColorPalette = Record<string, string>;
