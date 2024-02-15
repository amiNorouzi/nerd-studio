import { MdOutlineManageAccounts } from "react-icons/md";
import { IoCubeOutline, IoGiftOutline } from "react-icons/io5";
import { GrLanguage, GrUpgrade } from "react-icons/gr";
import { LuShirt } from "react-icons/lu";
import { GoInfo } from "react-icons/go";

export const accountSettingsItems = [
  {
    id: "11",
    icon: MdOutlineManageAccounts,
    key: "account",
    title: "Account Settings",
  },
  {
    id: "12",
    icon: IoCubeOutline,
    key: "connections",
    title: "Connections",
  },
  {
    id: "13",
    icon: GrUpgrade,
    key: "upgrade",
    title: "Upgrade",
  },
  {
    id: "14",
    icon: IoGiftOutline,
    key: "referral",
    title: "Referral & Rewards",
  },
];

export const generalSettingsItems = [
  {
    id: "21",
    icon: LuShirt,
    key: "appearance",
    title: "Appearance",
  },
  {
    id: "22",
    icon: GrLanguage,
    key: "language",
    title: "Language",
  },
  {
    id: "23",
    icon: GoInfo,
    key: "about",
    title: "About",
  },
];
