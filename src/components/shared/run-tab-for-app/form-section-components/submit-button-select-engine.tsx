"use client";
import { Button } from "@/components/ui/button";
import { SelectEngine } from "@/components/shared";
import RenderIf from "@/components/shared/RenderIf";
import Loading from "@/components/shared/Loading";
import React from "react";

interface IProps {
  buttonContent: string;
  isPending: boolean;
  isDisabledSubmit: boolean;
  onClick(): void;
}

export function SubmitButtonSelectEngine({
  buttonContent,
  onClick,
  isPending,
  isDisabledSubmit,
}: IProps) {
  return (
    <div className="sticky bottom-0 mt-auto grid grid-cols-1 items-end gap-5 sm:grid-cols-2">
      {/*show engine select box*/}
      <SelectEngine />
      {/*submit button*/}
      <Button
        className="row w-full"
        onClick={onClick}
        disabled={isPending || isDisabledSubmit}
      >
        <RenderIf isTrue={isPending}>
          <Loading
            rootClass="-ms-1 me-1"
            svgClass="w-6 h-6 !stroke-primary-foreground"
          />
        </RenderIf>
        {buttonContent}
      </Button>
    </div>
  );
}
