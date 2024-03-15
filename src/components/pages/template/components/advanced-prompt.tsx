"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  TbCheck,
  TbChevronsRight,
  TbChevronsLeft,
  TbSearch,
} from "@/components/svg-icons";
import { ListOfChildCategoryItems } from "./list-of-child-category";
import { ListOfContentTopic } from "./list-of-content-topic";
import RenderIf from "@/components/shared/RenderIf";

import { useCustomSearchParams, useGetDictionary } from "@/hooks";
import { cn } from "@/lib/utils";
import type { StateSetterType } from "@/services/types";

interface StepBoxProps {
  step: number;
  completed: boolean;
  title: string;
}
function StepBox({ step, completed, title }: StepBoxProps) {
  return (
    <div className="col items-center justify-center gap-[21px]">
      <div
        className={cn(
          "bg-linearGradient flex h-14 w-14 items-center justify-center rounded-lg p-2",
          completed && "bg-[#ECFDF3]",
        )}
      >
        <div
          className="flex items-center justify-center rounded-full  bg-white p-1 text-center  text-xl font-bold"
          style={{ color: "bg-linearGradient" }}
        >
          {completed ? (
            <TbCheck className="h-6 w-6 text-[#027A48]  opacity-100" />
          ) : (
            <span className="gradient-text h-6 w-6">{step + 1}</span>
          )}
        </div>
      </div>
      <h4 className="text-base font-medium">{title}</h4>
    </div>
  );
}
function SearchBox() {
  const [searchParams, setSearchParams] = useCustomSearchParams();
  const {
    common: { search },
  } = useGetDictionary();
  return (
    <div className="row  h-fit w-full min-w-60 max-w-lg  rounded-md bg-background p-0.5 shadow-2xl">
      <Button variant="ghost">
        <TbSearch size="1rem" className="me-1" />
      </Button>
      <input
        className="h-full w-full border-none bg-transparent px-2 font-normal focus:outline-0 focus:ring-0"
        type="search"
        placeholder={search}
        value={searchParams.get("advance-prompt") ?? ""}
        onChange={e => setSearchParams("advance-prompt", e.target.value)}
      />
    </div>
  );
}

interface FooterButtonsProps {
  stepper: number;
  setStepper: StateSetterType<number>;
  handleReset: () => void;
}
function FooterButtons({
  stepper,
  setStepper,
  handleReset,
}: FooterButtonsProps) {
  return (
    <div
      className={cn(
        "flex w-full justify-between",
        stepper === 0 && "justify-center",
      )}
    >
      <RenderIf isTrue={stepper > 0}>
        <Button
          onClick={() => setStepper(v => v - 1)}
          className={cn("items-center gap-2", buttonsSize)}
        >
          <TbChevronsLeft />
          BACK STEP
        </Button>
      </RenderIf>
      <RenderIf isTrue={stepper < 2}>
        <Button
          onClick={() => setStepper(v => v + 1)}
          className={cn("items-center gap-2", buttonsSize)}
        >
          NEXT STEP
          <TbChevronsRight />
        </Button>
      </RenderIf>
      <RenderIf isTrue={stepper === 2}>
        <div className="flex gap-6">
          <Button
            onClick={handleReset}
            variant="secondary"
            className={cn("text-primary-dark", buttonsSize)}
          >
            RESET
          </Button>
          <Button
            onClick={() => console.log("finish")}
            className={cn(buttonsSize)}
          >
            FINISH
          </Button>
        </div>
      </RenderIf>
    </div>
  );
}

const steps = {
  "0": ListOfChildCategoryItems,
  "1": ListOfContentTopic,
  "2": () => <div>task</div>,
} as const;
const stepsTitle = {
  "0": "child_category",
  "1": "content_topic",
  "2": "task",
} as const;
const buttonsSize = "w-[11.25rem] h-[3.5rem] rounded-xl ";

export function AdvancedPrompt() {
  const [selectedCategoryChildItemId, setSelectedCategoryChildItemId] =
    useState(-1);
  const [selectedTopicChildItemId, setSelectedTopicChildItemId] = useState(-1);
  const [stepper, setStepper] = useState(0);
  const Content = steps[String(stepper) as keyof typeof steps];
  const {
    page: { template },
  } = useGetDictionary();

  function handleReset() {
    setSelectedCategoryChildItemId(-1);
    setSelectedTopicChildItemId(-1);
    setStepper(0);
  }
  return (
    <div className="col h-full w-full items-center gap-6">
      <div>
        <div className="grid grid-cols-3 items-start gap-16">
          {Object.keys(steps).map(step => (
            <StepBox
              key={step}
              step={Number(step)}
              completed={Number(step) < stepper}
              title={template[stepsTitle[step as keyof typeof steps]]}
            />
          ))}
        </div>
      </div>
      <SearchBox />
      <Content
        selectedCategoryChildItemId={selectedCategoryChildItemId}
        setSelectedCategoryChildItemId={setSelectedCategoryChildItemId}
        selectedTopicChildItemId={selectedTopicChildItemId}
        setSelectedTopicChildItemId={setSelectedTopicChildItemId}
      />
      <FooterButtons
        stepper={stepper}
        setStepper={setStepper}
        handleReset={handleReset}
      />
    </div>
  );
}
