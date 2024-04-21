import {
  AppleBrand,
  ChromeBrand,
  DiscordBrand,
  FireFoxBrand,
} from "@/components/svg-icons/brandsHero";
import {
  TbCamera,
  TbLanguage,
  TbMessages,
  TbWriting,
  TbMusic,
  TbCode,
} from "react-icons/tb";
import { IconType } from "react-icons";

export const rewards = [
  {
    title: "Lorem Ipsum",
    sub: "+200K Lorem",
    img: "medal.png",
    id: "sdsdc121v",
  },
  {
    title: "Lorem Ipsum",
    sub: "+200K Lorem",
    img: "notify-heart.png",
    id: "sd79sdcv",
  },
  {
    title: "Lorem Ipsum",
    sub: "+200K Lorem",
    img: "premium.png",
    id: "sds1451dcv",
  },
];

export const steps = [
  {
    img: "step1.svg",
    title: "Easy Sign up",
    sub: "Empower your songwriting skills and create masterpieces with Write a Song.",
    id: "sdv61b",
    number: "NumberStepOne.svg",
  },
  {
    img: "step2.svg",
    title: "Add Extension",
    sub: "Empower your songwriting skills and create masterpieces with Write a Song.",
    id: "s8dvb",
    number: "NumberStepTow.svg",
  },
  {
    img: "step3.svg",
    title: "Enjoy Nerd Studio",
    sub: "Empower your songwriting skills and create masterpieces with Write a Song.",
    id: "sdv156b",
    number: "NumberStepThree.svg",
  },
];

export const starsArray = [1, 2, 3, 4, 5];

export const brandsArray = [
  AppleBrand,
  ChromeBrand,
  DiscordBrand,
  FireFoxBrand,
];

interface BtnFeature {
  name: string;
  id: string;
  icon: IconType;
}

export const btnFeature: BtnFeature[] = [
  {
    name: "Rewrite",
    id: "21asr;g",
    icon: TbWriting,
  },
  {
    name: "Translate",
    id: "494srg",
    icon: TbLanguage,
  },
  {
    name: "Chat",
    id: "156as;dv",
    icon: TbMessages,
  },
  {
    name: "Image",
    id: "sv;av1697",
    icon: TbCamera,
  },
  {
    name: "Audio",
    id: "41sdv;b56",
    icon: TbMusic,
  },
  {
    name: "Code",
    id: "89cd;kb56",
    icon: TbCode,
  },
];

export const openAiLogo = [
  {
    nameAI: "DALL·E",
    image: "openAl.png",
    id: "chs;as+vc40c56",
  },
  {
    nameAI: "PaLM",
    image: "image2.png",
    id: "chs;c4FMKc-56",
  },
  {
    nameAI: "Gemini",
    image: "gemini.png",
    id: "chWAZAa6r;56",
  },
  {
    nameAI: "GPT-3.5 & GPT-4",
    image: "chatGpt.png",
    id: "ch#grc56",
  },
  {
    nameAI: "Stable Diffusion",
    image: "image1.png",
    id: "ch4d5h56",
  },
  {
    nameAI: "PaLM",
    image: "image2.png",
    id: "chs;c4c-56",
  },
  {
    nameAI: "Gemini",
    image: "gemini.png",
    id: "chs;c;56",
  },
  {
    nameAI: "GPT-3.5 & GPT-4",
    image: "chatGpt.png",
    id: "ch#grQZOc56",
  },
  {
    nameAI: "GPT-3.5 & GPT-4",
    image: "chatGpt.png",
    id: "ch#asv6==grc56",
  },
  {
    nameAI: "Stable Diffusion",
    image: "image1.png",
    id: "chs;c4XM.c!56",
  },
  {
    nameAI: "Gemini",
    image: "gemini.png",
    id: "chDasv46SV;56",
  },
  {
    nameAI: "GPT-3.5 & GPT-4",
    image: "chatGpt.png",
    id: "ch#grZAW66f",
  },
  {
    nameAI: "GPT-3.5 & GPT-4",
    image: "chatGpt.png",
    id: "ch#gevqePPbqerc56",
  },
  {
    nameAI: "Stable Diffusion",
    image: "image1.png",
    id: "chs;c4avtc!56",
  },
];

export const ServiceSection = [
  {
    name: "Website",
    name2: "Apps",
    image: "service-3.svg",
    id: "1",
  },
  {
    name: "Apps",
    name2: "Mobile",
    image: "service-2.svg",
    id: "2",
  },
  {
    name: "Extension",
    image: "service-1.svg",
    id: "3",
  },
];
