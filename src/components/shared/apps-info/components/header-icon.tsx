"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { apps } from "@/constants/side-panel";

export function HeaderIcon() {
  const pathName = usePathname().split("/").pop() ?? "";

  const Icon =
    apps.find(item => item.route.includes(pathName))?.Icon ?? apps[1].Icon;

  const appsIcon =
    typeof Icon === "string" ? (
      <Image src={Icon} alt={"apps icon "} height={100} width={100} />
    ) : (
      <Icon size={100} />
    );

  return <span className="rounded-md">{appsIcon}</span>;
}
