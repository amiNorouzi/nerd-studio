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
    i18Key: "account_panel_label",
  },
  {
    id: "12",
    icon: IoCubeOutline,
    key: "connections",
    title: "Connections",
    i18Key: "connections_panel_label",
  },
  {
    id: "13",
    icon: GrUpgrade,
    key: "upgrade",
    title: "Upgrade",
    i18Key: "upgrade_panel_label",
  },
  {
    id: "14",
    icon: IoGiftOutline,
    key: "referral",
    title: "Referral & Rewards",
    i18Key: "referral_panel_label",
  },
];

export const generalSettingsItems = [
  {
    id: "21",
    icon: LuShirt,
    key: "appearance",
    title: "Appearance",
    i18Key: "appearance_panel_label",
  },
  {
    id: "22",
    icon: GrLanguage,
    key: "language",
    title: "Language",
    i18Key: "language_panel_label",
  },
  {
    id: "23",
    icon: GoInfo,
    key: "about",
    title: "About",
    i18Key: "about_panel_label",
  },
];
