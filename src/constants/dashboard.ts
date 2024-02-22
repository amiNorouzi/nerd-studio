import { IoDocumentText } from "react-icons/io5";
import {
  FaFileCode,
  FaFileImage,
  FaFileInvoice,
  FaFileWord,
  FaFileAudio,
} from "react-icons/fa6";

export const heroGeneratesList = [
  {
    id: "1",
    icon: IoDocumentText,
    titleKey: "hero_documents_created",
    unitKey: "contents",
    value: 0,
  },
  {
    id: "2",
    icon: FaFileWord,
    titleKey: "hero_words_generated",
    unitKey: "words",
    value: 0,
  },
  {
    id: "3",
    icon: FaFileImage,
    titleKey: "hero_images_created",
    unitKey: "images",
    value: 0,
  },
  {
    id: "4",
    icon: FaFileCode,
    titleKey: "hero_codes_generated",
    unitKey: "codes",
    value: 0,
  },
  {
    id: "5",
    icon: FaFileInvoice,
    titleKey: "hero_voiceover_tasks",
    unitKey: "tasks",
    value: 0,
  },
  {
    id: "6",
    icon: FaFileAudio,
    titleKey: "hero_audio_transcribed",
    unitKey: "audio_files",
    value: 0,
  },
] as const;

export const heroLeftCountsList = [
  {
    id: "1",
    titleKey: "hero_words_left",
    value: 0,
  },
  {
    id: "2",
    titleKey: "hero_images_left",
    value: 0,
  },
  {
    id: "3",
    titleKey: "hero_characters_left",
    value: 0,
  },
  {
    id: "4",
    titleKey: "hero_minutes_left",
    value: 0,
  },
] as const;
