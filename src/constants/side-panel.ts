import { PiChartBarLight, PiPencilLineLight } from "react-icons/pi";
import { ImInsertTemplate } from "react-icons/im";
import { ReWriteIcon } from "@/components/svg-icons";
import { IoCodeSlashOutline } from "react-icons/io5";

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
  {
    id: "5",
    i18Key: "",
    title: "Code",
    route: "/code",
    icon: IoCodeSlashOutline,
  },
] as const;
