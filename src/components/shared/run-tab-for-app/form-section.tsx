"use client";
import {
  SelectBoxes,
  SelectResponseLang,
  SubmitButton,
  TextBox,
} from "./form-section-components";
import type { ParamsType } from "@/services/types";
import { TemplateState } from "@/stores/zustand/types";
import { useGetDictionary } from "@/hooks";
import RenderIf from "@/components/shared/RenderIf";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FavoriteButtonAndDialog } from "@/components/shared";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";

interface IProps {
  params: ParamsType;
  template?: TemplateState["currentTemplate"];
}

const startIcon = {
  fav: FaStar,
  notFav: FaRegStar,
} as const;

export function FormSection({ template }: IProps) {
  /** these states used when user select a template
   * these states are for favorite icon and open modal to show message for add or remove from favorites
   * */
  const [favTemp, setFavTemp] = useState(template?.favorite ?? false);
  const [open, setOpen] = useState(false);
  const {
    page: { writing },
  } = useGetDictionary();

  // here we select favorite icon if we select a template
  const cardIcon = favTemp ? "fav" : "notFav";
  const ButtonIcon = startIcon[cardIcon];
  return (
    <div className="col-span-12 flex h-fit flex-col gap-5 overflow-y-auto bg-card p-4  lg:col-span-6 lg:h-full  lg:max-h-full xl:col-span-4">
      {/*this is for when use select a template that show icon title and fav icon in form section*/}
      <RenderIf isTrue={!!template}>
        <div className="flex justify-between">
          <div className="flex items-center justify-start gap-3">
            <div className="relative aspect-square h-7 w-7 overflow-hidden rounded">
              <Image
                src={template?.icon ?? ""}
                alt={template?.icon ?? ""}
                fill
                sizes="100%"
              />
            </div>
            <h3 className="text-base font-semibold">{template?.title}</h3>
          </div>

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
        </div>
      </RenderIf>
      <p className="text-xsm text-muted-foreground">
        {template ? template.description : writing.form_description}
      </p>
      <TextBox template={template} />
      <SelectBoxes />
      <SubmitButton />
    </div>
  );
}
