import { PiChartBarLight, PiPencilLineLight } from "react-icons/pi";
import { ImInsertTemplate } from "react-icons/im";
import { ReWriteIcon } from "@/components/svg-icons";

export const apps = [
  {
    id: "1",
    i18Key: "",
    title: "Dashboard",
    route: "/",
    icon: PiChartBarLight,
  },
  {
    id: "2",
    i18Key: "",
    title: "Chat",
    route: "/chat",
    icon: "/images/gpt.jpeg",
  },
  {
    id: "3",
    i18Key: "",
    title: "Images",
    route: "/image",
    icon: "/images/artist.png",
  },
  {
    id: "4",
    i18Key: "",
    title: "ReWrite",
    route: "/ReWrite",
    icon: ReWriteIcon,
  },
  {
    id: "5",
    i18Key: "",
    title: "Template",
    route: "/template",
    icon: ImInsertTemplate,
  },
] as const;
