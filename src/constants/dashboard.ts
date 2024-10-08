import { LuFileBarChart2 } from "react-icons/lu";
import {
  TbCamera,
  TbCode,
  TbMicrophone,
  TbMusic,
  TbWriting,
} from "react-icons/tb";

export const docs = [
  {
    id: "1",
    Icon: LuFileBarChart2,
    iconBackground: "#FFF2E9",
    color:'#FF6A00',
    titleKey: "documents_title",
    subtitleKey: "documents_subtitle",
    unitKey: "contents",
    generatedCount: 0,
  },
  {
    id: "2",
    Icon: TbWriting,
    iconBackground: "#F3F0FF",
    color:'#551FFF',
    titleKey: "words_title",
    subtitleKey: "words_subtitle",
    unitKey: "words",
    generatedCount: 0,
  },
  {
    id: "3",
    Icon: TbCamera,
    iconBackground: "#EFF9FE",
    color:'#00B7FE',
    titleKey: "images_title",
    subtitleKey: "images_subtitle",
    unitKey: "images",
    generatedCount: 0,
  },
  {
    id: "4",
    Icon: TbCode,
    iconBackground: "#FFF2F5",
    color:'#FD2254',
    titleKey: "codes_title",
    subtitleKey: "codes_subtitle",
    unitKey: "codes",
    generatedCount: 0,
  },
  {
    id: "5",
    Icon: TbMicrophone,
    iconBackground: "#F4FFE9",
    color:'#04C900',
    titleKey: "voiceover_title",
    subtitleKey: "voiceover_subtitle",
    unitKey: "tasks",
    generatedCount: 0,
  },
  {
    id: "6",
    Icon: TbMusic,
    iconBackground: "#F2EEFD",
    color:'#D122FD',
    titleKey: "audio_title",
    subtitleKey: "audio_subtitle",
    unitKey: "audio_files",
    generatedCount: 0,
  },
] as const;
