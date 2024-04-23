import { AppsIcons } from "@/components/svg-icons";
import {
  TbBooks,
  TbCamera,
  TbCode,
  TbLanguage,
  TbLayoutDashboard,
  TbMessages,
  TbWriting,
  TbPdf,
} from "react-icons/tb";

export const apps = [
  {
    id: "1",
    i18Key: "",
    title: "Dashboard",
    route: "/dashboard",
    icon: TbLayoutDashboard,
  },
  {
    id: "2",
    i18Key: "",
    title: "Chat",
    route: "/chat",
    icon: TbMessages,
  },
  {
    id: "3",
    i18Key: "",
    title: "Images",
    route: "/image",
    icon: TbCamera,
  },
  {
    id: "4",
    i18Key: "",
    title: "ReWrite",
    route: "/ReWrite",
    icon: TbWriting,
  },
  {
    id: "5",
    i18Key: "",
    title: "Prompt Library",
    route: "/template",
    icon: TbBooks,
  },
  {
    id: "6",
    i18Key: "",
    title: "Code",
    route: "/code",
    icon: TbCode,
  },
  {
    id: "7",
    i18Key: "",
    title: "Translate",
    route: "/translate",
    icon: TbLanguage,
  },
  {
    id: "8",
    i18Key: "",
    title: "Grammar",
    route: "/grammar",
    icon: AppsIcons.GrammarIcon,
  },
  {
    id: "8",
    i18Key: "",
    title: "ChatPdf",
    route: "/chatpdf",
    icon: TbPdf,
  },
] as const;
