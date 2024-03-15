import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { IoMdInformationCircleOutline } from "react-icons/io";

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

import { useTemplateStore } from "@/stores/zustand/template-store";
import type { TemplateState } from "@/stores/zustand/types";
import type { StateSetterType } from "@/services/types";
import { useGetDictionary } from "@/hooks";

interface InfoDialogProps {
  open: boolean;
  onOpenChange: StateSetterType<boolean>;
  template: TemplateState["currentTemplate"];
}

/**
 * this modal show information about template
 * @param template selected template
 * @param open for open or close modal
 * @param onOpenChange set open or close modal
 */
function InfoDialog({ template, open, onOpenChange }: InfoDialogProps) {
  const { prompt, description, title, inputs, category, icon } = template;
  const {
    page: { template: templateDictionary },
  } = useGetDictionary();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => onOpenChange(true)}>
          <IoMdInformationCircleOutline className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex flex-row items-start gap-3">
            <div className="relative aspect-square h-7 w-7 overflow-hidden rounded">
              <Image
                src={template?.icon ?? ""}
                alt={template?.icon ?? ""}
                fill
                sizes="100%"
                priority
              />
            </div>
            <div>
              <DialogTitle className="text-lg">{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="flex w-full flex-col items-start gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-base font-semibold"> {template.prompt}</span>
            <div className="rounded bg-muted-foreground p-4 text-start text-sm text-muted">
              {prompt}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2">
            {inputs.map(input => (
              <div key={input.id} className="flex justify-start gap-2 text-sm">
                {input.title}: {input.placeHolder}
              </div>
            ))}
          </div>
        </div>
        <DialogFooter className="sm:items-center sm:justify-center">
          <Button
            type="button"
            className="rounded-full sm:w-32"
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
  fav: FaStar,
  notFav: FaRegStar,
} as const;
export function TemplateCard(props: TemplateState["currentTemplate"]) {
  const { icon, favorite, id, description, title, category } = props;
  const [openInfo, setOpenInfo] = useState(false);

  const [open, setOpen] = useState(false);
  const [favTemp, setFavTemp] = useState(favorite);
  const {
    page: { template },
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
      className="col w-full   cursor-pointer gap-8 rounded-[21px]  border bg-background p-4 transition-all duration-300 hover:scale-105 hover:shadow-card-hover data-[fav=true]:border-primary data-[fav=true]:bg-primary-light"
    >
      {/* this is icon of template */}
      <div className="relative aspect-video">
        <Image
          src={icon}
          alt={title}
          fill
          sizes="100%"
          className="rounded-xl"
        />
      </div>
      {/* this is title and category of template and favorite icon and description and action buttons*/}
      <div className="col flex-1 justify-between gap-3">
        <div className="col gap-3">
          {/* this is title and category of template and favorite icon*/}
          <div className="flex justify-between">
            <div className="col">
              <h3 className="text-base font-bold">{title}</h3>
              <p className="text-sm font-bold text-primary">{category}</p>
            </div>
            {/* this is favorite icon and when click on it show a modal*/}
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
                <ButtonIcon className=" h-5 w-5 " color="hsl(var(--primary))" />
              </Button>
            </FavoriteButtonAndDialog>
          </div>

          {/* this is description of template */}
          <p className="line-clamp-2 text-sm font-normal text-muted-foreground">
            {description}
          </p>
        </div>

        {/*info and link Button to templateID*/}
        <div className="flex justify-between ">
          <Link
            href={`/template/${id}`}
            onClick={() => setCurrentTemplate(props)}
          >
            <Button className="h-[2.25rem] w-[7.5rem]">
              {template.use_app}
            </Button>
          </Link>
          {/* this is info icon and when click on it show a modal information*/}
          <InfoDialog
            template={props}
            onOpenChange={setOpenInfo}
            open={openInfo}
          />
        </div>
      </div>
    </div>
  );
}
