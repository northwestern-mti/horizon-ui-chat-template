export type OpenAIModel = 'gpt-3.5-turbo' | 'gpt-4';

export interface ChatBody {
  inputCode: string;
  model: OpenAIModel;
  apiKey?: string | undefined;
}


export interface ChatMessage {
  speaker: Character;
  message: string;
}


export type ColorPalette = Record<string, string>;


export interface Character {
  name:      string;
  name_full: string;
}

export function Character(obj: Character | string): Character {
  if (typeof obj === 'string') {
    return {
      name:      obj,
      name_full: obj,
    }
  }
  return obj;
}



export interface DialogueToken {
  type:    "DialogueMarker" | "DialogueInstance"
  speaker: Character
  message: string
}

export interface DialogueMarker extends DialogueToken {
  type:    "DialogueMarker"
  message: ""
}

export interface DialogueInstance extends DialogueToken {
  type:    "DialogueInstance"
  message: string,
}
