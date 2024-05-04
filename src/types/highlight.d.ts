interface Highlight {
  prompts: string[];
  messages: HighlightMessage;
  image: string;
  timeLine: string;
  name: string;
  role: string;
}

interface HighlightMessage {
  facebook: string[];
  youtube: string[];
  linkedin: string[];
  telegram: string[];
  whatsapp: string[];
  instagram: string[];
  tiktok: string[];
  meta: string[];
  summary: string[];
}

type HighlightType =
  | "facebook"
  | "youtube"
  | "linkedin"
  | "telegram"
  | "whatsapp"
  | "instagram"
  | "tiktok"
  | "meta"
  | "summary";

interface HighlightAction {
  setSelectedMessageForHighlight(v: string): void;

  setGeneratedHighlight(index: number, v: Partial<HighlightMessage>): void;

  setHighlightIsOpen(isOpen: boolean): void;
}

interface HighlightState extends Highlight {
  isHighlightOpen: boolean;
}
