"use client";
import { ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { useGetDictionary } from "@/hooks";

interface IProps {
  Trigger?: ReactNode;
  title: string;
  description?: string;
  handleSubmit: () => void;
}

/**
 * use for alert user is sure when want to delete anything
 * @param title dialog title
 * @param description message
 * @param Trigger
 * @param handleSubmit for when press delete
 * @constructor
 */
export function DeleteAlertDialog({
  title,
  description,
  Trigger,
  handleSubmit,
}: IProps) {
  const { delete_alert_button_label } = useGetDictionary().components.shared;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {Trigger ? (
          Trigger
        ) : (
          <Button
            variant="outline"
            className="text-destructive hover:border-destructive hover:text-destructive"
          >
            {delete_alert_button_label}
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleSubmit}>
            {delete_alert_button_label}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
