"use client";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Loading from "@/components/shared/Loading";

import { useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";

import type { ChildrenProps } from "@/services/types";

interface IProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  triggerBtnLabel: string;
  title: string;
  triggerBtnClass?: string;
  submitBtnLabel?: string;
  submitBtnClass?: string;
  contentClass?: string;
  triggerBtnVariant?:
    | "secondary"
    | "outline"
    | "link"
    | "default"
    | "destructive"
    | "ghost"
    | "muted";
}

/**
 * dialog with title and submit button used in account settings and workspace settings
 * @param title dialog title show in header
 * @param btnLabel trigger button label
 * @param triggerBtnClass trigger button extra classnames
 * @param onSubmit form submit handler
 * @param children dialog content
 * @param submitBtnLabel submit button label
 * @param submitBtnClass submit button extra classnames
 * @param triggerBtnVariant trigger button variant
 * @param contentClass dialog content extra classnames
 * @constructor
 */
export function SettingsDialog({
  title,
  triggerBtnLabel,
  triggerBtnClass,
  onSubmit,
  children,
  submitBtnLabel,
  submitBtnClass,
  triggerBtnVariant = "outline",
  contentClass,
}: ChildrenProps<IProps>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    common: { save_label },
  } = useGetDictionary();

  /**
   * form submit handler
   * add this function to control isSubmitting state
   * @param e form submit event
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(e);
    setIsSubmitting(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={triggerBtnVariant} className={triggerBtnClass}>
          {triggerBtnLabel}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn("col max-h-[100dvh] max-w-sm bg-popover", contentClass)}
      >
        <DialogHeader className="mb-4">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="col w-full gap-2"
          method="POST"
        >
          {children}
          <Button
            type="submit"
            className={cn(
              "relative mt-4 w-full px-10 sm:ml-auto sm:w-fit md:px-5",
              submitBtnClass,
            )}
            disabled={isSubmitting} // disable button when isSubmitting
          >
            {/*
            show loading spinner and hide label when isSubmitting
            */}
            {isSubmitting && (
              <div className="absolute right-1/2 translate-x-1/2">
                <Loading showLabel={false} svgClass="w-5 h-5 z-10" />
              </div>
            )}
            {submitBtnLabel || save_label}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
