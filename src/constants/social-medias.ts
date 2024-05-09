import {
  TbBrandInstagram,
  TbBrandTelegram,
  TbBrandLinkedin,
  TbBrandWhatsapp,
  TbBrandFacebook,
} from "react-icons/tb";

export const socialMedias = [
  // {
  //   name: "instagram",
  //   Icon: Instagram,
  // },
  {
    name: "facebook",
    Icon: TbBrandFacebook,
  },
  {
    name: "linkedin",
    Icon: TbBrandLinkedin,
  },
  {
    name: "telegram",
    Icon: TbBrandTelegram,
  },
  {
    name: "whatsapp",
    Icon: TbBrandWhatsapp,
  },
] as const;
