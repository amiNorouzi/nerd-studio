"use client";
import React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";

import { socialMedias } from "@/constants/social-medias";
import { useLocation } from "@/hooks/useLocation";
import { cn } from "@/lib/utils";

type IProps = React.ComponentPropsWithoutRef<"div">;

const shareButtonComponent = {
  facebook: FacebookShareButton,
  linkedin: LinkedinShareButton,
  telegram: TelegramShareButton,
  whatsapp: WhatsappShareButton,
} as const;

/**
 * SocialMedias component
 * list of social media for share app
 * @param className extra class for root div
 * @param otherProps other props for root div
 * @constructor
 */
export function SocialMedias({ className, ...otherProps }: IProps) {
  const location = useLocation();
  return (
    <div className={cn("row gap-2", className)} {...otherProps}>
      {socialMedias.map(({ name, Icon }) => {
        const ShareComponent = shareButtonComponent[name];

        return (
          <ShareComponent key={name} url={location?.href ?? ""}>
            <div className="group cursor-pointer rounded-full border p-2 transition-all duration-200 hover:border-primary hover:text-active">
              <Icon className="h-5 w-5 fill-foreground/70 transition-all duration-200 group-hover:fill-primary/70" />
            </div>
          </ShareComponent>
        );
      })}
    </div>
  );
}
