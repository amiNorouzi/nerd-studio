"use client"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FavoriteButtonAndDialog } from "@/components/shared";
import { TbStar, TbInfoCircle, TbStarFilled } from "@/components/svg-icons";

import { useTemplateStore } from "@/stores/zustand/template-store";
import { useGetDictionary } from "@/hooks";

import type { StateSetterType, TemplateItem } from "@/services/types";

interface InfoDialogProps {
  open: boolean;
  onOpenChange: StateSetterType<boolean>;
  template: TemplateItem;
}

/**
 * this modal show information about template
 * @param template selected template
 * @param open for open or close modal
 * @param onOpenChange set open or close modal
 */
function InfoDialog({ template, open, onOpenChange }: InfoDialogProps) {
  const {
    page: { template: templateDictionary },
  } = useGetDictionary();
  const inputs = Array.isArray(template.params) ? template.params : [];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="fit p-1"
          onClick={() => onOpenChange(true)}
        >
          <TbInfoCircle className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80dvh] overflow-y-auto sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex flex-row items-start gap-3">
            <Image
              src="/images/gpt.jpeg"
              alt={template.topic}
              width={50}
              height={50}
              priority
              className="h-12 w-12 rounded-lg"
            />
            <div>
              <DialogTitle className="text-lg">{template.topic}</DialogTitle>
              <DialogDescription>{template.task}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="flex w-full flex-col items-start gap-5">
          <div className="flex flex-col gap-2">
            <div className=" rounded-lg  border bg-muted p-4 text-start text-sm text-muted-foreground">
              {template.prompt}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            {inputs.map(input => (
              <div
                key={input.label}
                className="flex justify-start gap-2 text-sm"
              >
                {input.label}: {input.type}
              </div>
            ))}
          </div>
        </div>
        <DialogFooter className="sm:items-center sm:justify-center">
          <Button
            type="button"
            className="rounded-xl sm:w-32"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            {templateDictionary.close}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const startIcon = {
  fav: TbStarFilled,
  notFav: TbStar,
} as const;
export function TemplateCard({
  template,
  category,
}: {
  template: TemplateItem;
  category: string;
}) {
  const [openInfo, setOpenInfo] = useState(false);
  const isFavorite = false;

  const [open, setOpen] = useState(false);
  const [favTemp, setFavTemp] = useState(isFavorite);
  const {
    page: { template: dictionary },
  } = useGetDictionary();

  /**
   * here we select an icon for favorite icon
   */
  const cardIcon = favTemp ? "fav" : "notFav";
  const ButtonIcon = startIcon[cardIcon];

  /**
   * use this function to set selected template in store and use it in selected template page
   */
  const setCurrentTemplate = useTemplateStore.use.setCurrentTemplate();

  return (
    <div
      data-fav={favTemp}
      className="col max-h-52 w-full cursor-pointer gap-2 rounded-[21px]  border bg-background p-3
      transition-all duration-300 hover:scale-105 hover:shadow-card-hover data-[fav=true]:border-primary data-[fav=true]:bg-primary-light "
    >
      <div className="grid w-full grid-cols-7 gap-2">
        <Image
          src="/images/gpt.jpeg"
          alt={template.topic}
          width={80}
          height={80}
          className="col-span-1 h-11 w-11 rounded-xl"
        />
        <div className="col col-span-5 flex-grow">
          <h3 className="w-full overflow-hidden text-ellipsis text-nowrap text-sm">
            {template.topic}
          </h3>
          <p className="text-sm font-bold text-primary">{category}</p>
        </div>

        <div className="col-span-1">
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
              className="text-[#FFAB00] visited:text-[#FFAB00] hover:text-[#FFAB00] focus:text-[#FFAB00] active:text-[#FFAB00]"
            >
              <ButtonIcon className="size-5" />
            </Button>
          </FavoriteButtonAndDialog>
        </div>
      </div>

      {/* this is description of template */}
      <p className="line-clamp-2 font-normal text-muted-foreground sm:mb-1">
        {template.task}
      </p>

      {/*info and link Button to templateID*/}
      <div className="spacing-row">
        <Link
          href={`/template/${template.id}`}
          // onClick={() => setCurrentTemplate(template)}
        >
          <Button size="sm" onClick={() => setCurrentTemplate(template)}>
            {dictionary.use_app}
          </Button>
        </Link>
        {/* this is info icon and when click on it show a modal information*/}
        <InfoDialog
          template={template}
          onOpenChange={setOpenInfo}
          open={openInfo}
        />
      </div>
    </div>
  );
}
