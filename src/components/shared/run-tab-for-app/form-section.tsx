"use client";
import { useState } from "react";
import {
  OptionsSelectBoxes,
  SubmitButtonSelectEngine,
  TextBox,
} from "./form-section-components";
import RenderIf from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";
import {
  FavoriteButtonAndDialog,
  RenderImageOrIcon,
} from "@/components/shared";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { apps } from "@/constants/side-panel";
import type { ParamsType } from "@/services/types";
import type { TemplateState } from "@/stores/zustand/types";

interface IProps {
  params: ParamsType;
  template?: TemplateState["currentTemplate"];
  buttonContent: string;
  mainTextAreaPlaceholder: string;
}

const startIcon = {
  fav: FaStar,
  notFav: FaRegStar,
} as const;

export function FormSection({
  template,
  buttonContent,
  mainTextAreaPlaceholder,
}: IProps) {
  /** these states used when user select a template
   * these states are for favorite icon and open modal to show message for add or remove from favorites
   * */
  const [favTemp, setFavTemp] = useState(template?.favorite ?? false);
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const appName = searchParams.get("app");
  const app = apps.find(
    app => app.title.toLowerCase() === appName?.toLowerCase(),
  );

  const icon = template?.icon ?? app?.icon;

  // here we select favorite icon if we select a template
  const cardIcon = favTemp ? "fav" : "notFav";
  const ButtonIcon = startIcon[cardIcon];
  return (
    <div className="col-span-12 flex h-fit flex-col gap-9 overflow-y-auto bg-background p-4 lg:col-span-6 lg:h-full  lg:max-h-full xl:col-span-4">
      <div className="flex justify-between">
        <div className="flex items-center justify-start gap-3">
          {icon && <RenderImageOrIcon icon={icon} />}
          <h3 className="text-base font-semibold">
            {template?.title ?? app?.title}
          </h3>
        </div>

        {/*this is for when use select a template that show icon title and fav icon in form section*/}
        <RenderIf isTrue={!!template}>
          <FavoriteButtonAndDialog
            open={open}
            setOpen={setOpen}
            favorite={favTemp}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setFavTemp(!favTemp);
                setOpen(true);
              }}
            >
              <ButtonIcon
                className="bg- h-5 w-5 "
                color="hsl(var(--primary))"
              />
            </Button>
          </FavoriteButtonAndDialog>
        </RenderIf>
      </div>
      <p
        className={cn("text-xsm text-muted-foreground", !template && "hidden")}
      >
        {template?.description}
      </p>
      <TextBox
        template={template}
        mainTextAreaPlaceholder={mainTextAreaPlaceholder}
      />
      <OptionsSelectBoxes />
      <SubmitButtonSelectEngine buttonContent={buttonContent} />
    </div>
  );
}
