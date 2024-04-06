"use client";
import { useState } from "react";
import {
  OptionsSelectBoxes,
  SubmitButtonSelectEngine,
  TextBox,
  Upload,
} from "./form-section-components";
import RenderIf from "@/components/shared/RenderIf";
import { Button } from "@/components/ui/button";
import {
  DescriptionHoverCard,
  FavoriteButtonAndDialog,
  RenderImageOrIcon,
} from "@/components/shared";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { apps } from "@/constants/side-panel";
import type { ParamsType, TemplateItem } from "@/services/types";
import { usePDFConvertor } from "@/services/translate";
import { iconVariants } from "@/constants/variants";
import FormWrapper from "@/components/shared/run-tab-for-app/form-wrapper";

interface IProps {
  params: ParamsType;
  template?: TemplateItem;
  buttonContent: string;
  mainTextAreaPlaceholder: string;
  onTextAreaChange(value: string): void;
  value: string;

  onSubmit(): void;
}

const startIcon = {
  fav: FaStar,
  notFav: FaRegStar,
} as const;

/**
 * form section for Rewrite and template
 * @param template
 * @param buttonContent
 * @param mainTextAreaPlaceholder
 * @constructor
 */
export default function FormSection({
  template,
  buttonContent,
  mainTextAreaPlaceholder,
  onTextAreaChange,
  onSubmit,
  value,
}: IProps) {
  /** these states used when user select a template
   * these states are for favorite icon and open modal to show message for add or remove from favorites
   * */
  const [favTemp, setFavTemp] = useState(false);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState<string>("");
  const pathname = usePathname();

  // get app name from url
  const searchParams = useSearchParams();
  const appName = searchParams.get("app");
  const app = apps.find(
    app => app.title.toLowerCase() === appName?.toLowerCase(),
  );

  const { mutateAsync: covertPDF } = usePDFConvertor();
  const covertToText = async (files: File[]) => {
    const text = await covertPDF(files[0]);
    onTextAreaChange(text);
  };

  const onSelectFiles = (files: File[]) => {
    setFiles(files);
    covertToText(files);
  };
  // const icon = template?.icon ?? app?.icon;
  const icon = "/images/gpt.jpeg";

  // here we select favorite icon if we select a template
  const cardIcon = favTemp ? "fav" : "notFav";
  const ButtonIcon = startIcon[cardIcon];

  return (
    <FormWrapper>
      <RenderIf isTrue={!!template}>
        <div className="flex w-full justify-between gap-2">
          <div className="flex w-full items-center justify-start gap-2">
            {icon && <RenderImageOrIcon icon={icon} />}
            <h3 className="max-w-full text-ellipsis text-nowrap">
              {template?.topic}
            </h3>
            <DescriptionHoverCard description={template?.task || ""} />
          </div>

          {/*this is for when use select a template that show icon title and fav icon in form section*/}
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
                className={iconVariants({ size: "md" })}
                color="hsl(var(--primary))"
              />
            </Button>
          </FavoriteButtonAndDialog>
        </div>
      </RenderIf>
      {/*<p*/}
      {/*  className={cn("text-xsm text-muted-foreground", !template && "hidden")}*/}
      {/*>*/}
      {/*  {template?.task}*/}
      {/*</p>*/}

      <TextBox
        template={template}
        mainTextAreaPlaceholder={mainTextAreaPlaceholder}
        onChange={onTextAreaChange}
        value={value}
        onChange={onTextAreaChange}
      />
      <RenderIf isTrue={!pathname.includes("template")}>
        <Upload
          setFiles={onSelectFiles}
          setUserUrl={setUrl}
          files={files}
          userUrl={url}
        />
      </RenderIf>
      <OptionsSelectBoxes />
      <SubmitButtonSelectEngine
        onClick={onSubmit}
        buttonContent={buttonContent}
      />
    </FormWrapper>
  );
}
