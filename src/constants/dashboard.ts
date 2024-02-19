import { HiOutlineDocumentText } from "react-icons/hi";
import { LiaFileWordSolid } from "react-icons/lia";
import { PiImageSquare, PiMusicNotes } from "react-icons/pi";
import { HiOutlineCodeBracketSquare } from "react-icons/hi2";
import { RiVoiceprintLine } from "react-icons/ri";

export const heroGeneratesList = [
  {
    id: "1",
    icon: HiOutlineDocumentText,
    titleKey: "hero_documents_created",
    unitKey: "contents",
    value: 0,
  },
  {
    id: "2",
    icon: LiaFileWordSolid,
    titleKey: "hero_words_generated",
    unitKey: "words",
    value: 0,
  },
  {
    id: "3",
    icon: PiImageSquare,
    titleKey: "hero_images_created",
    unitKey: "images",
    value: 0,
  },
  {
    id: "4",
    icon: HiOutlineCodeBracketSquare,
    titleKey: "hero_codes_generated",
    unitKey: "codes",
    value: 0,
  },
  {
    id: "5",
    icon: RiVoiceprintLine,
    titleKey: "hero_voiceover_tasks",
    unitKey: "tasks",
    value: 0,
  },
  {
    id: "6",
    icon: PiMusicNotes,
    titleKey: "hero_audio_transcribed",
    unitKey: "audio_files",
    value: 0,
  },
];
