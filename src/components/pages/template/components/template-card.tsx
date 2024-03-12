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
            Close
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
      className="relative  w-full cursor-pointer rounded-md  border bg-background p-4 transition-all duration-300 hover:scale-105 hover:shadow-card-hover data-[fav=true]:border-primary data-[fav=true]:bg-active"
    >
      {/* this is favorite icon and when click on it show a modal*/}
      <div className="absolute end-6 top-3 z-50">
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

      {/* this is card content that when click on it navigate to selected template*/}
      <Link href={`/template/${id}`} onClick={() => setCurrentTemplate(props)}>
        <div className="col gap-4">
          <div className="spacing-row">
            <Image
              src={icon}
              alt={title}
              width={80}
              height={80}
              className="h-10 w-10 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold">{title}</h3>
            <p className="me-8 line-clamp-2 font-normal text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </Link>

      {/* this is info icon and when click on it show a modal information*/}
      <div className="absolute bottom-3 end-6 z-50">
        <InfoDialog
          template={props}
          onOpenChange={setOpenInfo}
          open={openInfo}
        />
      </div>
    </div>
  );
}
