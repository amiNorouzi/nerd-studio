"use client";
import { useRef, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  TbCheck,
  TbChevronsRight,
  TbChevronsLeft,
  TbSearch,
} from "@/components/svg-icons";
import RenderIf from "@/components/shared/RenderIf";
import { AdvancedParentCategory } from "./advanced-parent-category";
import { AdvancedChildCategory } from "./advanced-child-category";
import { AdvancedContentTopic } from "./advanced-content-topic";
import { Separator } from "@/components/ui/separator";

import { useTemplateStore } from "@/stores/zustand/template-store";
import { useMediaQuery } from "usehooks-ts";
import { useCustomSearchParams, useGetDictionary } from "@/hooks";

import { cn } from "@/lib/utils";

import type { StateSetterType } from "@/services/types";
import type { TemplateState } from "@/stores/zustand/types";

interface StepBoxProps {
  step: number;
  completed: boolean;
  title: string;
  active: boolean;
}
function StepBox({ step, completed, title, active }: StepBoxProps) {
  const iconWrapper = useRef<HTMLDivElement>(null);
  return (
    <div className="flex items-start justify-start ">
      <div className="col items-center justify-start gap-[21px]">
        <div
          ref={iconWrapper}
          className={cn(
            "flex size-14 items-center justify-center rounded-lg bg-muted p-2",
            active && "bg-linearGradient",
            completed && "bg-[#ECFDF3]",
          )}
        >
          <div className="flex items-center justify-center rounded-full  bg-white p-1 text-center  text-xl font-bold shadow">
            {completed ? (
              <TbCheck className="size-6 text-[#027A48]" />
            ) : (
              <span
                className={cn(
                  "size-6 text-muted-foreground-light",
                  active && "gradient-text ",
                )}
              >
                {step + 1}
              </span>
            )}
          </div>
        </div>
        <h4
          className={cn(
            "text-center text-base font-medium",
            !completed && !active && "text-muted-foreground-light",
          )}
        >
          {title}
        </h4>
      </div>

      <Separator
        className={cn(step === 2 && "invisible")}
        style={{
          marginTop: `${(iconWrapper.current?.offsetHeight ?? 0) / 2}px`,
        }}
        orientation="horizontal"
      />
    </div>
  );
}

interface ListOfStepBoxesProps {
  stepper: number;
}
export function ListOfStepBoxes({ stepper }: ListOfStepBoxesProps) {
  const {
    page: { template },
  } = useGetDictionary();
  return (
    <div>
      <div className="grid grid-cols-3 place-content-center gap-16">
        {Object.keys(steps).map(step => (
          <StepBox
            key={step}
            step={Number(step)}
            completed={Number(step) < stepper}
            active={Number(step) === stepper}
            title={template[stepsTitle[step as keyof typeof steps]]}
          />
        ))}
      </div>
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
  selectedTemplate: TemplateState["currentTemplate"];
}
function FooterButtons({
  stepper,
  setStepper,
  handleReset,
  selectedTemplate,
}: FooterButtonsProps) {
  /**
   * use this function to set selected template in store and use it in selected template page
   */
  const setCurrentTemplate = useTemplateStore.use.setCurrentTemplate();
  const {
    page: { template },
  } = useGetDictionary();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <div className="col sticky bottom-1 w-full gap-2 sm:relative sm:bottom-0">
      {/*show prompt button(show on mobile size)*/}
      <RenderIf isTrue={stepper === 2 && !isDesktop}>
        <Link
          href={`/template/${selectedTemplate.id}`}
          onClick={() => setCurrentTemplate(selectedTemplate)}
          className="w-full"
        >
          <Button className="h-14 w-full rounded-xl">
            {template.show_prompt_label_button}
          </Button>
        </Link>
      </RenderIf>
      <div
        className={cn(
          "flex w-full flex-nowrap justify-between gap-2",
          stepper === 0 && "justify-center",
        )}
      >
        {/*back step button*/}
        <RenderIf isTrue={stepper > 0}>
          <Button
            onClick={() => setStepper(v => v - 1)}
            variant="muted"
            className={cn(
              "h-14 items-center gap-2 rounded-xl text-primary-dark max-sm:basis-1/2 sm:w-44",
              stepper === 1 && "max-sm:basis-1/3",
            )}
          >
            <TbChevronsLeft />
            {template.back_step_label_button}
          </Button>
        </RenderIf>
        {/*next step button*/}
        <RenderIf isTrue={stepper < 2}>
          <Button
            onClick={() => setStepper(v => v + 1)}
            className="h-14 items-center gap-2 rounded-xl max-sm:w-full max-sm:basis-2/3 max-sm:only:basis-full sm:w-44"
          >
            {template.next_step_label_button}
            <TbChevronsRight />
          </Button>
        </RenderIf>
        {/*reset and show prompt(show on desktop width) buttons*/}
        <RenderIf isTrue={stepper === 2}>
          <div className="flex gap-6 max-sm:basis-1/2">
            <Button
              onClick={handleReset}
              variant="secondary"
              className="h-14 w-full rounded-xl text-primary-dark sm:w-44"
            >
              {template.reset_label_button}
            </Button>
            <RenderIf isTrue={isDesktop}>
              <Link
                href={`/template/${selectedTemplate.id}`}
                onClick={() => setCurrentTemplate(selectedTemplate)}
              >
                <Button className="h-14 w-44 rounded-xl">
                  {template.show_prompt_label_button}
                </Button>
              </Link>
            </RenderIf>
          </div>
        </RenderIf>
      </div>
    </div>
  );
}

const steps = {
  "0": AdvancedParentCategory,
  "1": AdvancedChildCategory,
  "2": AdvancedContentTopic,
} as const;
const stepsTitle = {
  "0": "parent_category",
  "1": "child_category",
  "2": "content_topic",
} as const;

export function AdvancedPrompt() {
  const [selectedCategoryParentItemId, setSelectedCategoryParentItemId] =
    useState(-1);
  const [selectedTopicChildItemId, setSelectedTopicChildItemId] = useState(-1);
  const [selectedContentTopicItemId, setSelectedContentTopicItemId] =
    useState(-1);
  const [stepper, setStepper] = useState(0);
  const Content = steps[String(stepper) as keyof typeof steps];
  const {
    page: { template },
  } = useGetDictionary();
  const currentTemplate = useTemplateStore.use.currentTemplate();
  function handleReset() {
    setSelectedCategoryParentItemId(-1);
    setSelectedTopicChildItemId(-1);
    setStepper(0);
  }
  return (
    <div className="col h-fit w-full flex-1 items-center gap-6 ">
      <ListOfStepBoxes stepper={stepper} />
      <RenderIf isTrue={stepper > 0}>
        <SearchBox />
      </RenderIf>
      <Content
        //these props are for parent category
        selectedCategoryParentItemId={selectedCategoryParentItemId}
        setSelectedCategoryParentItemId={setSelectedCategoryParentItemId}
        //these props are for child category
        selectedTopicChildItemId={selectedTopicChildItemId}
        setSelectedTopicChildItemId={setSelectedTopicChildItemId}
        //these props are for content topic
        selectedContentTopicItemId={selectedContentTopicItemId}
        setSelectedContentTopicItemId={setSelectedContentTopicItemId}
      />
      <FooterButtons
        stepper={stepper}
        setStepper={setStepper}
        handleReset={handleReset}
        selectedTemplate={currentTemplate}
      />
    </div>
  );
}
